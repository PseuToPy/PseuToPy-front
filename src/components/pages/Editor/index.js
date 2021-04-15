import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import CodeEditor from "../../utils/CodeEditor";
import CodeViewer from "../../utils/CodeViewer";
import PanelOptions from "../../utils/PanelOptions";
import { convertPseudocode, writePseutopy } from "../../../redux/features/editor"
import "./style.scss";

const stringSeparator = '\r';

const codeArrayToString = (code) => {
    console.log(code);
    return code.join(stringSeparator);
}

const codeStringToArray = (code) => {
    return code.split(stringSeparator);
}

const Editor = () => {
    const { i18n } = useTranslation();

    const dispatch = useDispatch();
    const pseutopyCode = useSelector(state => state.editor.pseutopyCode);
    const pythonCode = useSelector(state => state.editor.pythonCode);

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
                <Button className="editor-page-validate" label="Validate" onClick={() => validatePseudocode()}></Button>
            </div>
        </div>
    );
};

export default Editor;
