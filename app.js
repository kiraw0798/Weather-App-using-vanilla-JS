const apiKey = '714edec7542046f7771b6eba8b2a1d4d';
const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.data-container');
const weatherContainer = document.querySelector('.weatherContainer');
const errorContainer = document.querySelector('.errorContainer');
const welcome = document.querySelector('.welcome');
const descriptionEmoji = document.querySelector('.descriptionEmoji');
const temprature = document.querySelector('.temperature');
const cityName = document.querySelector('.cityName');
const descriptionName = document.querySelector('.description');
const humidityValue = document.querySelector('.humidity-value');
const windSpeed = document.querySelector('.wind-speed-value');



weatherForm.addEventListener('submit', async event => {

    event.preventDefault();
    welcome.style.display = 'none';

    const city = cityInput.value;

    if(city){
        try{
             
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
            cityInput.value = '';
            errorContainer.textContent= ''
            card.style.display = 'flex'
        }
        catch(error){
            displayError('404');
        }
    }
    else{
        displayError('404');
    }


});


async function getWeatherData(city){
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiURL);

    if(response.ok === true){
        return response.json();
    }
    else{
        displayError('404');
    }
    
    
}

function displayWeatherInfo(data){
    console.log(data);
    
    const {
        name: city,
        main: {humidity, temp},
        weather: [{description, id}],
        wind: {speed}} = data

    cityName.textContent = city;
    temprature.textContent =(temp - 273.15).toFixed(1);
    humidityValue.textContent = humidity;
    descriptionName.textContent = description;
    windSpeed.textContent = speed;
    descriptionEmoji.textContent = getWeatherEmoji(id);

}
function getWeatherEmoji(weatherId){
    switch(true){
        case(weatherId<=299): 
            return '⛈️';
        case(weatherId>=300 && weatherId <400):
            return '🌧️';
        case(weatherId>=500 && weatherId <600):
            return '🌧️';
        case(weatherId>=600 && weatherId <700):
            return '❄️';
        case(weatherId>=700 && weatherId <800):
            return '🌫️';
        case(weatherId === 800):
            return '☀️'
        case(weatherId > 800):
            return '☁️';
        
    }

}

function displayError(message){
    errorContainer.textContent='';
    const errorDisplay = document.createElement('div');
    const four0four = document.createElement('p');
    const notFound = document.createElement('p');

    

    four0four.textContent=message;
    notFound.textContent = "Not Found"

    errorDisplay.classList.add('error');
    four0four.classList.add('error404');
    notFound.classList.add('errorDesc');

    errorDisplay.style.display = 'flex';
    card.style.display = 'none';

    errorContainer.appendChild(errorDisplay);
    errorDisplay.appendChild(four0four);
    errorDisplay.appendChild(notFound);

}

