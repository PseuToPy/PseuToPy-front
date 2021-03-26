import './style.scss';
import { Panel } from 'primereact/panel';

const Error404 = () => {
    
    return (
        <div className="p-grid">
            <div className="p-col-2"></div>
            <Panel header="ERROR" className="p-col-8 p-shadow-4">
                <h1>ERROR 404</h1>
            </Panel>
            <div className="p-col-2"></div>
        </div>
    );
}

export default Error404;