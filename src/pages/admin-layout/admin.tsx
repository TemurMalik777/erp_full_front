import React from "react";
import { Outlet, Link } from "react-router-dom";
import {
  BookOutlined,
  ForkOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Layout, Menu, theme } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { logout } from "@api/index";

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
    label: <Link to="/admin">Group</Link>,
  },
  {
    key: "2",
    icon: React.createElement(TeamOutlined),
    label: <Link to="/admin/student">Students</Link>,
  },
  {
    key: "3",
    icon: React.createElement(BookOutlined),
    label: <Link to="/admin/courses">Courses</Link>,
  },
  {
    key: "4",
    icon: React.createElement(ForkOutlined),
    label: <Link to="/admin/branches">Branch</Link>,
  },
  {
    key: "5",
    icon: React.createElement(UserOutlined),
    label: <Link to="/admin/teacher">Teacher</Link>,
  },
];

const Admin: React.FC = () => {
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
          defaultSelectedKeys={[location.pathname]}
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
          <Button
            type="primary"
            style={{ margin: "16px" }}
            onClick={() => logout()}
          >
            <LogoutOutlined />
          </Button>
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




// import  { useState, useEffect } from "react";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import { Layout, Menu, theme, Button } from "antd";
// import {
//   BookOutlined,
//   ForkOutlined,
//   TeamOutlined,
//   UserOutlined,
//   LogoutOutlined,
// } from "@ant-design/icons";
// import { logout } from "@api/index";

// const { Header, Content, Footer, Sider } = Layout;

// const items = [
//   { label: "Groups", key: "/admin", icon: <TeamOutlined /> },
//   { label: "Students", key: "/admin/student", icon: <UserOutlined /> },
//   { label: "Courses", key: "/admin/courses", icon: <BookOutlined /> },
//   { label: "Branchs", key: "/admin/branches", icon: <ForkOutlined /> },
//   { label: "Teachers", key: "/admin/teacher", icon: <TeamOutlined /> },
// ];

// function Admin() {
//   const [collapsed, setCollapsed] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   // Avtomatik redirect agar /admin bo'lsa
//   useEffect(() => {
//     if (location.pathname === "/admin") {
//       navigate("/admin/groups");
//     }
//   }, [location.pathname, navigate]);

//   // Agar path uzun bo'lsa (masalan: /admin/courses/123), asosiy keyni topish
//   const currentKey = items.find((item) =>
//     location.pathname.startsWith(item.key)
//   )?.key;

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       <Sider
//         collapsible
//         collapsed={collapsed}
//         onCollapse={(value) => setCollapsed(value)}
//       >
//         <div
//           style={{
//             color: "white",
//             textAlign: "center",
//             padding: "16px",
//             fontSize: "18px",
//             fontWeight: "bold",
//           }}
//         >
//         </div>
//         <Menu
//           theme="dark"
//           mode="inline"
//           selectedKeys={currentKey ? [currentKey] : []}
//           onClick={({ key }) => navigate(key)}
//           items={items}
//         />
//       </Sider>

//       <Layout style={{ background: "#f0f2f5" }}>
//         <Header
//           style={{
//             padding: 0,
//             background: colorBgContainer,
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "16px",
//           }}
//         >
//           <h1 style={{ margin: "0 16px" }}>Admin Panel</h1>
//           <Button
//             type="primary"
//             style={{ margin: "16px" }}
//             onClick={logout}
//             icon={<LogoutOutlined />}
//           >
//           </Button>
//         </Header>

//         <Content style={{ padding: 24 }}>
//           <div
//             style={{
//               background: colorBgContainer,
//               borderRadius: borderRadiusLG,
//               padding: 24,
//               minHeight: "calc(100vh - 134px)",
//             }}
//           >
//             <Outlet />
//           </div>
//         </Content>

//         <Footer style={{ textAlign: "center" }}>
//           №1 programmer ©{new Date().getFullYear()} Created by Khuja
//         </Footer>
//       </Layout>
//     </Layout>
//   );
// }

// export default Admin;
