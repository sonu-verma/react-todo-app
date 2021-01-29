import propTypes from 'prop-types';

const Button = ({text,color,onClick}) => {

    return <button onClick={onClick} style={{ background:color}} className="btn add-button">{text}</button>
}

Button.defaultProps = {
    color: 'steelblue'
}

Button.propTypes = {
    color: propTypes.string,
    text: propTypes.string,
    onClick: propTypes.func
}
export default Button