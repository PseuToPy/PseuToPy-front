import { useTranslation } from "react-i18next";
import { HashLink } from "react-router-hash-link";
import "./style.scss";

/**
 * @description Represents the footer of the page 
 * @return {JSX} 
 */
const Footer = () => {
    const { t } = useTranslation();
    return (
        <div className="footer">
            <div className="footer-list">
                <span className="footer-item">
                    <HashLink
                        to="/about"
                        className="footer-link"
                        aria-haspopup="false"
                    >
                        {t("footer.about")}
                    </HashLink>
                </span>
                <span className="footer-item">
                    <HashLink
                        to="/gcu"
                        className="footer-link"
                        aria-haspopup="false"
                    >
                        {t("footer.gcu")}
                    </HashLink>
                </span>
            </div>
        </div>
    );
};

export default Footer;
