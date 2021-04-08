
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchGrammar } from "../../../redux/features/editor"
import {
	Accordion,
    AccordionTab
} from 'primereact/accordion';

const PanelOptions = () => {

    const { i18n } = useTranslation();
    const dispatch = useDispatch();
    const grammar = useSelector(state => { 
        console.log(state);
        return state.editor.grammar
    });

    useEffect(() => {
        dispatch(fetchGrammar(i18n.language));
    }, [dispatch, i18n.language])

    const initialState = {
        activeIndex: []
    }

    const renderOptions = () => {
        return grammar.map(
            (category) =>
                <AccordionTab header={category.category} key={category.category}>
                    <div>
                        {category.rules.map((rule) => 
                            <h3 key={rule.rule}>{rule.rule}</h3>
                        )}
                    </div>
                </AccordionTab>
        );
    }

    const [state, setState] = useState(initialState);

    return (
        <div>

            <Accordion multiple
                activeIndex={state.activeIndex}
                onTabChange={e => setState({ activeIndex: e.index })}
            >
                {renderOptions()}
            </Accordion>
        </div>
    );
}

export default PanelOptions;