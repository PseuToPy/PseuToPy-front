import "./style.scss";
import { Panel } from "primereact/panel";
import { useTranslation } from "react-i18next";

const About = () => {
    const { t } = useTranslation();

    return (
        <div className="p-grid">
            <div className="p-col-1 p-lg-2"></div>
            <Panel header={t("about.header")} className="p-col-10 p-lg-8 p-shadow-4">
                <div id="content">
                    <h2
                        dangerouslySetInnerHTML={{
                            __html: t("about:part_1.header"),
                        }}
                    />
                    <p
                        dangerouslySetInnerHTML={{
                            __html: t("about:part_1.1"),
                        }}
                    />
                    <p
                        dangerouslySetInnerHTML={{
                            __html: t("about:part_1.2"),
                        }}
                    />
                    <p
                        dangerouslySetInnerHTML={{
                            __html: t("about:part_1.3"),
                        }}
                    />
                    <h2
                        dangerouslySetInnerHTML={{
                            __html: t("about:part_2.header"),
                        }}
                    />
                    <p
                        dangerouslySetInnerHTML={{
                            __html: t("about:part_2.1"),
                        }}
                    />
                    <p
                        dangerouslySetInnerHTML={{
                            __html: t("about:part_2.2"),
                        }}
                    />
                    <p
                        dangerouslySetInnerHTML={{
                            __html: t("about:part_2.3"),
                        }}
                    />
                </div>
            </Panel>
            <div className="p-col-1 p-lg-2"></div>
        </div>
    );
};

export default About;
