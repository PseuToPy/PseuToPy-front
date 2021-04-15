import "./style.scss";
import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menubar } from 'primereact/menubar';

const Navigation = () => {
    const { t, i18n } = useTranslation();

    const language = [
        { name: "English", code: "en" },
        { name: "Français", code: "fr" },
    ];

    const [selectedLanguage, setSelectedLanguage] = useState(language[0]);

    const onLanguageChange = e => {
        setSelectedLanguage(e.value);
        i18n.changeLanguage(e.value.code);
    };

    const start = <img alt="logo" src="./logo.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="p-mr-2"></img>;

    const items = [
        {
            label: t("navigation.intro"),
            icon: 'pi pi-fw pi-home',
            command: () => { window.location = "#/" }
        },
        {
            label: t("navigation.edit"),
            icon: 'pi pi-fw pi-pencil',
            command: () => { window.location = "#/editor" }
        }
    ];

    const end = <Dropdown
            value={selectedLanguage}
            options={language}
            onChange={onLanguageChange}
            optionLabel="name"
            placeholder={t("navigation.placeholder")}
        />

    
    return (
        <Menubar model={items} start={start} end={end} />
    );
    
};

export default Navigation;
