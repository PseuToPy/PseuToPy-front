import { useTranslation } from "react-i18next";
import { HashLink } from "react-router-hash-link";
import "./style.scss";

const Footer = () => {
    const { t } = useTranslation();
    return (
        <div className="footer">
            <ul className="footer-list">
                <li className="p-d-inline footer-item">
                    <HashLink
                        to="/about"
                        className="footer-link"
                        aria-haspopup="false"
                    >
                        {t("footer.about")}
                    </HashLink>
                </li>
                <li className="p-d-inline footer-item">
                    <HashLink
                        to="/cgu"
                        className="footer-link"
                        aria-haspopup="false"
                    >
                        {t("footer.gcu")}
                    </HashLink>
                </li>
            </ul>
        </div>
    );
};

export default Footer;
