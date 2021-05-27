import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGrammar } from "../../../redux/features/editor";
import { TabView, TabPanel } from "primereact/tabview";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";

import CodeViewer from "../CodeViewer";
import "./style.scss";

const PanelOptions = () => {
    const { i18n } = useTranslation();
    const dispatch = useDispatch();
    const grammar = useSelector(state => state.editor.grammar);
    const [opened, fold] = useState(true);

    useEffect(() => {
        dispatch(fetchGrammar(i18n.language));
    }, [dispatch, i18n.language]);

    const renderOptions = () => {
        return grammar.map(category => (
            <TabPanel
                header={category.category}
                key={category.category}
                className="panel-options-tabpanel"
            >
                <div className="p-d-flex p-flex-wrap">
                    {category.rules.map(rule => (
                        <div key={rule.rule} className="p-mr-4">
                            <h3>{rule.rule}</h3>
                            <div>
                                {rule.samples.map(sample => (
                                    <div key={sample}>
                                        <CodeViewer
                                            code={sample}
                                            withLineNumbers={sample.includes(
                                                "\n"
                                            )}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </TabPanel>
        ));
    };

    return (
        <Panel header="Documentation" className="p-col-12 p-shadow-4 p-mb-3 header-light-color">
            <TabView className={`panel-options ${opened ? 'panel-opened' : ''}`}>
                {renderOptions()}
            </TabView>
            <center className="height-0px">
                <Button className="p-button-rounded panel-options-button button-light-color" label={opened ? <i className="pi pi-arrow-up"></i> : <i className="pi pi-arrow-down"></i>} onClick={() => fold(!opened)} />
            </center>
        </Panel>
    );
};

export default PanelOptions;
