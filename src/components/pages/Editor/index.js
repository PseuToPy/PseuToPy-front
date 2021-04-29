import React, { useState, useEffect, useRef } from 'react';
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import { Checkbox } from "primereact/checkbox";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import CodeEditor from "../../utils/CodeEditor";
import CodeViewer from "../../utils/CodeViewer";
import PanelOptions from "../../utils/PanelOptions";
import { convertPseudocode, writePseutopy , setRequestUpdate} from "../../../redux/features/editor";

import TranslationStatus from "../../../model/editor/translationStatus";
import "./style.scss";

const stringSeparator = '\r';

const codeArrayToString = (code) => {
    return code.join(stringSeparator);
}

const codeStringToArray = (code) => {
    return code.split(stringSeparator);
}

const Editor = () => {
    const { i18n, t } = useTranslation();
    const dispatch = useDispatch();
    const pseutopyCode = useSelector(state => state.editor.pseutopyCode);
    const pythonCode = useSelector(state => state.editor.pythonCode);
    const translationStatus = useSelector(state => state.editor.translationStatus);
    const requestUpdate = useSelector(state => state.editor.requestUpdate);

    const [checkedStatus, fold] = useState(false);
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
            if(translationStatus.status === TranslationStatus.SUCCESS){
                showToast(toast,"success","Convert Code",translationStatus ? translationStatus.message : '',5000);
            }
            else if(translationStatus.status === TranslationStatus.ERROR) {
                showToast(toast,"error","Convert Code",translationStatus ? translationStatus.message : '',10000);
            }
            else {
                showToast(toast,"warn","Convert Code",translationStatus ? translationStatus.message : '',10000);
            }
            dispatch(setRequestUpdate(false));
        }
    }, [requestUpdate, translationStatus, dispatch])


    const validatePseudocode = () => {
        dispatch(convertPseudocode({ 
            instructions: pseutopyCode, 
            language: i18n.language 
        }));
    }

    const writePseudocode = (newCode) => {
        dispatch(writePseutopy(codeStringToArray(newCode)));
    }
    

    return (
        <div className="editor-page">
            <div className="editor-page-content">
                <PanelOptions/>
                <CodeEditor code={codeArrayToString(pseutopyCode)} onWrite={(newCode) => writePseudocode(newCode)}/>
                <CodeViewer language="python" code={codeArrayToString(pythonCode)} />
            </div>
            <div className="editor-page-action">
                <div className="editor-page-action-checkbox">
                    <Checkbox
                        inputId='editorPageAutoCompleteCheckbox'
                        value='auto-complete'
                        checked={checkedStatus}
                        onChange={() => fold(!checkedStatus)}
                    />
                    <label htmlFor='editorPageAutoCompleteCheckbox' className='p-checkbox-label'>
                        {t("editor.autoCompleteCheckBox")}
                    </label>
                </div>
                <Button className="editor-page-validate" label={t("editor.convertButton")} onClick={() => validatePseudocode()}></Button>
            </div>
            <Toast ref={toast}/>
        </div>
    );
};

export default Editor;
