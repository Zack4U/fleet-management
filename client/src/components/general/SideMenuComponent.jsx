import React, { useState } from "react";
import { Layout, Menu, Row, Switch } from "antd";
import {
    UserOutlined,
    CarOutlined,
    ProjectOutlined,
    PictureOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";

const { Sider } = Layout;
const { SubMenu } = Menu;

const items = [
    {
        key: "sub1",
        label: "Users",
        icon: <UserOutlined />,
        children: [
            {
                key: "g1",
                label: <Link to="/admin/users">List</Link>,
            },
            {
                key: "g2",
                label: <Link to="/admin/users/new">Create</Link>,
            },
        ],
    },
    {
        key: "sub2",
        label: "Vehicles",
        icon: <CarOutlined />,
        children: [
            {
                key: "g3",
                label: <Link to="/admin/vehicles">List</Link>,
            },
            {
                key: "g4",
                label: <Link to="/admin/vehicles/new">Create</Link>,
            },
        ],
    },
    {
        key: "sub3",
        label: "Tasks",
        icon: <ProjectOutlined />,
        children: [
            {
                key: "g5",
                label: <Link to="/admin/tasks">List</Link>,
            },
        ],
    },
    {
        key: "sub4",
        label: "Routes",
        icon: <PictureOutlined />,
        children: [
            {
                key: "g6",
                label: <Link to="/admin/routes">List</Link>,
            },
            {
                key: "g7",
                label: <Link to="/admin/routes/new">Create</Link>,
            },
        ],
    },
];

export const SideMenuComponent = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { theme, changeTheme } = useContext(ThemeContext);

    const onCollapse = (collapsed) => {
        setCollapsed(collapsed);
    };

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            theme={theme}
        >
            <Row
                justify="center"
                align="middle"
                style={{ height: "64px", marginBottom: "30px" }}
                theme={theme}
            >
                <img
                    src="http://localhost:3001/api/users/avatar/logo-coca_cola.jpg"
                    alt="Logo"
                    style={{
                        margin: "10px",
                        height: collapsed ? "40px" : "80px",
                        borderRadius: "50%", // Esto hace que la imagen sea redonda
                        objectFit: "cover", // Esto asegura que la imagen cubra todo el espacio disponible
                    }}
                />
            </Row>
            <Row>
                <Menu
                    defaultSelectedKeys={["1"]}
                    mode="inline"
                    theme={theme}
                    inlineCollapsed={collapsed}
                >
                    {items.map((item) => (
                        <SubMenu
                            key={item.key}
                            icon={item.icon}
                            title={item.label}
                        >
                            {item.children.map((child) => (
                                <Menu.Item key={child.key}>
                                    {child.label}
                                </Menu.Item>
                            ))}
                        </SubMenu>
                    ))}
                </Menu>
            </Row>

            <Row
                justify="center"
                align="middle"
                style={{ height: "64px", marginBottom: "16px" }}
                theme={theme}
            >
                <Switch
                    checked={theme === "dark"}
                    onChange={changeTheme}
                    checkedChildren="Dark"
                    unCheckedChildren="Light"
                    inlineCollapsed={collapsed}
                />
            </Row>
        </Sider>
    );
};
