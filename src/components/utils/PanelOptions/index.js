
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchGrammar } from "../../../redux/features/editor"
import {
	Accordion,
    AccordionTab
} from 'primereact/accordion';
import { Button } from 'primereact/button';

import CodeViewer from "../CodeViewer";
import "./style.scss";

const PanelOptions = () => {

    const { i18n } = useTranslation();
    const dispatch = useDispatch();
    const grammar = useSelector(state => state.editor.grammar);

    const [activeIndex, setActiveIndex] = useState([]);
    const [opened, fold] = useState(false);

    useEffect(() => {
        dispatch(fetchGrammar(i18n.language));
    }, [dispatch, i18n.language])

    const renderOptions = () => {
        return grammar.map(
            (category) =>
                <AccordionTab header={category.category} key={category.category} >
                    <div>
                        {category.rules.map((rule) => 
                            <div key={rule.rule}>
                                <h3>{rule.rule}</h3>
                                <div>
                                    {rule.samples.map(
                                        (sample) => (
                                            <div key={sample}>
                                                <CodeViewer code={sample} withLineNumbers={false}/>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </AccordionTab>
        );
    }

    return (
        <div className={`panel-options ${opened ? 'panel-opened' : ''}`}>
            <Accordion multiple
                activeIndex={activeIndex}
                onTabChange={e => setActiveIndex(e.index)}
                className="panel-options-accordion"
            >
                {renderOptions()}
            </Accordion>
            <Button className="panel-options-button" label={opened ? "<" : ">"} onClick={() => fold(!opened)}/>
        </div>
    );
}

export default PanelOptions;