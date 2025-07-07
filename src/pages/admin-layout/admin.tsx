// import { Outlet } from "react-router-dom";

// const Admin = () => {
//   return (
//     <div>
//       <h1>Admin</h1>

//       <Outlet />
//     </div>
//   );
// };

// export default Admin;


import React from "react";
import { Outlet, Link } from "react-router-dom";
import {
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Groups } from "@pages";

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
    key: "1",
    icon: React.createElement(UserOutlined),
    label: <p>Groups</p>, // Birinchi sahifa Groups bo'ldi
  },
  // Kerak bo‘lsa boshqa menyularni qo‘shing
];

const Admin: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider style={siderStyle}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <h1 style={{ margin: "0 16px" }}>Admin Panel</h1>
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
            <Groups />
            {/* Outlet ichida child routes chiqadi */}
            <Outlet />
          </div>
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default Admin;
