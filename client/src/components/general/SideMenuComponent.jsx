import React, { useState } from "react";
import { Layout, Menu, Row, Switch } from "antd";
import { UserOutlined, CarOutlined } from "@ant-design/icons";

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
                label: "List",
            },
        ],
    },
    {
        key: "sub2",
        label: "Vehicles",
        icon: <CarOutlined />,
        children: [
            {
                key: "g1",
                label: "List",
            },
        ],
    },
];

export const SideMenuComponent = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [theme, setTheme] = useState("light");

    const changeTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

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
                style={{ height: "64px", marginBottom: "16px" }}
            >
                <img
                    src="http://localhost:3001/api/users/avatar/logo-coca_cola.jpg"
                    alt="Logo"
                    style={{ height: collapsed ? "40px" : "80px" }}
                />
            </Row>
            <Menu
                defaultSelectedKeys={["1"]}
                mode="inline"
                theme="light"
                inlineCollapsed={collapsed}
            >
                {items.map((item) => (
                    <SubMenu key={item.key} icon={item.icon} title={item.label}>
                        {item.children.map((child) => (
                            <Menu.Item key={child.key}>{child.label}</Menu.Item>
                        ))}
                    </SubMenu>
                ))}
            </Menu>
            <Switch
                checked={theme === "dark"}
                onChange={changeTheme}
                checkedChildren="Dark"
                unCheckedChildren="Light"
            />
        </Sider>
    );
};
