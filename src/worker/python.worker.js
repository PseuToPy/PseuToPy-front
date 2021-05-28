/* eslint-disable no-restricted-globals */
import { runPython, stopPython } from "../utils/skulpt";
import MessageLevel from "../model/editor/messageLevel";
import workerCommands from "../model/pythonWorker/workerCommands";

const workerOutputFn = output => {
    self.postMessage({
        type: workerCommands.LOG,
        level: MessageLevel.SUCCESS,
        message: output,
    });
};

const workerErrorFn = error => {
    self.postMessage({
        type: workerCommands.LOG,
        level: MessageLevel.ERROR,
        message: error.toString(),
    });
};

self.onmessage = ({ data }) => {
    const { START, STOP } = workerCommands;
    switch (data.type) {
        case START: {
            runPython(data.code, workerOutputFn, workerErrorFn).finally(() => {
                self.postMessage({ type: STOP });
            });
            postMessage({ type: START });
            break;
        }
        case STOP: {
            stopPython();
            self.postMessage({ type: STOP });
            break;
        }
        default:
            break;
    }
};
