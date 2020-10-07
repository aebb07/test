
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const multer  = require('multer');
const { MongoClient } = require('mongodb');
const mimeParser = multer();
const db = require('mongodb').MongoClient;
const dbURL = 'mongodb://localhost:27017/refranes';
const collectionName = 'refranes';
const port = 3000;

/* Esto era lo que estaba antes del mongodb
  sustitui los arrays por la base de datos

var inicios = ['...'];
  
var finales = ['...'];

function aleatorio (lista) {
  return Math.round((lista.length-1) * Math.random());
}
*/

app.get('/api/refran/', (req, res) => {
  var cli, db, col;
  MongoClient.connect(dbURL)
  .then(
    client => {
      cli = client;
      db =client.db();
      col = db.collection(collectionName);
      return col.countDocuments();
    }
  ).then (
    refNum => {
      var inicioAleatorio = Math.floor(Math.random() * refNum);
      var finalAleatorio = Math.floor(Math.random() * refNum);
      var inicioAlePromesa = col.find().limit(1).skip(inicioAleatorio).toArray();
      var finalAlePromesa = col.find().limit(1).skip(finalAleatorio).toArray();
      return Promise.all([
        inicioAlePromesa,
        finalAlePromesa
      ]);
    }
  ).then (
    refranesAleatorios => {
      console.log('refranesAleatorios:', refranesAleatorios);
      console.log('refranesAleatorios[0]:', refranesAleatorios[0]);
      console.log('refranesAleatorios[1]:', refranesAleatorios[1]);
      console.log('refranesAleatorios:[0][0]', refranesAleatorios[0][0]);
      console.log('refranesAleatorios[1][0]:', refranesAleatorios[1][0]);
      
      var respuesta =  refranesAleatorios[0][0].inicio + ' , ' + refranesAleatorios[1][0].final
      ;
      console.log(respuesta);

      res.send(respuesta);

      cli.close();

    }
  )
}
)


app.post('/api/addRefran/',mimeParser.none(),(req,res) => {
    //app.post('/api/addRefran/',jsonParser,(req,res) => {
      var inicios = req.body.primero;
      var finales = req.body.segundo;
      
  
      var cli, db, col;
      MongoClient.connect(dbURL)
      .then(
        client => {
          cli = client;
          db = client.db();
          col = db.collection(collectionName);
          var nuevoRef = {inicio: inicios, final: finales};
          console.log('Insertando refrán...')
          return col.insertOne(nuevoRef)
        }
      ) .then(
        response => {
          console.log('** Refran insertado...');
          console.log('*** Cerrando conexión a base de datos.')
          res.send(200)
          cli.close();
        }
      )
    })



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

