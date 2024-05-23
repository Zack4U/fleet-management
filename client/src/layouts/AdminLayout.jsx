import React from "react";

import { Layout, theme } from "antd";
import { SideMenuComponent } from "../components/general/SideMenuComponent";
const { Header, Content, Footer } = Layout;

export const AdminLayout = (props) => {
    const { children } = props;
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout
            style={{
                minHeight: "100vh",
            }}
        >
            <SideMenuComponent />
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                />
                <Content
                    style={{
                        margin: "0 16px",
                    }}
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
