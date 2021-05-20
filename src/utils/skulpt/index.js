/* eslint-disable no-undef */
import "skulpt/dist/skulpt.min";
import "skulpt/dist/skulpt-stdlib";

var pythonRunning = setRun(false);
let defaultExecutionTime = 5000;

function initPython(outputFn) {
    const inputFn = x => {
        if (
            Sk.builtinFiles === undefined ||
            Sk.builtinFiles["files"][x] === undefined
        )
            throw new Error("File not found: '" + x + "'");
        return Sk.builtinFiles["files"][x];
    };

    Sk.configure({
        yieldLimit: 500,
        execLimit: defaultExecutionTime,
        killableWhile: true,
        killableFor: true,

        output: outputFn,
        read: inputFn,
        timeoutMsg: () => "skulpt.timeoutError",
        __future__: Sk.python3,
    });
    console.log(Sk);
}

function stopPython() {
    pythonRunning = setRun(false);
    console.log(pythonRunning);
}

function setRun(status) {
    pythonRunning = Boolean(status);
}

function getRun() {
    return pythonRunning;
}

async function runPython(code, outputFn, errorFn) {
    setRun(true);
    initPython(outputFn);
    try {
        await Sk.misceval.asyncToPromise(
            () => Sk.importMainWithBody("<stdin>", false, code, true),
            {
                "*": () => {
                    if (!getRun()) throw new Error("Interrupted Execution");
                },
            }
        );
    } catch (error) {
        errorFn(error);
    } finally {
        pythonRunning = false;
    }
}

export { runPython, stopPython };
