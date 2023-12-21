const telegram = require("telegram");
const axios = require("axios");

/**
 * @param {telegram.TelegramClient} client
 * @param {telegram.Api.Message} msg
 * @param {string} arg
 */

module.exports["weather"] = async (client, msg, arg) => {
	const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${arg}&appid=e1a88097de590b5cc679f25d2191933f&units=metric`;
	const response = await axios.get(apiUrl);

	const weatherData = {
		temperature: response.data.main.temp,
		description: response.data.weather[0].description,
	};

	client.editMessage(msg.chatId, { message: msg.id, text: `temperature: ${weatherData.temperature}\n${weatherData.description}` });
};
