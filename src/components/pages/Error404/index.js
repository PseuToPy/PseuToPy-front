import "./style.scss";
import { Panel } from "primereact/panel";
import { useTranslation } from "react-i18next";

const Error404 = () => {
    const { t } = useTranslation();

    return (
        <div className="p-grid">
            <div className="p-col-2"></div>
            <Panel header={t("error.header")} className="p-col-8 p-shadow-4">
                <h1>{t("error.message")} </h1>
            </Panel>
            <div className="p-col-2"></div>
        </div>
    );
};

export default Error404;
