import React, { /*useState,*/ useEffect, useRef } from 'react'; // Désactivé car la fonctionnalité avancée n'est pas encore dev
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
// import { Checkbox } from "primereact/checkbox"; Désactivé car la fonctionnalité avancée n'est pas encore dev
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

    // const [checkedStatus, fold] = useState(false); Désactivé car la fonctionnalité avancée n'est pas encore dev
    const toast = useRef(null);

    /**
     * Permet d'afficher un Toast
     * Severity: info, success, warn, error
     * Title: titre du Toast
     * Message: texte a afficher dans le Toast
     * Life: temps d'apparition en miliseconds
     */
    const showToast = (toastRef, severity, title, message, life) => {
        toastRef.current.show({severity: severity, summary: title, detail: message, life: life});
    }

    useEffect(() => {
        if(requestUpdate) {
            if(translationStatus.status === MessageLevel.SUCCESS){
                showToast(toast,"success","Convert Code",translationStatus ? translationStatus.message : '',5000);
            }
            else if(translationStatus.status === MessageLevel.ERROR) {
                showToast(toast,"error","Convert Code",translationStatus ? translationStatus.message : '',10000);
            }
            else {
                showToast(toast,"warn","Convert Code",translationStatus ? translationStatus.message : '',10000);
            }
            dispatch(setRequestUpdate(false));
        }
    }, [requestUpdate, translationStatus, dispatch])


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
                {
                    /* Désactivé car la fonctionnalité avancée n'est pas encore dev
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
                    </div>*/
                }
                <Button
                    className="editor-page-validate"
                    label={t("editor.convertButton")}
                    onClick={() => validatePseudocode()}
                ></Button>
            </div>
            <Toast ref={toast}/>
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
