const weatherSearch = document.querySelector('form');
const messageOne = document.querySelector('#message1');
const messageTwo = document.querySelector('#message2');
const image = document.querySelector('#img1');

messageOne.textContent = '';
image.src = '';
messageTwo.textContent = '';

weatherSearch.addEventListener('submit', (event) => {
  event.preventDefault();
  messageOne.textContent = 'Loading...';
  fetch(`/weather?search=${event.target[0].value}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        image.src = '';
        messageTwo.textContent = '';
        return (messageOne.textContent = data.error);
      }
      messageOne.textContent = data.location;
      image.src = data.forecast.weather_icon[0];
      messageTwo.textContent = `${data.forecast.desc}. ${data.forecast.temperature}. ${data.forecast.precipitation}`;
    });
});
