import "./style.scss";
import { Panel } from "primereact/panel";
import { useTranslation } from "react-i18next";

const Cgu = () => {
    const { t } = useTranslation();

    return (
        <div className="p-grid">
            <div className="p-col-2"></div>
            <Panel
                header={t("gcu.header")}
                className="p-col-8 p-shadow-4"
            ></Panel>
            <div className="p-col-2"></div>
        </div>
    );
};

export default Cgu;
