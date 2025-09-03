import React from 'react';

interface PopupMenuItem {
    id: string;
    label: string;
    path: string;
    icon?: React.ReactNode;
}

interface PopupMenuProps {
    items: PopupMenuItem[];
    isVisible: boolean;
    onItemClick: (path: string) => void;
    isActive: (path: string) => boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    position?: {
        left: string;
        top: string;
    };
}

const PopupMenu: React.FC<PopupMenuProps> = ({ 
    items, 
    isVisible, 
    onItemClick, 
    isActive, 
    onMouseEnter, 
    onMouseLeave,
    position = { left: '50px', top: '-10px' }
}) => {
    
    if (!isVisible) return null;

    return (
        <div 
            style={{
                position: 'fixed',
                left: position.left,
                top: position.top,
                backgroundColor: '#1a1a1a',
                borderRadius: '8px',
                padding: '8px 0',
                minWidth: '200px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                zIndex: 99999,
                border: '1px solid #333',
                pointerEvents: 'auto'
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {items.map((item) => (
                <div 
                    key={item.id}
                    onClick={() => onItemClick(item.path)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        margin: '2px 4px',
                        color: 'white',
                        fontSize: '14px',
                        cursor: 'pointer',
                        backgroundColor: isActive(item.path) ? '#1976d2' : 'transparent',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => !isActive(item.path) && (e.currentTarget.style.backgroundColor = '#333')}
                    onMouseLeave={(e) => !isActive(item.path) && (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                    {item.icon && (
                        <span style={{ marginRight: '8px' }}>
                            {item.icon}
                        </span>
                    )}
                    <span>{item.label}</span>
                </div>
            ))}
        </div>
    );
};

export default PopupMenu;
