import { useTranslation } from "react-i18next";
import CodeEditor from "../../utils/CodeEditor";
import PanelOptions from "../../utils/PanelOptions";
import "./style.scss";

const Editor = () => {
    const { t } = useTranslation();

    return (
        <div>
            <h1>{t("editor.header")}</h1>
            <PanelOptions/>
        </div>
    );
};

export default Editor;
