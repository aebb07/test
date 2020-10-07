const inicioDiv = document.querySelector('#inicio');
const firstInput = document.querySelector('#primero');
const secondInput = document.querySelector('#segundo');
const sendButton = document.querySelector('#enviar');
const addRef = 'http://localhost:3000/api/addRefran/';


function timeRefran () {
    fetch('http://localhost:3000/api/refran/')
        .then(
            resp => resp.text()
        )
        .then (
            str=>{
                inicioDiv.innerText = str;
            }
        )
        setTimeout(timeRefran, 5000)
}

function enviar(){
    var data = new FormData();
    data.append('primero',firstInput.value);
    data.append('segundo',secondInput.value);
    var requestOptions = {
        method: 'POST',
        body: data,
    };

    fetch(addRef, requestOptions)
    .then(res=>{
        div.classList.remove('popup');
        div.classList.remove('popup-contenido');
        firstInput.value = "";
        secondInput.value = "";
    })
}

sendButton.onclick = enviar;

timeRefran();