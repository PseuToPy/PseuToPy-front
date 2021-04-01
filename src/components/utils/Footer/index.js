import { Link } from 'react-router-dom';
import './style.scss';

const Footer = () => {
    
    return (
        <div className="footer">
            <ul className="footer-list">
                <li className="p-d-inline footer-item">
                    <Link to="/about" className="footer-link" aria-haspopup="false" >
                        About
                    </Link>
                </li>
                <li className="p-d-inline footer-item">
                    <Link to="/cgu" className="footer-link" aria-haspopup="false">
                        Cgu
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Footer;