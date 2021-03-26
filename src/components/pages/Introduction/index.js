import './style.scss';
import { useSelector, useDispatch } from 'react-redux'
import { up, down } from '../../../redux/features/test/testSlice'
import { Panel } from 'primereact/panel';

const Introduction = () => {
    const count = useSelector(state => state.test.value);
    const dispatch = useDispatch();
    
    return (
        <div className="p-grid">
            <div className="p-col-2"></div>
            <Panel header="Introduction" className="p-col-8 p-shadow-4">
                <button onClick={() => dispatch(down(2))}>Less</button>
                <button onClick={() => dispatch(up(2))}>More</button>
                <br /><br />
                <span>{count}</span>
            </Panel>
            <div className="p-col-2"></div>
        </div>
    );
}

export default Introduction;