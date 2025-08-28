const cidadeInput = document.getElementById('cidade-input');
const buscarBtn = document.getElementById('buscar-btn');
const nomeCidadeTxt = document.getElementById('nome-cidade');
const temperaturaTxt = document.getElementById('temperatura');
//const descricaoTxt = document.getElementById('descricao');
const imgtemp = document.getElementById('icone-clima')
const key = "39d5174af075aa041bbc99737cab8d8d"


buscarBtn.onclick = async function() 
{

    const cidadetxt = cidadeInput.value
    const urlDecdGeo = `https://api.openweathermap.org/geo/1.0/direct?q=${cidadetxt},BR&limit=1&appid=${key}`;

    const resp = await fetch(urlDecdGeo);

    const valor = await resp.json();
    
    const lati = (valor[0].lat);
    const long = (valor[0].lon);

    console.log("Usuário buscou pela cidade:", cidadetxt); 
    console.log("Lon = " , lati); 
    console.log("Lat = " , long); 


    const urlApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=${key}`;
    
    const resp2 = await fetch(urlApi)
    console.log("Status chamada dados", resp2.status)

    

    const dadosgeo = await resp2.json();
    const dadosgeo_text = JSON.stringify(dadosgeo)

    const tempKelvin = dadosgeo.main.temp
    console.log(dadosgeo_text)
    console.log(tempKelvin)
    
    const urltemp = `https://openweathermap.org/img/wn/${dadosgeo.weather[0].icon}@2x.png`

    imgtemp.src = urltemp

    const tempcels = tempKelvin - 273.15
    nomeCidadeTxt.textContent = cidadetxt
    temperaturaTxt.innerHTML  = ("Temperatura: " + tempcels.toFixed(1) + "°C")


   

};