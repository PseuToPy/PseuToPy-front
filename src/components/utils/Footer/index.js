import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./style.scss";

const Footer = () => {
    const { t } = useTranslation();
    return (
        <div className="footer">
            <div className="footer-list">
                <span className="footer-item">
                    <Link
                        to="/about"
                        className="footer-link"
                        aria-haspopup="false"
                    >
                        {t("footer.about")}
                    </Link>
                </span>
                <span className="footer-item">
                    <Link
                        to="/cgu"
                        className="footer-link"
                        aria-haspopup="false"
                    >
                        {t("footer.gcu")}
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default Footer;
