/* eslint-disable no-undef */
import "skulpt/dist/skulpt.min";
import "skulpt/dist/skulpt-stdlib";

let pythonRunning = false;

const initPython = outputFn => {
    const inputFn = x => {
        if (
            Sk.builtinFiles === undefined ||
            Sk.builtinFiles["files"][x] === undefined
        )
            throw new Error("File not found: '" + x + "'");
        return Sk.builtinFiles["files"][x];
    };

    Sk.configure({
        yieldLimit: 100,
        execLimit: 5000,
        killableWhile: true,
        killableFor: true,

        output: outputFn,
        read: inputFn,
        __future__: Sk.python3,
    });
};

const runPython = async (code, outputFn, errorFn) => {
    pythonRunning = true;
    initPython(outputFn);
    try {
        await Sk.misceval.asyncToPromise(
            () => Sk.importMainWithBody("<stdin>", false, code, true),
            {
                "*": () => {
                    console.log(pythonRunning);
                    if (!pythonRunning)
                        throw new Error("Interrupted Execution");
                },
            }
        );
    } catch (error) {
        errorFn(error);
    } finally {
        pythonRunning = false;
    }
};

const stopPython = () => {
    pythonRunning = false;
};

export { runPython, stopPython };
