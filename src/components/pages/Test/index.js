import React, { useState, useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { Toast } from 'primereact/toast';
import {
	Accordion,
	AccordionTab
} from 'primereact/accordion';
import './style.scss';
import { items, dropdownItems } from './content';

const Test = () => {
    
    const initialState = {
        activeIndex: [],
        dropdownValue: ""
    }

	const [state, setState] = useState(initialState);

    const start = <img alt="logo" src="showcase/images/logo.png" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="p-mr-2"></img>;
    const end = <InputText placeholder="Search" type="text" />;
    const toast = useRef(null);

    /**
     * Permet d'afficher un Toast
     * Severity: info, success, warn, error
     * Title: titre du Toast
     * Message: texte a afficher dans le Toast
     * Life: temps d'apparition en miliseconds
     */
    const showToast = (toastRef, severity, title, message, life) => {
        toastRef.current.show({severity: severity, summary: title, detail: message, life: life});
    }
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
                <Dropdown
                    value={state.dropdownValue}
                    options={dropdownItems}
                    onChange={e => setState({dropdownValue: e.value})}
                />
            </div>
            <div className="card">
                <Panel header='Godfather I'>
                    The story begins as Don Vito Corleone, the head of a New York Mafia
                    family, oversees his daughter's wedding. His beloved son Michael has
                    just come home from the war, but does not intend to become part of
                    his father's business. Through Michael's life the nature of the
                    family business becomes clear. The business of the family is just
                    like the head of the family, kind and benevolent to those who give
                    respect, but given to ruthless violence whenever anything stands
                    against the good of the family.
                </Panel>
                <Panel header='Godfather I' style={{ marginTop: '2em' }} toggleable={true}>
                    The story begins as Don Vito Corleone, the head of a New York Mafia
                    family, oversees his daughter's wedding. His beloved son Michael has
                    just come home from the war, but does not intend to become part of
                    his father's business. Through Michael's life the nature of the
                    family business becomes clear. The business of the family is just
                    like the head of the family, kind and benevolent to those who give
                    respect, but given to ruthless violence whenever anything stands
                    against the good of the family.
                </Panel>
            </div>
            <div className="card">
                <Button label="Success" className="p-button-success" onClick={() => showToast(toast,"success","Titre","TEST",10000)} />
                <Button label="Warn" className="p-button-warning" onClick={() => showToast(toast,"warn","Titre", "TEST",10000)} />
                <Button label="Error" className="p-button-danger" onClick={() => showToast(toast,"error","Titre", "TEST",10000)} />
                <Button label="Info" className="p-button-info" onClick={() => showToast(toast,"info","Titre","TEST",10000)} />
                <Toast ref={toast}/>
            </div>
        </div>
    );
}

export default Test;