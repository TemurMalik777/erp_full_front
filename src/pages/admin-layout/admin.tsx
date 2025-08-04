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
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined, // Qo'shildi
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Space,
  Button,
  Typography,
} from "antd"; // Typography qo'shildi
import { logout } from "@api/index";

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

// Sider menyusi o'zgarishsiz qoladi
const menuItems: MenuProps["items"] = [
  {
    key: "/admin",
    icon: <AppstoreOutlined />,
    label: <Link to="/admin">Dashboard</Link>, // "Dashboart" -> "Dashboard"
  },
  {
    key: "/admin/groups",
    icon: <TeamOutlined />,
    label: <Link to="/admin/groups">Groups</Link>, // Inglizcha nomlar o'zbekchaga o'girildi
  },
  {
    key: "/admin/student",
    icon: <UserOutlined />,
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

  // Foydalanuvchi menyusi (Dropdown) o'zgarishsiz qoladi
  const userMenuItems: MenuProps["items"] = [
    {
      key: "/admin/profile",
      icon: <UserOutlined />,
      label: <Link to="/admin/profile">Profil</Link>,
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Sozlamalar",
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Chiqish",
      danger: true,
      onClick: () => logout(),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        {/* YANGILANDI: Logotip dizayni */}
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            cursor: "pointer",
          }}
        >
          <AppstoreOutlined style={{ fontSize: 28, color: "#1677ff" }} />
          {!collapsed && (
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: 600,
                marginLeft: 12,
                whiteSpace: "nowrap",
              }}
            >
              Admin Panel
            </Text>
          )}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ borderRight: 0 }}
        />
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: "margin-left 0.2s ease-in-out", // O'tish animatsiyasi yaxshilandi
        }}
      >
        <Header
          style={{
            padding: "0 24px", // Padding o'zgartirildi
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #f0f0f0", // Chiroyli chiziq qo'shildi
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 18, width: 48, height: 48 }}
          />

          {/* YANGILANDI: Profil ikonasi dizayni */}
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space style={{ cursor: "pointer" }}>
                <Avatar
                  style={{ backgroundColor: "#1677ff" }}
                  icon={<UserOutlined />}
                />
                <Text strong>Admin</Text>
                <DownOutlined style={{ color: "rgba(0,0,0,0.45)" }} />
              </Space>
            </a>
          </Dropdown>
        </Header>

        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: "#f5f5f5", // Orqa fon o'zgartirildi
          }}
        >
          {/* Outlet uchun chiroyli konteyner */}
          <div
            style={{
              padding: 24,
              minHeight: "calc(100vh - 112px)",
              background: "#fff",
              borderRadius: 8,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
