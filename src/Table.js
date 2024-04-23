import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Popconfirm, Table, Typography } from 'antd';
import columnConfigurations from './ColumeType';
import dataConfigurations from './DataConfigure';
import calculatorService from './service';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Không được để trống trường ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const TableContent = ({tableType}) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [columnType, setColumnType] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  var dataType = 'dataTAW'

  useEffect(() => {
    if (tableType === 'TAW') { 
      setColumnType(columnConfigurations.columnsTitleTAW);
      setData(dataConfigurations.dataTAW);
      dataType = 'dataTAW';
    } else if (tableType === 'TBF') {
      setColumnType(columnConfigurations.columnsTitleTBF);
      setData(dataConfigurations.dataTBF);
      dataType = 'dataTBF';
    } else if (tableType === 'TCF') {
      setColumnType(columnConfigurations.columnsTitleTCF);
      setData(dataConfigurations.dataTCF);
      dataType = 'dataTCF';
    } else {
      setColumnType(columnConfigurations.columnsTitleEF);
      setData(dataConfigurations.dataEF);
      dataType = 'dataEF';
    }
  }, [tableType, dataConfigurations]);

  const calFunction = (data) => {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(dataType, jsonData);
    var resultCalculator = 0;

    const dataResultString = localStorage.getItem("resultData");
    const dataResult = dataResultString ? JSON.parse(dataResultString) : {};
    
    if (tableType === 'TAW') { 
      resultCalculator = calculatorService.calTAW(data);
      if(dataResult != {}) {
        dataResult.TAWpoint = resultCalculator;
        localStorage.setItem("resultData", JSON.stringify(dataResult));
      } else {
        dataConfigurations.resultData.TAWpoint = resultCalculator;
        localStorage.setItem("resultData", JSON.stringify(dataConfigurations.resultData));
      }
    } else if (tableType === 'TBF') {
      resultCalculator = calculatorService.calTBF(data);
      if(dataResult != {}) {
        dataResult.TBFpoint = resultCalculator;
        localStorage.setItem("resultData", JSON.stringify(dataResult));
      } else {
        dataConfigurations.resultData.TBFpoint = resultCalculator;
        localStorage.setItem("resultData", JSON.stringify(dataConfigurations.resultData));
      }
    } else if (tableType === 'TCF') {
      resultCalculator = calculatorService.calTFW(data);
      var TFWpoint = 0.6 + (0.01*resultCalculator)
      if(dataResult != {}) {
        dataResult.TCFpoint = resultCalculator;
        dataResult.TFWpoint = TFWpoint;
        localStorage.setItem("resultData", JSON.stringify(dataResult));
      } else {
        dataConfigurations.resultData.TCFpoint = resultCalculator;
        dataConfigurations.resultData.TFWpoint = TFWpoint;
        localStorage.setItem("resultData", JSON.stringify(dataConfigurations.resultData));
      }
    } else {
      resultCalculator = calculatorService.calTFW(data);
      if(dataResult != {}) {
        dataResult.EFpoint = resultCalculator;
        localStorage.setItem("resultData", JSON.stringify(dataResult));
      } else {
        dataConfigurations.resultData.EFpoint = resultCalculator;
        localStorage.setItem("resultData", JSON.stringify(dataConfigurations.resultData));
      }
    }

    console.log(resultCalculator);
    console.log(data)
  }

  const columns = [
    ...columnType,
    {
      title: 'Thao tác',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Lưu
            </Typography.Link>
            <Popconfirm title="Xác nhận hủy?" onConfirm={cancel}>
              <a>Hủy</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Sửa
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'right',
          justifyContent: 'right',
          padding: 20,
        }}
      >
        <Button type="primary" onClick={() => calFunction(data)}>Tính toán</Button>
      </div>
      
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
export default TableContent;