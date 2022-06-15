/**
 * Database: lowdb
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
import type { TelegramUserInterface } from "@app/types/databases.type";
import configs from "@configs/config";
import lowdb from "lowdb";
import lowdbFileSync from "lowdb/adapters/FileSync";

const databases = { users: lowdb(new lowdbFileSync<{ users: TelegramUserInterface[] }>(configs.databases.users)) };

databases.users = lowdb(new lowdbFileSync(configs.databases.users));
databases.users.defaults({ users: [] }).write();

/**
 * writeUser()
 * =====================
 * Write user information from telegram context to user database
 *
 * @Context: ctx.update.message.from
 *
 * @param chatID
 * @interface [TelegramUserInterface](https://github.com/ptkdev-boilerplate-boilerplate/node-telegram-bot-boilerplate/blob/main/app/webcomponent/types/databases.type.ts)
 *
 * @param { TelegramUserInterface } json - telegram user object
 *
 */
const writeUser = async (json: TelegramUserInterface, chatID: number): Promise<void> => {
	const user_id = databases.users.get("users").find({ id: json.id }).value();
	json.chatroom_id = chatID;
	console.log(json);
	if (user_id) {
		databases.users.get("users").find({ id: user_id.id }).assign(json).write();
	} else {
		databases.users.get("users").push(json).write();
	}
};

/**
 * getUsers()
 * =====================
 * Write user information from telegram context to user database
 *
 * @Context: ctx.update.message.from
 *
 * @interface [TelegramUserInterface](https://github.com/ptkdev-boilerplate-boilerplate/node-telegram-bot-boilerplate/blob/main/app/webcomponent/types/databases.type.ts)
 *
 * @param { TelegramUserInterface } json - telegram user object
 *
 */
const getUsers = function (): TelegramUserInterface[] {
	const allUsers = databases.users.get("users").value();
	return allUsers;
};

export { databases, writeUser, getUsers };
export default databases;
