import React from 'react';

interface SubMenuItem {
    id: string;
    label: string;
    path: string;
}

interface SubMenuProps {
    items: SubMenuItem[];
    isOpen: boolean;
    onItemClick: (path: string) => void;
    isActive: (path: string) => boolean;
}

const SubMenu: React.FC<SubMenuProps> = ({ items, isOpen, onItemClick, isActive }) => {
    if (!isOpen) return null;

    return (
        <div style={{ marginLeft: '20px', borderLeft: '1px solid #333'}}>
            {items.map((item) => (
                <div 
                    key={item.id}
                    onClick={() => onItemClick(item.path)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '8px 16px',
                        color: 'white',
                        borderRadius: '6px',
                        transition: 'background-color 0.2s',
                        cursor: 'pointer',
                        backgroundColor: isActive(item.path) ? '#1976d2' : 'transparent',
                        fontSize: '14px',
                        marginTop: '5px',
                        marginLeft: '10px'
                    }} 
                    onMouseEnter={(e) => !isActive(item.path) && (e.currentTarget.style.backgroundColor = '#333')} 
                    onMouseLeave={(e) => !isActive(item.path) && (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                    <span style={{ marginLeft: '20px'}}>
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default SubMenu;
