import "./style.scss";
import { Link } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

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

    return (
        <div id="navbar" className="p-menubar p-component">
            <div className="p-menubar-start">
                <img
                    alt="logo"
                    src="./logo.png"
                    className="p-mr-2"
                    height="40"
                />
            </div>
            <ul className="p-menubar-root-list" role="menubar">
                <li role="none" className="p-menuitem">
                    <Link
                        to="/"
                        role="menuitem"
                        className="p-menuitem-link"
                        aria-haspopup="false"
                    >
                        <span className="p-menuitem-icon pi pi-home"></span>
                        <span className="p-menuitem-text">
                            {t("navigation.intro")}
                        </span>
                    </Link>
                </li>
                <li role="none" className="p-menuitem">
                    <Link
                        to="/editor"
                        role="menuitem"
                        className="p-menuitem-link"
                        aria-haspopup="false"
                    >
                        <span className="p-menuitem-icon pi pi-pencil"></span>
                        <span className="p-menuitem-text">
                            {t("navigation.edit")}
                        </span>
                    </Link>
                </li>
            </ul>
            <div className="p-menubar-end">
                <Dropdown
                    value={selectedLanguage}
                    options={language}
                    onChange={onLanguageChange}
                    optionLabel="name"
                    placeholder={t("navigation.placeholder")}
                />
            </div>
        </div>
    );
};

export default Navigation;
