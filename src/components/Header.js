import Button from './Button.js';
import { useLocation } from 'react-router-dom'
const Header = ({ title,onAdd,showAddTask }) => {
    const location =  useLocation();
    return (
        <header className="header">
            <h1 className="heading">{title}</h1>
            {location.pathname === '/' && <Button 
                color={ (showAddTask)?'red':'green' } 
                text={ (showAddTask) ? 'Close' : 'Add' } 
                onClick={onAdd} /> }
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

export default Header
