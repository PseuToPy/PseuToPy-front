# Usage of Skulpt
Skulpt is the package that executes python in the client web browser. It translates Python into Javascript and executes the resulting code and renders the output. The documentation of the package is available [here](http://skulpt.org/docs/index.html).

## Methods used
### Sk.configure
If you wish to execute Python code, you must configure the `Sk` object with `Sk.configure(object)`. You will need to check the [usage page](http://skulpt.org/using.html) and tutorials because it is not well documented in the docs. You can configure :
- `read` (function, **mandatory**) to define the way to read python input. You should keep the default one.
- `output` (function, **mandatory**) to execute a callback when an output is produced. The function prototype is `(outputString) => void`, where `outputString` is the string output.
- `execLimit` (number, **mandatory**) to set the maximum time (milliseconds) for execution. You must specify it to make Skulpt stop its execution.
- `yieldLimit` (number) to set the maximum milliseconds to wait for user input.
- `killableWhile` (boolean) to allow Skulpt to stop its execution during a while loop.
- `killableFor` (boolean) to allow Skulpt to stop its execution during a for loop.
- `timeoutMsg` (function) to specify the message in case of error. Please keep the default one which is used by the translation files. The protype is `() => string`.
- `__future__` (object) The version of Python to use. Please keep the default `Sk.python3` option.

### Sk.importMainWithBody
The principal function to call. It allows us to run a python string as code inside a main function that will be called. Please look at the [docs](http://skulpt.org/docs/Sk.html) for more details.

### Sk.misceval.asyncToPromise
This function transform Skulpt execution objects into JS promises. The second argument is a list of interruptions to be handled during code execution. Please look at the [docs](http://skulpt.org/docs/Sk.misceval.html) for more details.

## Our usage of Skulpt
### How it works
The `Editor` (`src/components/pages/Editor`) will spawn a `PythonWorker` (`src/model/pythonWorker/workerCommands.js`) [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers). By doing so, we prevent Skulpt to be executed in the thread of the React app, which would slow it down.

We send a `START` message with the code string to the worker once we click the execute button. In the worker, we call the `runPython` method from our Skulpt implementation (`src/utils/skulpt/index.js`).
During the code execution, if outputs or errors are produced, we send a `LOG` message to the component.
At the end of execution (successful or not), we send back a `STOP` message to the React component, to notify the end of execution. When we hit `executionTime` milliseconds of execution, Skulpt is stopped with the same behaviour.

> Do not store the outputs in memory or in Redux, write them directly on the DOM ! Otherwise, you might get some blue screens (true story)...

### Improvements to make
We would like to implement a STOP button, to make Skulpt stop on demand. This [thread](https://stackoverflow.com/questions/54503455/how-to-stop-a-script-in-skulpt) is the solution we tried to use, but for some reason it does not work. **It looks like the boolean (`pythonRunning`) used to suspend the code is not changing its state. It should happen :).**
