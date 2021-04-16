import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
    // Use custom backend path to load transltion files
    .use(Backend)
    // Load default config and settups for i18next
    .use(initReactI18next)
    // Init i18next
    .init({
        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json",
        },
        lng: "en",
        fallbackLng: "en",
        supportedLngs: ["en", "fr"],
        preload: ["en"],
        keySeparator: ".",
        interpolation: {
            escapeValue: false,
        },
        debug: true,
        react: {
            useSuspense: true,
        },
        returnObjects: true,
    });

export default i18n;
