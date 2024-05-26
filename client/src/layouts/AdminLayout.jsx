import React from "react";

import { Layout, theme } from "antd";
import { SideMenuComponent } from "../components/general/SideMenuComponent";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

const { Content, Footer } = Layout;

export const AdminLayout = (props) => {
    const { children } = props;
    const { theme } = useContext(ThemeContext);
    const backgroundColor = theme === "light" ? "#fff" : "#001529";
    return (
        <Layout
            style={{
                minHeight: "100vh",
                backgroundColor: backgroundColor,
            }}
        >
            <SideMenuComponent />
            <Layout
                style={{
                    minHeight: "100vh",
                }}
            >
                <Content
                    style={{
                        margin: "0 16px",
                    }}
                    theme={theme}
                >
                    {children}
                </Content>
                <Footer
                    style={{
                        textAlign: "center",
                    }}
                >
                    Coca Cola ©{new Date().getFullYear()} Created by Kevin Lopez
                </Footer>
            </Layout>
        </Layout>
    );
};
