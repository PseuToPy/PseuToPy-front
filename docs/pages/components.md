# Components in front #
In this front, we have some important components that have some interactions with the others. 

## App
The app component contains the routes that are used in the website. 
The pages are:
* Introduction
* About
* GCU
* Error404
* Editor

On each page, we use the component i18n that allows us to have different languages on the website.

## Introduction
The component `Introdcution` is the main page of the website that describes the tools that can be used on PseuToPy-front.

## About 
The component `About` describes the purposes of PseuToPy and how PseuToPy works.

## GCU
The `GCU` component is a mandatory page that describes all conditions of use for the user.

## Error 404
The `Error404` component appears when the user tries to reach an unknown page that has been created.

## Editor
The `Editor` component contains some major subcomponents that allow the user to code. 

### PanelOptions
The `PanelOptions` component is used to display all rules that are implemented in PseuToPy. An API call is done in order to retreive all rules. Each rule is dsplayed with the component `CodeViewver`.

### CodeViewer 
The `CodeViewer` component is a HTML code editor that is used to display codes. It is not possible to edit the code.

### CodeEditor
The `CodeEditor` component is a HTML code editor that is used to get PseuToPy-code of the user.

After the conversion into python, the translated python code is displayed on the python `CodeEditor`. It cannot be edited.

### PythonWorker
`PythonWorker` component will run the python code on the python `CodeEditor`

### MessageLevel
`MessageLevel` component displays some information for users if an action is realised.

## i18n
`i18n` component allows us to have different languages for the website. 
More details : check the doc `translation`
