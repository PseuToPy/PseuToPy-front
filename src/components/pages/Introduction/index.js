import "./style.scss";
import { useState, useEffect } from "react";
import { Panel } from "primereact/panel";
import { useTranslation } from "react-i18next";
import Markdown from "markdown-to-jsx";
import about_en from "./markdown/introduction_en.md";
import about_fr from "./markdown/introduction_fr.md";

const Introduction = () => {
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
                return about_fr;
            default:
                return about_en;
        }
    };

    return (
        <div className="p-grid">
            <div className="p-col-1 p-lg-2"></div>
            <Panel header={t("intro.header")} className="p-col-10 p-lg-8 p-shadow-4">
                <Markdown children={markdown} />
            </Panel>
            <div className="p-col-1 p-lg-2"></div>
        </div>
    );
};

export default Introduction;
