import './MenuButton.css'

interface MenuButtonProps {
    index: number;
    name: string;
};

const MenuButton = ({index, name}: MenuButtonProps) => {
    return (
        <div className="menu-btn" role="button">
            <span>{index}.</span>{name}
        </div>
    );
};

export default MenuButton;