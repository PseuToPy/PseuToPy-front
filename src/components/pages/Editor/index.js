import { useTranslation } from "react-i18next";
import "./style.scss";

const Editor = () => {
    const { t } = useTranslation();

    return <h1>{t("editor.header")}</h1>;
};

export default Editor;
