/* eslint-disable no-restricted-globals */
import { runPython } from "../utils/skulpt";
import MessageLevel from "../model/editor/messageLevel";

const workerOutputFn = output => {
    self.postMessage({
        end: false,
        type: MessageLevel.SUCCESS,
        message: output,
    });
};

const workerErrorFn = error => {
    self.postMessage({
        end: false,
        type: MessageLevel.ERROR,
        message: error.toString(),
    });
};

self.onmessage = ({ data }) => {
    runPython(data.code, workerOutputFn, workerErrorFn).finally(() => {
        self.postMessage({ end: true });
    });
};
