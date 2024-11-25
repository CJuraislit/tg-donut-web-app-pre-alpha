import {TelegramWebApps} from "telegram-webapps";
import WebApp = TelegramWebApps.WebApp;

const tg: WebApp = Telegram.WebApp

export function useTelegram() {
    const expand = () =>   tg.expand()

    return {
        tg,
        expand,
        user: tg.initDataUnsafe?.user,
    }
}