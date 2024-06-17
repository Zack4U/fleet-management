import React, { useEffect, useState } from "react";
import { Button, Layout, Menu, Row, Switch } from "antd";
import {
    UserOutlined,
    CarOutlined,
    ProjectOutlined,
    LogoutOutlined,
    PictureOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import { User } from "../../api/user";
import { useDispatch } from "react-redux";

const { Sider } = Layout;
const { SubMenu } = Menu;

const admin_items = [
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
];

const driver_items = [
    {
        key: "sub1",
        label: "Vehicles",
        icon: <CarOutlined />,
        children: [
            {
                key: "g1",
                label: <Link to="/driver/vehicles">My Vehicles</Link>,
            },
        ],
    },
    {
        key: "sub2",
        label: "Tasks",
        icon: <ProjectOutlined />,
        children: [
            {
                key: "g2",
                label: <Link to="/driver/tasks">My Tasks</Link>,
            },
        ],
    },
    {
        key: "sub3",
        label: "Routes",
        icon: <PictureOutlined />,
        children: [
            {
                key: "g3",
                label: <Link to="/driver/routes">My Routes</Link>,
            },
        ],
    },
];

export const SideMenuComponent = () => {
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(false);
    const { theme, changeTheme } = useContext(ThemeContext);
    const userApi = new User();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const [items, setItems] = useState([]);
    const onCollapse = (collapsed) => {
        setCollapsed(collapsed);
    };

    const logout = () => {
        try {
            userApi.logoutUser(token).then(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                window.location.href = "/login";
            });
        } catch (error) {
            console.error("Error logging out: ", error);
        }
    };

    useEffect(() => {
        const items_select = () => {
            if (role === "ADMIN") {
                setItems(admin_items);
            } else if (role === "DRIVER") {
                setItems(driver_items);
            }
        };

        items_select();
    }, [dispatch]);

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
                    src="http://localhost:3001/api/avatar/logo-coca_cola.jpg"
                    alt="Logo"
                    style={{
                        margin: "10px",
                        height: collapsed ? "40px" : "80px",
                        borderRadius: "50%",
                        objectFit: "cover",
                    }}
                />
            </Row>
            <Row
                justify="center"
                align="middle"
                style={{ height: "64px", marginBottom: "16px" }}
                theme={theme}
            >
                <Button
                    type="primary"
                    danger
                    onClick={logout}
                    className="flex align-center justify-center items-center font-bold"
                >
                    <LogoutOutlined />
                    Log out
                </Button>
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
