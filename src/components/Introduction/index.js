import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { items } from './content';
import {
	Accordion,
	AccordionTab
} from 'primereact/accordion';
import './Introduction.css';

const Introduction = () => {
    
    const initialState = {
        activeIndex: []
    }

	const [state, setState] = useState(initialState);

    const start = <img alt="logo" src="showcase/images/logo.png" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="p-mr-2"></img>;
    const end = <InputText placeholder="Search" type="text" />;

    return (
        <div>
            <div className="card">
                <Menubar model={items} start={start} end={end} />
                <Button label="Ceci est un test"/>
            </div>
            <div className="card">
                <Accordion multiple
                    activeIndex={state.activeIndex}
                    onTabChange={e => setState({ activeIndex: e.index })}
                >
					<AccordionTab header='Header I'>Content I</AccordionTab>
					<AccordionTab header='Header II'>Content II</AccordionTab>
					<AccordionTab header='Header III'>Content III</AccordionTab>
				</Accordion>
            </div>
        </div>
    );
}

export default Introduction;