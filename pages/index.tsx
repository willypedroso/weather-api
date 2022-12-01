import React, { useEffect, useState } from "react";
import axios from "axios";
import options from "../data/options";

export default function Home() {
	const [weather, setWeather] = useState("");
	const [precip, setPrecip] = useState("");
	const [rain, setRain] = useState("");
	const [currentWeater, setCurrentWeather] = useState(true);
	const day1 = new Date().getDate();
	const month1 = new Date().getMonth() + 1;
	const day2 = 15;
	const month2 = 12;

	useEffect(() => {
		try {
			axios.get(`https://api.open-meteo.com/v1/forecast?latitude=-23.50&longitude=-47.46&hourly=temperature_2m,precipitation&current_weather=true&timezone=America%2FSao_Paulo&start_date=2022-${month1}-${day1}&end_date=2022-${month2}-${day2}`).then(res => {
				console.log(res.data);
				setWeather(res.data.current_weather.temperature);
			});
		} catch (error) {
			console.log("error");
		}
	},[]);


	async function handleWeather(time: string) {
		try {const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=-23.50&longitude=-47.46&hourly=temperature_2m,precipitation&current_weather=true&timezone=America%2FSao_Paulo&start_date=2022-${month1}-${day1}&end_date=2022-${month2}-${day2}`);
  
			const data = await res.json();
			setWeather(data.hourly.temperature_2m[time]);
			setPrecip(data.hourly.precipitation[time]);
			setCurrentWeather(false);
			const rainIcon = parseFloat(precip) > 2 ? "🌩️" : parseFloat(precip) > 1 ? "🌧️" : parseFloat(precip) > 0.2 ? "🌥️" : "☀️";
			setRain(rainIcon);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div id="main">
			<select onChange={(e) => handleWeather(e.target.value)}>
				{options.map((hour, i) => (<option key={hour} value={i}>{hour}</option>))}
			</select>
			<h1>{currentWeater ? "Weather Now in Sorocaba: " : "Future Weather: "} {weather} °C</h1>
			{currentWeater ? false : (<h1>Precipitation: {precip} / {rain}</h1>)}
		</div>
	);
}