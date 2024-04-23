import React, { useState } from 'react';
import { Breadcrumb, Layout, theme  } from 'antd';
import TableContent from './Table';
import DataDisplay from './DataDisplay';
import InputTabs from './InputTabs';

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Layout>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: colorBgContainer,
          }}
        >
          <h1 style={{textAlign: 'center'}}>Phần mềm hỗ trợ tính toán chi phí phần mềm</h1>
        </Header>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            {/* <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
          </Breadcrumb>

          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <DataDisplay/>
            <div style={{padding: 20}}/>
            <InputTabs/>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Nhóm 3 {new Date().getFullYear()} Created by nhóm 3
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;