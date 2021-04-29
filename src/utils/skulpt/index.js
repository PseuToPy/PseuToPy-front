/* eslint-disable no-undef */
import "skulpt/dist/skulpt.min";
import "skulpt/dist/skulpt-stdlib";

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
        output: outputFn,
        read: inputFn,
        __future__: Sk.python3,
    });
};

const runPython = async (code, outputFn) => {
    initPython(outputFn);
    try {
        await Sk.misceval.asyncToPromise(() =>
            Sk.importMainWithBody("<stdin>", false, code, true)
        );
    } catch (error) {
        console.error(error.toString());
    }
};

export { runPython };
