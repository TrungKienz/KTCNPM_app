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
  const [dataCalculatorResult, setDataCalculatorResult] = useState({});
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

  var getLocalData = []

  useEffect(() => {
    if (tableType === 'TAW') { 
      setColumnType(columnConfigurations.columnsTitleTAW);
      getLocalData =  JSON.parse(localStorage.getItem(`data${tableType}`));
      setData(getLocalData ? getLocalData : dataConfigurations.dataTAW);
    } else if (tableType === 'TBF') {
      setColumnType(columnConfigurations.columnsTitleTBF);
      getLocalData =  JSON.parse(localStorage.getItem(`data${tableType}`));
      setData(getLocalData ? getLocalData :dataConfigurations.dataTBF);
    } else if (tableType === 'TCF') {
      setColumnType(columnConfigurations.columnsTitleTCF);
      getLocalData =  JSON.parse(localStorage.getItem(`data${tableType}`));
      setData(getLocalData ? getLocalData :dataConfigurations.dataTCF);
    } else if (tableType === 'EF'){
      setColumnType(columnConfigurations.columnsTitleEF);
      getLocalData = JSON.parse(localStorage.getItem(`data${tableType}`)) ;
      setData(getLocalData ? getLocalData :dataConfigurations.dataEF);
    } else {
      setColumnType(columnConfigurations.columnsTitleH);
      setData(dataConfigurations.dataH);
    }
  }, [tableType, dataConfigurations]);


  const calFunction = (data) => {
    const jsonData = JSON.stringify(data);
    switch(tableType) {
      case 'TAW':
        localStorage.setItem('dataTAW', jsonData);
        break;
      case 'TBF':
        localStorage.setItem('dataTBF', jsonData);
        break;
      case 'TCF':
        localStorage.setItem('dataTCF', jsonData);
        break;
      case 'EF':
        localStorage.setItem('dataEF', jsonData);
        break;
      case 'H':
        localStorage.setItem('dataH', jsonData);
        break;
      default:
        break;
    }

    var resultCalculator = 0;

    const dataResultString = localStorage.getItem("resultData");
    const dataResult = dataResultString ? JSON.parse(dataResultString) : {};
    
    if (tableType === 'TAW') { 
      resultCalculator = calculatorService.calTAW(data);
      setDataCalculatorResult({
        "TAW": resultCalculator,
      });
      if(dataResult != null) {
        dataResult.TAWpoint = resultCalculator;
        localStorage.setItem("resultData", JSON.stringify(dataResult));
      } else {
        dataConfigurations.resultData.TAWpoint = resultCalculator;
        localStorage.setItem("resultData", JSON.stringify(dataConfigurations.resultData));
      }
    } else if (tableType === 'TBF') {
      resultCalculator = calculatorService.calTBF(data);
      setDataCalculatorResult({
        "TBF": resultCalculator,
      });
      if(dataResult != null) {
        dataResult.TBFpoint = resultCalculator;
        localStorage.setItem("resultData", JSON.stringify(dataResult));
      } else {
        dataConfigurations.resultData.TBFpoint = resultCalculator;
        localStorage.setItem("resultData", JSON.stringify(dataConfigurations.resultData));
      }
    } else if (tableType === 'TCF') {
      resultCalculator = calculatorService.calTFW(data);
      var TCF = resultCalculator * 0.01 + 0.6;
      setDataCalculatorResult({
        "TFW": resultCalculator,
        "TCF": TCF,
      });
      if(dataResult != null) {
        dataResult.TFWpoint = resultCalculator;
        localStorage.setItem("resultData", JSON.stringify(dataResult));
      } else {
        dataConfigurations.resultData.TFWpoint = resultCalculator;
        localStorage.setItem("resultData", JSON.stringify(dataConfigurations.resultData));
      }
    } else {
      resultCalculator = calculatorService.calEFW(data);
      var resultValueP = calculatorService.calP(data);
      var resultValueES = calculatorService.calES(data);
      var resultValueEF = (1.4 - 0.03*resultCalculator).toFixed(4)
      const newDataCalculatorResult = {
        "EFW": resultCalculator,
        "ES": resultValueES,
        "P": resultValueP,
        "EF": resultValueEF,
      };
      
      setDataCalculatorResult(newDataCalculatorResult);
      if(dataResult != null) {
        dataResult.EFWpoint = resultCalculator;
        dataResult.Ppoint = resultValueP;
        dataResult.ESpoint = resultValueES;
        localStorage.setItem("resultData", JSON.stringify(dataResult));
      } else {
        dataConfigurations.resultData.EFpoint = resultCalculator;
        dataConfigurations.resultData.Ppoint = resultValueP;
        dataConfigurations.resultData.ESpoint = resultValueES;
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
        {tableType === 'TAW' ? (
          <div style={{ paddingRight: 20, paddingTop: 5 }}>
            Kết quả TAW: <b>{dataCalculatorResult.TAW ? dataCalculatorResult.TAW : 0}</b>
          </div>
        ) : tableType === 'TBF' ? (
          <div style={{ paddingRight: 20, paddingTop: 5 }}>
            Kết quả TBF: <b>{dataCalculatorResult.TBF ? dataCalculatorResult.TBF : 0}</b>
          </div>
        ) : tableType === 'TCF' ? (
          <>
            <div style={{ paddingRight: 20, paddingTop: 5 }}>
              Kết quả hệ số KT-CN (TFW): <b>{dataCalculatorResult.TFW ? dataCalculatorResult.TFW : 0}</b>
            </div>
            <div style={{ paddingRight: 20, paddingTop: 5 }}>
              Kết quả hệ số phức tạp về KT-CN (TCF): <b>{dataCalculatorResult.TCF ? dataCalculatorResult.TCF : 0}</b>
            </div>
          </>
        ) : tableType === 'EF' ? (
          <>
            <div style={{ paddingRight: 20, paddingTop: 5 }}>
              Kết quả hệ số tác động môi trường và nhóm làm việc (EFW): <b>{dataCalculatorResult.EFW ? dataCalculatorResult.EFW : 0}</b>
            </div>
            <div style={{ paddingRight: 20, paddingTop: 5 }}>
              Kết quả hệ số phức tạp về môi trường (EF): <b>{dataCalculatorResult.EF ? dataCalculatorResult.EF : 0}</b>
            </div>
            <div style={{ paddingRight: 20, paddingTop: 5 }}>
              Kết quả độ ổn định kinh nghiệm (ES): <b>{dataCalculatorResult.ES  ? dataCalculatorResult.ES : 0}</b>
            </div>
            <div style={{ paddingRight: 20, paddingTop: 5 }}>
              Kết quả nội suy thời gian lao động (P): <b>{dataCalculatorResult.P ? dataCalculatorResult.P : 0}</b>
            </div>
          </>
          
        ) : (
          {}
        )}

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