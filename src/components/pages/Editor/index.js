import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Panel } from "primereact/panel";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import CodeEditor from "../../utils/CodeEditor";
import PanelOptions from "../../utils/PanelOptions";

import {
    convertPseudocode,
    writePseutopy,
    setRequestUpdate,
} from "../../../redux/features/editor";
import MessageLevel from "../../../model/editor/messageLevel";
import workerCommands from "../../../model/pythonWorker/workerCommands";
import PythonWorker from "../../../worker/python.worker";
import "./style.scss";

const stringSeparator = "\n";

/**
 * function that returns a String from an array
 * @param {Array} code  
 * @returns {String} 
 */
const codeArrayToString = code => {
    return code.join(stringSeparator);
};

/**
 * function that returns an array from a String
 * @param {String} code 
 * @returns {Array}
 */
const codeStringToArray = code => {
    return code.split(stringSeparator);
};

/**
 * Editor Component
 * @function Editor
 * @return {JSX} Component template
 * @see React.Component
 */
const Editor = () => {
    const { i18n, t } = useTranslation();

    const dispatch = useDispatch();

    const consoleRef = useRef(null);
    const toast = useRef(null);

    const pseutopyCode = useSelector(state => state.editor.pseutopyCode);
    const pythonCode = useSelector(state => state.editor.pythonCode);
    const translationStatus = useSelector(
        state => state.editor.translationStatus
    );
    const requestUpdate = useSelector(state => state.editor.requestUpdate);

    const [pythonRunning, changePythonStatus] = useState(false);

    let pyWorker = new PythonWorker();
    pyWorker.onmessage = ({ data }) => {
        switch (data.type) {
            case workerCommands.START: {
                changePythonStatus(true);
                break;
            }
            case workerCommands.LOG: {
                consoleRef.current.appendChild(
                    createLog(data.level, data.message)
                );
                break;
            }
            case workerCommands.STOP: {
                changePythonStatus(false);
                break;
            }
            default:
                break;
        }
    };

    /**
     * Permet d'afficher un Toast
     * Severity: info, success, warn, error
     * Title: titre du Toast
     * Message: texte a afficher dans le Toast
     * Life: temps d'apparition en miliseconds
     */
    const showToast = (toastRef, severity, title, message, life) => {
        toastRef.current.show({
            severity: severity,
            summary: title,
            detail: message,
            life: life,
        });
    };

    useEffect(() => {
        if (requestUpdate) {
            if (translationStatus.status === MessageLevel.SUCCESS) {
                showToast(
                    toast,
                    "success",
                    t("editor.convertButton"),
                    t("editor.toastConvertButton"),
                    5000
                );
            } else if (translationStatus.status === MessageLevel.ERROR) {
                showToast(
                    toast,
                    "error",
                    t("editor.convertButton"),
                    t("editor.toastConvertButtonError"),
                    5000
                );
            } else {
                showToast(
                    toast,
                    "warn",
                    t("editor.convertButton"),
                    translationStatus ? translationStatus.message : "",
                    5000
                );
            }
            dispatch(setRequestUpdate(false));
        }
    }, [requestUpdate, translationStatus, dispatch, t]);

    const validatePseudocode = () => {
        dispatch(
            convertPseudocode({
                instructions: pseutopyCode,
                language: i18n.language,
            })
        );
    };

    const writePseudocode = newCode => {
        dispatch(writePseutopy(codeStringToArray(newCode)));
    };

    /**
     * function that create a log message
     * @param {String} level of the message 
     * @param {String} message 
     * @returns {JSX}
     */
    const createLog = (level, message) => {
        const log = document.createElement("div");
        if (level === MessageLevel.ERROR) {
            log.className = "log-message log-error";
            const messageArray = message.split(" ");
            const messageTranslated = t(
                messageArray.length >= 1 ? messageArray[1] : message
            );
            if (messageTranslated === message) {
                log.textContent = t("skulpt.defaultError");
            } else {
                log.textContent = messageTranslated;
            }
        } else {
            log.className = "log-message";
            log.textContent = message;
        }
        return log;
    };

    /**
     * function that clears the console log
     */
    const clearConsole = () => {
        consoleRef.current.innerHTML = "";
        showToast(
            toast,
            "info",
            t("editor.clearButton"),
            t("editor.toastClearButton"),
            2000
        );
    };

    /**
     * function that execute the python code
     */
    const executePython = () => {
        if (!pythonRunning) {
            showToast(
                toast,
                "success",
                t("editor.executeButton"),
                t("editor.toastExecuteButton"),
                2000
            );
            pyWorker.postMessage({
                type: workerCommands.START,
                code: codeArrayToString(pythonCode),
            });
        }
    };

    // Stop button not working
    // const stopPythonExecution = () => {
    //     if (pythonRunning) {
    //         pyWorker.postMessage({ type: workerCommands.STOP });
    //     }
    // };

    return (
        <div className="p-grid">
            <PanelOptions />
            <Panel header={"PseuToCode"} className="p-col-12 p-lg-6 p-shadow-4 header-light-color">
                <div className="content">
                    <CodeEditor
                        code={codeArrayToString(pseutopyCode)}
                        onWrite={newCode => writePseudocode(newCode)}
                    />
                </div>
                <Button
                    className="p-button-outlined p-m-2"
                    label={t("editor.convertButton")}
                    onClick={() => validatePseudocode()}
                ></Button>
            </Panel>
            <Panel header={"Python"} className="p-col-12 p-lg-6 p-shadow-4 header-light-color">
                <div className="content">
                    <CodeEditor
                        language="python"
                        code={codeArrayToString(pythonCode)}
                        readonly
                    />
                </div>
                <Button
                    className="p-button-outlined p-m-2"
                    label={t("editor.executeButton")}
                    onClick={() => executePython()}
                ></Button>
                <Button
                    className="p-button-outlined p-m-2 p-button-info"
                    label={t("editor.clearButton")}
                    onClick={() => clearConsole()}
                ></Button>
                {
                    // Stop button not working
                    // <Button
                    //     className="editor-page-stop-execution"
                    //     label="Stop"
                    //     onClick={() => stopPythonExecution()}
                    //     disabled={!pythonRunning}
                    // ></Button>
                }
            </Panel>
            <Panel header={"Console"} className="p-col-12 p-shadow-4 p-mt-3 header-light-color">
                <div className="console content">
                    <div className="log-message">{t("editor.consoleMsg")}</div>
                    <hr></hr>
                    <div ref={consoleRef}></div>
                </div>
            </Panel>
            <Toast ref={toast} />
        </div>
    );
};

export default Editor;
