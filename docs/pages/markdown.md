# Markdown

We have set up a system that allows you to write content directly in markdown.

Here is a very simple example of use: 
```js
<Markdown children={my_markdown} />
```

To manage the internalization we need a `renderSwitch` function associated with a `useEffect` to select the right markdown file. 

Look more in details `src\components\pages\Gcu\index.js` or `src\components\pages\About\index.js` to understand the implementation.