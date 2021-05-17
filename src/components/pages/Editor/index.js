import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import CodeEditor from "../../utils/CodeEditor";
import PanelOptions from "../../utils/PanelOptions";

import {
    convertPseudocode,
    writePseutopy,
} from "../../../redux/features/editor";
import MessageLevel from "../../../model/editor/messageLevel";
import workerCommands from "../../../model/pythonWorker/workerCommands";
import PythonWorker from "../../../worker/python.worker";
import "./style.scss";

const stringSeparator = "\n";

const codeArrayToString = code => {
    return code.join(stringSeparator);
};

const codeStringToArray = code => {
    return code.split(stringSeparator);
};

const Editor = () => {
    const { i18n, t } = useTranslation();
    const dispatch = useDispatch();
    const consoleRef = useRef(null);
    const pseutopyCode = useSelector(state => state.editor.pseutopyCode);
    const pythonCode = useSelector(state => state.editor.pythonCode);
    const translationStatus = useSelector(
        state => state.editor.translationStatus
    );

    const [checkedStatus, fold] = useState(false);
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
                stopPythonExecution();
                break;
            }
            default:
                break;
        }
    };

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

    const createLog = (level, message) => {
        const log = document.createElement("div");
        log.className = `log-message ${
            level === MessageLevel.ERROR ? "log-error" : ""
        }`;
        log.textContent = message;
        return log;
    };

    const clearConsole = () => {
        consoleRef.current.innerHTML = "";
    };

    const executePython = () => {
        if (!pythonRunning) {
            pyWorker.postMessage({
                type: workerCommands.START,
                code: codeArrayToString(pythonCode),
            });
        }
    };

    const stopPythonExecution = () => {
        if (pythonRunning) {
            changePythonStatus(false);
        }
    };

    const getTranslationStatusDiv = () => {
        let classNames = "editor-page-message";

        if (translationStatus) {
            switch (translationStatus.status) {
                case MessageLevel.ERROR:
                    classNames = `${classNames} error`;
                    break;
                default:
                    break;
            }
        }

        return (
            <div className={classNames}>
                {translationStatus ? translationStatus.message : ""}
            </div>
        );
    };

    return (
        <div className="editor-page">
            <div className="editor-page-content">
                <PanelOptions />
                <CodeEditor
                    code={codeArrayToString(pseutopyCode)}
                    onWrite={newCode => writePseudocode(newCode)}
                />
                <CodeEditor
                    language="python"
                    code={codeArrayToString(pythonCode)}
                    readonly
                />
            </div>
            <div className="editor-page-action">
                <div className="editor-page-action-checkbox">
                    <Checkbox
                        inputId="editorPageAutoCompleteCheckbox"
                        value="auto-complete"
                        checked={checkedStatus}
                        onChange={() => fold(!checkedStatus)}
                    />
                    <label
                        htmlFor="editorPageAutoCompleteCheckbox"
                        className="p-checkbox-label"
                    >
                        {t("editor.autoCompleteCheckBox")}
                    </label>
                </div>
                <Button
                    className="editor-page-validate"
                    label={t("editor.convertButton")}
                    onClick={() => validatePseudocode()}
                ></Button>
            </div>
            {getTranslationStatusDiv()}
            <div>
                <Button
                    className="editor-page-execute-py"
                    label={t("editor.executeButton")}
                    onClick={() => executePython()}
                    disabled={pythonRunning}
                ></Button>
                <Button
                    className="editor-page-clear-console"
                    label={t("editor.clearConsoleButton")}
                    onClick={() => clearConsole()}
                ></Button>
                <Button
                    className="editor-page-stop-execution"
                    label="Stop"
                    onClick={() => stopPythonExecution()}
                    disabled={!pythonRunning}
                ></Button>
                <div className="editor-console" ref={consoleRef}></div>
            </div>
        </div>
    );
};

export default Editor;
