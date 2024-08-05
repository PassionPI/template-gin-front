import { Layout } from "antd";
import type { FC } from "react";
import { memo } from "react";
import { Outlet } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;
const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
};

const contentStyle: React.CSSProperties = {
  minHeight: 300,
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
};

const layoutStyle = {
  minHeight: "100vh",
};

const MyLayout: FC = memo(() => {
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>Header</Header>
      <Layout>
        <Sider width={200} style={siderStyle}>
          Sider
        </Sider>
        <Content style={contentStyle}>
          <Outlet />
        </Content>
      </Layout>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  );
});

export default MyLayout;
