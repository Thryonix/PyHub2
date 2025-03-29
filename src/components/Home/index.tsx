import React, { useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  FolderOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme, Modal, Button, Card, Input, Form, Row, Col, Flex, Progress } from "antd";
import "./index.css"; // 引入CSS文件
import { FlashIcon } from "@gandi-ide/gandi-ui/dist/Icon";

const { Header, Content, Sider } = Layout;

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: key === "3" ? "扩展商城" : `nav ${key}`, // 将第三个导航项改为中文
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
  const [isTemplatePanelVisible, setIsTemplatePanelVisible] = useState(false);
  const [isProjectSetupPanelVisible, setIsProjectSetupPanelVisible] = useState(false);

  // 项目名称和路径状态
  const [projectName, setProjectName] = useState("");
  const [projectPath, setProjectPath] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  // 项目列表状态
  const [projects, setProjects] = useState<Array<{ name: string; path: string; description: string }>>([]);

  // 进度条状态
  const [progressVisible, setProgressVisible] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);

  // 显示面板
  const showPanel = () => {
    setIsPanelVisible(true);
  };

  // 隐藏面板
  const hidePanel = () => {
    setIsPanelVisible(false);
    setIsTemplatePanelVisible(false); // 同时隐藏模板选择面板
    setIsProjectSetupPanelVisible(false); // 同时隐藏项目设置面板
  };

  // 显示模板选择面板
  const showTemplatePanel = () => {
    setIsTemplatePanelVisible(true);
  };

  // 显示项目设置面板
  const showProjectSetupPanel = () => {
    setIsProjectSetupPanelVisible(true);
  };

  // 处理模板选择
  const handleTemplateSelect = () => {
    showProjectSetupPanel(); // 切换到项目设置面板
  };

  // 处理项目名称输入
  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setProjectName(name);
    // 生成相对路径
    setProjectPath(`app/${name}`);
  };

  // 处理项目描述输入
  const handleProjectDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProjectDescription(e.target.value);
  };

  // 处理创建项目
  const handleCreateProject = () => {
    // 创建新项目
    const newProject = {
      name: projectName,
      path: projectPath,
      description: projectDescription,
    };

    // 添加到项目列表
    setProjects([...projects, newProject]);

    // 重置表单
    setProjectName("");
    setProjectPath("");
    setProjectDescription("");

    // 显示进度条
    setProgressVisible(true);
    setProgressPercent(0);

    // 模拟进度
    const progressInterval = setInterval(() => {
      setProgressPercent((prevPercent) => {
        if (prevPercent >= 100) {
          clearInterval(progressInterval);
          setProgressVisible(false); // 进度条到达100%后隐藏
          return 100;
        }
        return prevPercent + 10;
      });
    }, 500);

    // 关闭面板
    hidePanel();
  };

  // 处理删除项目
  const handleDeleteProject = (index: number) => {
    const newProjects = projects.filter((_, i) => i !== index);
    setProjects(newProjects);
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
                maskClosable={true}
                centered
                width={600}
                styles={{
                  body: { 
                    padding: 0, 
                    borderRadius: "8px", 
                    overflow: "hidden", 
                    height: "500px", // 固定高度
                    position: "relative", // 相对定位
                  },
                  mask: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
                }}
              >
                <div style={{ padding: "24px", background: "white", height: "100%" }}>
                  {/* 添加项目面板 */}
                  <div
                    className={`panel-transition ${isTemplatePanelVisible || isProjectSetupPanelVisible ? "panel-hidden" : "panel-visible"}`}
                    style={{ 
                      position: "absolute", // 绝对定位
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      padding: "24px",
                    }}
                  >
                    <h2>添加项目</h2>
                    <div style={{ height: 80 }}>
                      <Button
                        style={{ width: 500, height: 70 }}
                        onClick={showTemplatePanel}
                      >
                        添加新的项目
                      </Button>
                    </div>
                    <Button type="primary" onClick={hidePanel}>
                      关闭
                    </Button>
                  </div>

                  {/* 模板选择面板 */}
                  <div
                    className={`panel-transition ${isTemplatePanelVisible && !isProjectSetupPanelVisible ? "panel-visible" : "panel-hidden"}`}
                    style={{ 
                      position: "absolute", // 绝对定位
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      padding: "24px",
                    }}
                  >
                    <h2>选择项目模板</h2>
                    <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                      <Card
                        hoverable
                        style={{ width: 180 }}
                        cover={<div style={{height:40, width:100, }}><img alt="example" src="src\assets\PythonAppProject.svg" className="images-transparent"/></div>}
                        onClick={handleTemplateSelect}
                      >
                        <Card.Meta title="python应用模板" description="快速构建python应用" />
                      </Card>
                      <Card
                        hoverable
                        style={{ width: 180 }}
                        cover={<div style={{height:40, width:100, }}><img alt="example" src="src\assets\PythonGameProject.svg" className="images-transparent"/></div>}
                        onClick={handleTemplateSelect}
                      >
                        <Card.Meta title="python游戏模板" description="快速构建pygame项目" />
                      </Card>
                    </div>
                    <Button type="primary" onClick={hidePanel} >
                      关闭
                    </Button>
                  </div>

                  {/* 项目设置面板 */}
                  <div
                    className={`panel-transition ${isProjectSetupPanelVisible ? "panel-visible" : "panel-hidden"}`}
                    style={{ 
                      position: "absolute", // 绝对定位
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      padding: "24px",
                    }}
                  >
                    <h2>项目设置</h2>
                    <Form layout="vertical">
                      <Form.Item label="项目名称">
                        <Input 
                          placeholder="请输入项目名称" 
                          value={projectName}
                          onChange={handleProjectNameChange} // 监听项目名称输入
                        />
                      </Form.Item>
                      <Form.Item label="项目路径">
                        <Input 
                          placeholder="请输入项目路径" 
                          value={projectPath}
                          readOnly // 设置为只读
                        />
                      </Form.Item>
                      <Form.Item label="项目描述">
                        <Input.TextArea 
                          placeholder="请输入项目描述" 
                          value={projectDescription}
                          onChange={handleProjectDescriptionChange} // 监听项目描述输入
                        />
                      </Form.Item>
                    </Form>
                    <Button type="primary" onClick={hidePanel} style={{ marginRight: 8 }}>
                      关闭
                    </Button>
                    <Button type="primary" onClick={handleCreateProject}>
                      创建项目
                    </Button>
                  </div>
                </div>
              </Modal>

              {/* 进度条 */}
              {progressVisible && (
                <Progress
                  percent={progressPercent}
                  status={progressPercent < 100 ? "active" : "success"}
                  style={{ position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)", width: "80%" }}
                />
              )}
            </div>
            <Content
              className="content"
              style={{
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                padding: "24px",
              }}
            >
              {/* 显示项目列表 */}
              <Row gutter={[16, 16]}>
                {projects.map((project, index) => (
                  <Col key={index} xs={24} sm={12} md={8} lg={6}>
                    <Card
                      title={
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <FolderOutlined style={{ marginRight: 8 }} />
                          {project.name}
                        </div>
                      }
                      actions={[
                        <EditOutlined key="edit" />,
                        <DeleteOutlined key="delete" onClick={() => handleDeleteProject(index)} />,
                      ]}
                      style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
                    >
                      <div>
                        <div><strong>路径:</strong> {project.path}</div>
                        <div><strong>描述:</strong> {project.description}</div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Content>
          </Layout>
        </Layout>
      </div>
    </>
  );
};

export default Home;
