import "./style.scss";
import { useState, useEffect } from "react";
import { Panel } from "primereact/panel";
import { useTranslation } from "react-i18next";
import Markdown from "markdown-to-jsx";
import gcu_en from "./markdown/gcu_en.md";
import gcu_fr from "./markdown/gcu_fr.md";

/**
 * Gcu Component
 * @function Gcu
 * @return {JSX} Component template
 * @see React.Component
 */
const Gcu = () => {
    const { t, i18n } = useTranslation();
    const [markdown, setMarkdown] = useState("");

    useEffect(() => {
        fetch(renderSwitch(i18n.language))
            .then(res => res.text())
            .then(text => setMarkdown(text));
    }, [i18n.language]);

    /**
     * Functions that returns the markdown with the correct language for GCU
     * @param {String} key language
     * @returns {Markdown} the markdown file
     */
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
            <div className="p-col-1 p-lg-2"></div>
            <Panel header={t("gcu.header")} className="p-col-10 p-lg-8 p-shadow-4">
                <Markdown children={markdown} />
            </Panel>
            <div className="p-col-1 p-lg-2"></div>
        </div>
    );
};

export default Gcu;
