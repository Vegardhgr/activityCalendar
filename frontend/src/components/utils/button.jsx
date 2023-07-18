const Button = ({className, onClick, buttonText}) => {
    return (
    <button className = {className} onClick = {onClick}>{buttonText}</button>);
};

export default Button;