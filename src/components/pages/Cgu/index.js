import "./style.scss";
import { useState, useEffect } from "react";
import { Panel } from "primereact/panel";
import { useTranslation } from "react-i18next";
import Markdown from "markdown-to-jsx";
import gcu_en from "./markdown/gcu_en.md";
import gcu_fr from "./markdown/gcu_fr.md";

const Cgu = () => {
    const { t, i18n } = useTranslation();
    const [markdown, setMarkdown] = useState("");

    useEffect(() => {
        fetch(renderSwitch(i18n.language))
            .then(res => res.text())
            .then(text => setMarkdown(text));
    }, [i18n.language]);

    const renderSwitch = key => {
        switch (key) {
            case "fr":
                return gcu_fr;
            default:
                return gcu_en;
        }
    };

    return (
        <div className="p-grid">
            <div className="p-col-2"></div>
            <Panel header={t("gcu.header")} className="p-col-8 p-shadow-4">
                <Markdown children={markdown} />
            </Panel>
            <div className="p-col-2"></div>
        </div>
    );
};

export default Cgu;
