import React, { useState } from 'react';
import { Layout, Card, Row, Col, Typography, Menu, Breadcrumb } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { MenuProps } from "antd";
import './index.css';

const { Title, Text } = Typography;
const { Header, Content } = Layout;

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: key === "1" ? "家" : key === "3" ? "扩展商城" : `导航 ${key}`,
}));

const ExtensionStore: React.FC = () => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState("3");

  const handleMenuClick = ({ key }: { key: string }) => {
    setSelectedKey(key);
    if (key === "1") {
      navigate('/');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
          onClick={handleMenuClick}
        />
      </Header>
      <Content style={{ padding: '24px' }}>
        <div style={{ marginBottom: '24px' }}>
          <Title level={2}>
            <ShoppingOutlined style={{ marginRight: '8px' }} />
            扩展商城
          </Title>
          <Text type="secondary">浏览和安装各种有用的扩展</Text>
        </div>

        <Row gutter={[16, 16]}>
          {/* 示例扩展卡片 */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                <div style={{ 
                  height: 120, 
                  background: '#f0f2f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ShoppingOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                </div>
              }
            >
              <Card.Meta
                title="Python 代码格式化"
                description="自动格式化 Python 代码，支持多种风格"
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                <div style={{ 
                  height: 120, 
                  background: '#f0f2f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ShoppingOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                </div>
              }
            >
              <Card.Meta
                title="代码片段管理"
                description="管理和复用常用的代码片段"
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ExtensionStore; 