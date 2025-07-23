import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  BookOutlined,
  ForkOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, Avatar, Dropdown, Space } from "antd";
import { logout } from "@api/index";

const { Header, Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
};

const items: MenuProps["items"] = [
  {
    key: "/admin",
    icon: <UserOutlined />,
    label: <Link to="/admin">Group</Link>,
  },
  {
    key: "/admin/student",
    icon: <TeamOutlined />,
    label: <Link to="/admin/student">Students</Link>,
  },
  {
    key: "/admin/courses",
    icon: <BookOutlined />,
    label: <Link to="/admin/courses">Courses</Link>,
  },
  {
    key: "/admin/branches",
    icon: <ForkOutlined />,
    label: <Link to="/admin/branches">Branches</Link>,
  },
  {
    key: "/admin/teacher",
    icon: <UserOutlined />,
    label: <Link to="/admin/teacher">Teachers</Link>,
  },
  {
    key: "/admin/rooms",
    icon: <HomeOutlined />,
    label: <Link to="/admin/rooms">Rooms</Link>,
  },
];

const Admin: React.FC = () => {
  const location = useLocation();

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
      onClick: () => {
        logout();
      },
    },
  ];

  return (
    <Layout hasSider>
      <Sider style={siderStyle}>
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
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ margin: 0, color: "white" }}>Admin Panel</h1>
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Space style={{ cursor: "pointer" }}>
              <Avatar icon={<UserOutlined />} />
            </Space>
          </Dropdown>
        </Header>

        <Content style={{ margin: 16 }}>
          <div
            style={{
              padding: 24,
              minHeight: "calc(100vh - 134px)",
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
