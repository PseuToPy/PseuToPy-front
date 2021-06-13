# Traduction package use : i18next
## Documentations
[Official i18next Documentation](https://www.i18next.com/)  
[NPM Documentation](https://www.npmjs.com/package/i18next)

## What is i18next ?
I18next is an internationalization-framework written in and for JavaScript.  
Amung its features, it allows the application to:
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

Translation files used are located at public/locale/`<language_key>`/translation.json  
They are json object containing keys and text. It is important to keep in mind that all translation files should share the same key.

## How to use both .json and .md files ?

## Useful parameters
It is parametrized using the file located at src/utils/i18n/index.js
