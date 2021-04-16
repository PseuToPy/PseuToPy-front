import React, { useState } from 'react';
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import CodeEditor from "../../utils/CodeEditor";
import CodeViewer from "../../utils/CodeViewer";
import PanelOptions from "../../utils/PanelOptions";
import { convertPseudocode, writePseutopy } from "../../../redux/features/editor";

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

    const [checkedStatus, fold] = useState(false);

    const validatePseudocode = () => {
        dispatch(convertPseudocode({ 
            instructions: pseutopyCode, 
            language: i18n.language 
        }));
    }

    const writePseudocode = (newCode) => {
        dispatch(writePseutopy(codeStringToArray(newCode)));
    }

    const getTranslationStatusDiv = () => {
        let classNames = "editor-page-message";

        if(translationStatus) {
            switch(translationStatus.status) {
                case TranslationStatus.ERROR: classNames = `${classNames} error`; break;
                default: break;
            }
        }
        
        return (
            <div className={classNames}>
                {translationStatus ? translationStatus.message : ''}
            </div>
        )
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
            {getTranslationStatusDiv()}
        </div>
    );
};

export default Editor;
