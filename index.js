function getCurrentTimeAndDate() {
  const currentDateTime = new Date();

  document.querySelector(".current-time").textContent =
    currentDateTime.toLocaleTimeString("en-GB", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  document.querySelector(".current-date").textContent =
    currentDateTime.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
}

async function getBackgroundImage() {
  const imageDefault =
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODIzMjk4MzF8&ixlib=rb-4.1.0";

  try {
    const imageResponse = await fetch(
      "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature",
    );
    const imageData = await imageResponse.json();
    const imageUrl = imageData.urls.full;

    document.body.style.backgroundImage = `url(${imageDefault})`;
  } catch (error) {
    console.error(error);
    document.body.style.backgroundImage = `url(${imageUrl})`;
  }
}

navigator.geolocation.getCurrentPosition(async (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const response = await fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`,
  );
  const data = await response.json();

  const iconId = data.weather[0].icon;

  document.querySelector(".current-condition").src =
    `https://openweathermap.org/payload/api/media/file/${iconId}.png`;
  document.querySelector(".current-temp").textContent =
    `${Math.round(data.main.temp)}°C`;
  document.querySelector(".current-location").textContent = data.name;
});

fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    document.querySelector(".current-coin-icon").src = data.image.thumb;
  })
  .catch((error) => console.error(error));

fetch("https://api.api-ninjas.com/v2/quoteoftheday", {
  headers: {
    "X-Api-Key": "FMw2djTkovDaH1lk38riieqXxwhdqiJkBYn3EUWR",
  },
})
  .then((response) => response.json())
  .then((data) => {
    const quoteText = data[0].quote;
    const quoteAuthor = data[0].author;

    document.querySelector(".current-quote").textContent = `"${quoteText}"`;
    document.querySelector(".current-author").textContent = quoteAuthor;
  })
  .catch((error) => console.error(error));

getBackgroundImage();
getCurrentTimeAndDate();
setInterval(getCurrentTimeAndDate, 1000);
