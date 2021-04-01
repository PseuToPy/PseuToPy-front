import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./style.scss";

const Footer = () => {
    const { t } = useTranslation();
    return (
        <div className="footer">
            <ul className="footer-list">
                <li className="p-d-inline footer-item">
                    <Link
                        to="/about"
                        className="footer-link"
                        aria-haspopup="false"
                    >
                        {t("footer.about")}
                    </Link>
                </li>
                <li className="p-d-inline footer-item">
                    <Link
                        to="/cgu"
                        className="footer-link"
                        aria-haspopup="false"
                    >
                        {t("footer.gcu")}
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Footer;
