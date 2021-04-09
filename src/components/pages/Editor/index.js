import { useTranslation } from "react-i18next";
import CodeEditor from "../../utils/CodeEditor";
import PanelOptions from "../../utils/PanelOptions";
import "./style.scss";

const Editor = () => {
    const { t } = useTranslation();

    return (
        <div className="editor-page">
            <div className="editor-page-content">
                <PanelOptions/>
                <CodeEditor/>
            </div>
        </div>
    );
};

export default Editor;
