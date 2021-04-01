import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
    // Use custom backend path to load transltion files
    .use(Backend)
    .use(initReactI18next)
    // Init i18next
    .init({
        lng: "en",
        fallbackLng: "en",
        keySeparator: ".",
        interpolation: {
            escapeValue: false,
        },
        debug: true,
        react: {
            useSuspense: false,
        },
    });

export default i18n;
