import React, { useState } from "react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import CodeEditor from "../../utils/CodeEditor";
import PanelOptions from "../../utils/PanelOptions";
import {
    appendLog,
    clearLogs,
    convertPseudocode,
    writePseutopy,
} from "../../../redux/features/editor";

import MessageLevel from "../../../model/editor/translationStatus";
import "./style.scss";
import { runPython } from "../../../utils/skulpt";

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
    const logs = useSelector(state => state.editor.console);
    const pseutopyCode = useSelector(state => state.editor.pseutopyCode);
    const pythonCode = useSelector(state => state.editor.pythonCode);
    const translationStatus = useSelector(
        state => state.editor.translationStatus
    );

    const [checkedStatus, fold] = useState(false);

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

    const executePython = () => {
        const onOutput = output => {
            dispatch(
                appendLog({ type: MessageLevel.SUCCESS, message: output })
            );
        };
        const onError = error => {
            dispatch(
                appendLog({
                    type: MessageLevel.ERROR,
                    message: error.toString(),
                })
            );
        };
        runPython(codeArrayToString(pythonCode), onOutput, onError);
    };

    const clearConsole = () => {
        dispatch(clearLogs());
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

    const getLogs = () => {
        return logs.map((log, index) => (
            <div
                key={index}
                className={`log-message ${
                    log.status === MessageLevel.ERROR ? "log-error" : ""
                }`}
            >
                {log.message}
            </div>
        ));
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
                ></Button>
                <Button
                    className="editor-page-clear-console"
                    label={t("editor.clearConsoleButton")}
                    onClick={() => clearConsole()}
                ></Button>
                <div className="editor-console">{getLogs()}</div>
            </div>
        </div>
    );
};

export default Editor;
