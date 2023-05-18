const $inputSearch = document.querySelector(".input-search");
const $buttonSearch = document.querySelector(".button-search");
const $city = document.querySelector(".city");
const $temperature = document.querySelector(".temperature");
const $weather = document.querySelector(".weather");
const $icon = document.querySelector(".icon");
const $localtime = document.querySelector(".localtime");

// const url = "https://weatherapi-com.p.rapidapi.com/current.json?q=Piura";
const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "606f438768msh43c43d6ab4622ffp166372jsn3280c0580c63",
		"X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
	},
};

$buttonSearch.addEventListener("click", (e) => {
	e.preventDefault();
	$buttonSearch.disabled = true;
	getCurrentWeather();
	$buttonSearch.disabled = false;
	$inputSearch.value = "";
});

const getCurrentWeather = async () => {
	const city = $inputSearch.value;
	const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;

	fetch(url, options)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			showResults(data);
		})
		.catch((err) => console.error(err));
};

const showResults = ({ location, current }) => {
	const { name, region, country, localtime } = location;
	const { temp_c, condition } = current;
	$city.textContent = `${name}, ${region}, ${country}`;
	$temperature.textContent = `${temp_c}°C`;
	$weather.textContent = condition.text;
	$localtime.textContent = localtime;
	$icon.src = condition.icon;
};
