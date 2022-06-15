/**
 * Hourly cron
 * =====================
 * Do stuff every hour.
 *
 * @contributors: Ism1tha (Ismael Semmar Galvez)
 *
 * @license: MIT License
 *
 */

import bot from "@app/functions/telegraf";
import * as databases from "@app/functions/databases";
import * as https from "https";

const start = async (): Promise<void> => {
	const minutes = 10;

	setInterval(function () {
		const users = databases.getUsers();
		let statusMessage: string;
		https
			.get("https://amco.farmadosis.es", function (res) {
				/*
				statusMessage = "✅ El sitio web parece estar funcionando.";
				users.forEach(function (user) {
					bot.telegram.sendMessage(user.chatroom_id!, statusMessage);
				});
				*/
			})
			.on("error", function (e) {
				statusMessage = "🚩 El sitio web parece que no funciona.";
				users.forEach(function (user) {
					bot.telegram.sendMessage(user.chatroom_id!, statusMessage);
				});
			});
	}, 1000 * 60 * minutes); // 10 minutes actually.
};

export { start };
