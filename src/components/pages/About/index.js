import './style.scss';
import { Panel } from 'primereact/panel';

const About = () => {
    
    return (
        <div className="p-grid">
            <div className="p-col-2"></div>
            <Panel header="About" className="p-col-8 p-shadow-4">
                
            </Panel>
            <div className="p-col-2"></div>
        </div>
    );
}

export default About;