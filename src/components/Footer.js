import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
const Footer = () => {
    const location  = useLocation();
    return (
        <footer>
            Copyright &copy; 2021.<br />
    { location.pathname === '/' && <Link to="/about">About Me</Link> } 
            
        </footer>
    );
}

export default Footer