import "./style.scss";
import { Panel } from "primereact/panel";
import { useTranslation } from "react-i18next";

/**
 * Error404 Component
 * @function Error404
 * @return {JSX} Component template
 * @see React.Component
 */
const Error404 = () => {
    const { t } = useTranslation();

    return (
        <div className="p-grid">
            <div className="p-col-1 p-lg-2"></div>
            <Panel header={t("error.header")} className="p-col-10 p-lg-8 p-shadow-4">
                <h1>{t("error.message")} </h1>
            </Panel>
            <div className="p-col-1 p-lg-2"></div>
        </div>
    );
};

export default Error404;
