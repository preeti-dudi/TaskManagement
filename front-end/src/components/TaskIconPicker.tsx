import React, { useState } from 'react';
import * as Icons from '@ant-design/icons';
import { Tooltip, Modal, Button, Input } from 'antd';

// Define the icon list as an array of objects
const iconList: Array<{ name: keyof typeof Icons, color: string }> = [
    { name: 'CheckOutlined', color: '#52c41a' },
    { name: 'ClockCircleOutlined', color: '#faad14' },
    { name: 'EditOutlined', color: '#1890ff' },
    { name: 'PlusOutlined', color: '#722ed1' },
    { name: 'FormOutlined', color: '#13c2c2' },
    { name: 'CalendarOutlined', color: '#ff4d4f' },
    { name: 'SyncOutlined', color: '#1890ff' },
    { name: 'BellOutlined', color: '#faad14' },
    { name: 'HourglassOutlined', color: '#fa541c' },
    { name: 'DeleteOutlined', color: '#ff4d4f' },
    { name: 'FolderOutlined', color: '#faad14' },
    { name: 'ToolOutlined', color: '#722ed1' },
    { name: 'LineChartOutlined', color: '#13c2c2' },
    { name: 'SettingOutlined', color: '#faad14' },
    { name: 'BgColorsOutlined', color: '#eb2f96' },
    { name: 'SearchOutlined', color: '#1890ff' },
    { name: 'RestOutlined', color: '#52c41a' },
    { name: 'TagsOutlined', color: '#eb2f96' },
    { name: 'CopyOutlined', color: '#722ed1' },
    { name: 'AimOutlined', color: '#faad14' },
    { name: 'CommentOutlined', color: '#722ed1' },
    { name: 'StopOutlined', color: '#ff4d4f' },
    { name: 'PaperClipOutlined', color: '#13c2c2' },
    { name: 'BookOutlined', color: '#722ed1' },
    { name: 'SaveOutlined', color: '#52c41a' },
    { name: 'PrinterOutlined', color: '#13c2c2' },
    { name: 'WifiOutlined', color: '#eb2f96' },
    { name: 'LockOutlined', color: '#fa541c' },
    { name: 'InboxOutlined', color: '#faad14' },
    { name: 'SendOutlined', color: '#722ed1' },
    { name: 'PushpinOutlined', color: '#eb2f96' },
    { name: 'CompassOutlined', color: '#faad14' },
    { name: 'FlagOutlined', color: '#1890ff' },
    { name: 'AlertOutlined', color: '#ff4d4f' },
    { name: 'FireOutlined', color: '#fa541c' },
    { name: 'ThunderboltOutlined', color: '#faad14' },
    { name: 'GiftOutlined', color: '#fa541c' },
    { name: 'AudioOutlined', color: '#722ed1' },
    { name: 'KeyOutlined', color: '#faad14' },
    { name: 'EyeOutlined', color: '#13c2c2' },
    { name: 'StarOutlined', color: '#faad14' },
    { name: 'MailOutlined', color: '#1890ff' },
    { name: 'BulbOutlined', color: '#faad14' },
    { name: 'TrophyOutlined', color: '#fa541c' },
    { name: 'RocketOutlined', color: '#722ed1' },
    { name: 'UserOutlined', color: '#13c2c2' },
    { name: 'ToolOutlined', color: '#faad14' },
];

interface TaskIconProps {
    onSelect: (name: keyof typeof Icons, color: string) => void;
}

const TaskIconPicker: React.FC<TaskIconProps> = ({ onSelect }) => {
    const [visible, setVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIcon, setSelectedIcon] = useState<keyof typeof Icons | null>(null);

    const handleIconClick = (iconName: keyof typeof Icons, color: string) => {
        onSelect(iconName, color);
        setSelectedIcon(iconName); // Update selected icon
        setVisible(false);
    };

    const filteredIcons = iconList.filter(icon =>
        icon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Button type="primary" onClick={() => setVisible(true)}>Choose Icon</Button>

            <Modal
                title="Select Icon"
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={null}
                width={800} // Adjust width if needed
            >
                <Input
                    placeholder="Search Icons..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginBottom: '10px' }}
                />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
                    {filteredIcons.map(({ name, color }, index) => {
                        const IconComponent = Icons[name] as React.FC;
                        return (
                            <Tooltip title={name} key={index}>
                                <span
                                    style={{
                                        color: color,
                                        fontSize : '1.5rem',
                                        opacity: selectedIcon === name ? 1 : 0.7, // Highlight selected icon
                                        transition: 'opacity 0.3s',
                                    }}
                                    onClick={() => handleIconClick(name, color)}
                                >
                                    <IconComponent />
                                </span>
                            </Tooltip>
                        );
                    })}
                </div>
            </Modal>
        </div>
    );
};

export default TaskIconPicker;
