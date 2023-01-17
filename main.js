const URL = "https://teachablemachine.withgoogle.com/models/UTrhxjdX3/";
const modelURL = URL + "model.json";
const metadataURL = URL + "metadata.json";

const classifier = ml5.imageClassifier(modelURL, modelReady);

const camWidth = 300
const camheight = camWidth * 3 / 4;

Webcam.set({
    width: camWidth,
    height: camheight,
    image_format: "jpg",
    jpg_quality: 90
});

// console.log(modelURL);
// console.log(metadataURL);

inicializar();

function inicializar() {
    getObj();
    const camera = document.getElementById("camera");
    Webcam.attach(camera);
    document.querySelector("button").disabled = true;
}

async function getObj() {
    const request = await fetch(metadataURL);
    const response = await request.json();
    // console.log(response);
    
    const divObj = document.getElementById("obj");
    
    const objetos = response.labels;
    
    for (let i = 1; i < objetos.length; i++) {
        const h4 = document.createElement("h4");
        h4.textContent = objetos[i];
        divObj.appendChild(h4);
        const hr = document.createElement("hr");
        divObj.appendChild(hr);
    }
}

function modelReady() {
    console.log("Model Loaded");
    document.querySelector("button").disabled = false;
    
}

function tiraFoto() {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    Webcam.snap(data => {
        const ibagem = new Image();
        ibagem.src = data;
        ibagem.id = "batata";
        resultado.appendChild(ibagem);
        recIbagem(ibagem);
    });
}

function recIbagem(ibg) {
    classifier.classify(ibg, leuIbagem);
    document.getElementById("nomeObj").textContent = "Carregando...";
    document.getElementById("precisaoObj").textContent = "Carregando...";
}

function leuIbagem(erro, resultado) {
    if (erro) {
        console.error(erro);
        
    }  else {
        console.log(resultado);
        const objeto = resultado[0].label;
        let precisao = resultado[0].confidence;
        precisao = Math.round(precisao * 100);
        document.getElementById("nomeObj").textContent = objeto;
        document.getElementById("precisaoObj").textContent = precisao + "%";
    }
}