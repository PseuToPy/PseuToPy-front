import React, { useEffect, useRef } from 'react';
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import { Panel } from 'primereact/panel';
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import CodeEditor from "../../utils/CodeEditor";
import PanelOptions from "../../utils/PanelOptions";
import {
    appendLog,
    clearLogs,
    convertPseudocode,
    writePseutopy,
    setRequestUpdate
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
    const translationStatus = useSelector(state => state.editor.translationStatus);
    const requestUpdate = useSelector(state => state.editor.requestUpdate);
    const toast = useRef(null);

    /**
     * Permet d'afficher un Toast
     * Severity: info, success, warn, error
     * Title: titre du Toast
     * Message: texte a afficher dans le Toast
     * Life: temps d'apparition en miliseconds
     */
    const showToast = (toastRef, severity, title, message, life) => {
        toastRef.current.show({ severity: severity, summary: title, detail: message, life: life });
    }

    useEffect(() => {
        if (requestUpdate) {
            if (translationStatus.status === MessageLevel.SUCCESS) {
                showToast(toast, "success", t("editor.convertButton"), t("editor.toastConvertButton"), 5000);
            }
            else if (translationStatus.status === MessageLevel.ERROR) {
                showToast(toast, "error", t("editor.convertButton"), t("editor.toastConvertButtonError"), 5000);
            }
            else {
                showToast(toast, "warn", t("editor.convertButton"), translationStatus ? translationStatus.message : '', 5000);
            }
            dispatch(setRequestUpdate(false));
        }
    }, [requestUpdate, translationStatus, dispatch, t])


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
        showToast(toast, "success", t("editor.executeButton"), t("editor.toastExecuteButton"), 2000);
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
        showToast(toast, "info", t("editor.clearButton"), t("editor.toastClearButton"), 2000);
    };


    const getLogs = () => {
        return logs.map((log, index) => (
            <div
                key={index}
                className={`log-message ${log.status === MessageLevel.ERROR ? "log-error" : ""}`}
            >
                {log.message}
            </div>
        ));
    };

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
            </Panel>
            <Panel header={"Console"} className="p-col-12 p-shadow-4 p-mt-3 header-light-color">
                <div className="console content">
                    <div className="log-message">{t("editor.consoleMsg")}</div>
                    <hr></hr>
                    {getLogs()}
                </div>
            </Panel>
            <Toast ref={toast} />
        </div>
    );

};

export default Editor;
