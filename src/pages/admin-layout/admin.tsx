import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  BookOutlined,
  ForkOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { 
  // Button,
   Layout, Menu, theme } from "antd";
import { logout } from "@api/index";
import { PopConfirmLogout } from "@components";

const { Header, Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const items: MenuProps["items"] = [
  {
    key: "/admin",
    icon: React.createElement(UserOutlined),
    label: <Link to="/admin">Group</Link>,
  },
  {
    key: "/admin/student",
    icon: React.createElement(TeamOutlined),
    label: <Link to="/admin/student">Students</Link>,
  },
  {
    key: "/admin/courses",
    icon: React.createElement(BookOutlined),
    label: <Link to="/admin/courses">Courses</Link>,
  },
  {
    key: "/admin/branches",
    icon: React.createElement(ForkOutlined),
    label: <Link to="/admin/branches">Branch</Link>,
  },
  {
    key: "/admin/teacher",
    icon: React.createElement(UserOutlined),
    label: <Link to="/admin/teacher">Teacher</Link>,
  },
  {
    key: "/admin/rooms",
    icon: React.createElement(HomeOutlined),
    label: <Link to="/admin/rooms">Rooms</Link>,
  },
];

const Admin: React.FC = () => {
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider style={siderStyle}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <h1 style={{ margin: "0 16px" }}>Admin Panel</h1>
          {/* <Button
            type="primary"
            style={{ margin: "16px" }}
          > */}
            <PopConfirmLogout onConfirm={() => logout()} />
          {/* </Button> */}
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              minHeight: "calc(100vh - 134px)",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          №1 programmer ©{new Date().getFullYear()} Created by Khuja
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Admin;