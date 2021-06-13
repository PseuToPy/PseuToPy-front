# Traduction package use : i18next
## Documentations
[Official i18next Documentation](https://www.i18next.com/)  
[NPM Documentation](https://www.npmjs.com/package/i18next)

### Needed library
* i18next
* i18next-http-backend
* react-i18next

## What is i18next ?
I18next is an internationalization-framework written in and for JavaScript.  
Among its features, it allows the application to:
* Detect the user language
* Load the translations
* Optionally cache the translations
* Separate translation files into multiple files
* Load translations file on demand

## How does it work ?
i18next works with a separate store from the application one. It works as a component using a different store.    
The created i18next component is used at the launch of the application and load the default translation file (english files here).  
When a language changes is detected, it loads the needed files.

To use it in a component, you need to import the function `useTranslation` from the `react-i18next` library.  
In the project, we only use the `t` and the `i18n` subfunctions.
* `t` is the function used to translate a text depending on the current language. It takes the json key to the text translated in parameter. There is no need to specify the translation document here, we are using the default namespace for those files.
* `i18n` is the component object, where properties such as the current language can be found

Translation files used are located at `public/locale/<language_key>/translation.json`  
They are json object containing keys and text. It is important to keep in mind that all translation files should share the same key.

## How to use both .json and .md files ?
As i18n cannot manage several translation files, we decided to mainly use .json files as translation files and we loaded .md files when needed.  
More information about .md files load can be found [here](markdown.md).

## Useful parameters
It is parametrized using the file located at `src/utils/i18n/index.js`
```js
import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { needsDebug } from "../debugLevel";

i18n
    // Use custom backend path to load transltion files
    .use(Backend)
    // Load default config and settups for i18next
    .use(initReactI18next)
    // Init i18next
    .init({
        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json", // generic translation file path
        },
        lng: "en", // default language
        fallbackLng: "en", // use english when the key is other language is not found
        supportedLngs: ["en", "fr"], // list of accepted language
        preload: ["en"], // preload english file
        keySeparator: ".", // translation file key separator 
        interpolation: {
            escapeValue: false,
        },
        debug: needsDebug(), // display debug information in ht econsole
        react: {
            useSuspense: true, // wait translation data load before displaying the view
        },
        returnObjects: true,
    });

export default i18n;
```

