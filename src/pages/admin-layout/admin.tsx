import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  BookOutlined,
  ForkOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, Avatar, Dropdown, Space } from "antd";
import { logout } from "@api/index";

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps["items"] = [
  {
    key: "/admin",
    icon: <AppstoreOutlined />,
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
  const [collapsed, setCollapsed] = useState(false);

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
    <Layout hasSider style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          boxShadow: "2px 0 8px 0 rgba(29, 35, 41, 0.05)",
        }}
      >
        <div
          style={{
            height: 64,
            margin: 16,
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
          }}
        >
          {collapsed ? "AP" : "Admin Panel"}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={items}
          style={{
            borderRight: 0,
          }}
        />
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: "margin-left 0.2s",
        }}
      >
        <Header
          style={{
            padding: "0 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#fff",
            boxShadow: "0 1px 4px rgba(0,21,41,.08)",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "#000",
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            Admin Dashboard
          </h1>
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Space
              style={{
                cursor: "pointer",
                padding: "8px 12px",
                borderRadius: 8,
              }}
            >
              <Avatar
                icon={<UserOutlined />}
                size={35}
                style={{
                  background: "black",
                }}
              />
            </Space>
          </Dropdown>
        </Header>

        <Content
          style={{
            margin: "24px 24px 0",
            overflow: "initial",
          }}
        >
          <div
            style={{
              padding: 32,
              minHeight: "calc(100vh - 134px)",
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Outlet />
          </div>
        </Content>

        <Footer
          style={{
            textAlign: "center",
            background: "transparent",
            color: "#8c8c8c",
            fontSize: 14,
            padding: "24px 50px",
          }}
        >
          №1 programmer ©{new Date().getFullYear()} Created by My_Dev
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Admin;
