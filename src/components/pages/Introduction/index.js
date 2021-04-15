import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { up, down } from "../../../redux/features/test/testSlice";
import { Panel } from "primereact/panel";
import { useTranslation } from "react-i18next";

const Introduction = () => {
    const count = useSelector(state => state.test.value);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    return (
        <div className="p-grid">
            <div className="p-col-1 p-lg-2"></div>
            <Panel header={t("intro.header")} className="p-col-10 p-lg-8 p-shadow-4">
                <button onClick={() => dispatch(down(2))}>
                    {t("test.less")}
                </button>
                <button onClick={() => dispatch(up(2))}>
                    {t("test.more")}
                </button>
                <br />
                <br />
                <span>{count}</span>
                <br />
                <h1>{t("test.1")}</h1>
            </Panel>
            <div className="p-col-1 p-lg-2"></div>
        </div>
    );
};

export default Introduction;
