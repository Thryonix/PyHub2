import React, { useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme, Modal, Button } from "antd";
import "./index.css"; // 引入CSS文件

const { Header, Content, Sider } = Layout;

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
  };
});

const Home: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 状态管理：控制面板的显示和隐藏
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  // 显示面板
  const showPanel = () => {
    setIsPanelVisible(true);
  };

  // 隐藏面板
  const hidePanel = () => {
    setIsPanelVisible(false);
  };

  return (
    <>
      <Header className="header">
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
          className="menu"
        />
      </Header>
      <div>
        <Layout style={{ minHeight: "calc(100vh - 64px)" }}>
          <Sider defaultCollapsed>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
              items={items2}
            />
          </Sider>
          <Layout className="layout-content">
            <Breadcrumb
              items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
              className="breadcrumb"
            />
            <div>
              {/* 添加项目按钮 */}
              <div
                className="AddProject"
                style={{ position: "relative", right: -1220, top: -10, width: "30px" }}
              >
                <button
                  className="AddProject"
                  style={{ color: "darkgray", background: "white" }}
                  onClick={showPanel} // 点击按钮显示面板
                >
                  +
                </button>
              </div>

              {/* 弹出面板 */}
              <Modal
                    open={isPanelVisible}
                    onCancel={hidePanel}
                    footer={null}
                    closable={false}
                    maskClosable
                    centered
                    width={600}
                    styles={{
                      body: { padding: 0, borderRadius: "8px", overflow: "hidden" }, // 设置圆角和 overflow
                      mask: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
                    }}
                  >
                    <div style={{ padding: "24px", background: "white" }}>
                      <h2>添加项目</h2>
                      {/* 虚线框 */}
                      <div
                        style={{
                          border: "2px dashed #ccc", // 设置虚线边框
                          padding: "16px", // 内边距
                          borderRadius: "8px", // 圆角
                          textAlign: "center", // 文字居中
                          color: "#999", // 文字颜色
                        }}
                      >
                        <p>添加新的项目</p>
                      </div>
                      <Button type="primary" onClick={hidePanel}>
                        关闭
                      </Button>
                    </div>
              </Modal>
            </div>
            <Content
              className="content"
              style={{
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              Content
            </Content>
          </Layout>
        </Layout>
      </div>
    </>
  );
};

export default Home;