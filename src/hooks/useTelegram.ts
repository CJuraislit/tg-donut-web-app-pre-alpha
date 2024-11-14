import {TelegramWebApps} from "telegram-webapps";
import WebApp = TelegramWebApps.WebApp;

const tg: WebApp = Telegram.WebApp

export function useTelegram() {
    return {
        tg,
        user: tg.initDataUnsafe?.user,
    }
}