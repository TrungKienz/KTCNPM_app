import React from 'react';
import { Tabs } from 'antd';
import TableContent from './Table';
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: '1',
    label: 'TAW',
    children: (<TableContent tableType='TAW'/>),
  },
  {
    key: '2',
    label: 'TBF',
    children: (<TableContent tableType='TBF'/>),
  },
  {
    key: '3',
    label: 'TCF',
    children: (<TableContent tableType='TCF'/>),
  },
  {
    key: '4',
    label: 'EF',
    children: (<TableContent tableType='EF'/>),
  },
];
const InputTabs = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} style={{padding: 20}}/>;

export default InputTabs;