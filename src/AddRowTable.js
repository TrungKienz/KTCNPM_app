import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import columnConfigurations from './ColumeType';
import calculatorService from './service';
import dataConfigurations from './DataConfigure';

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
      console.log(values)
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `Không được để trống trường${title}.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const AddRowTable = ({tableType}) => {
  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(1);
  const [dataCalculatorResult, setDataCalculatorResult] = useState();
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  var getLocalData = [];

  useEffect(() => {
    if (tableType === 'H') { 
      getLocalData =  JSON.parse(localStorage.getItem(`dataAVGSalary`));
      setDataSource(getLocalData ? getLocalData : []);
    }
  },[]);

  var defaultColumns = [];

  if (tableType === 'H') {
    defaultColumns = [
        ...columnConfigurations.columnsTitleH,
        {
          title: 'Thao tác',
          dataIndex: 'operation',
          render: (_, record) =>
            dataSource.length >= 1 ? (
              <Popconfirm title="Bạn muốn xóa dòng này ?" onConfirm={() => handleDelete(record.key)}>
                <a>Xóa</a>
              </Popconfirm>
            ) : null,
        },
    ];
  } else {
    defaultColumns = [];
  }

  const handleAdd = () => {
    const newData = {
      key: calculatorService.randomKey(),
      orderH: count,
      wageH: 0,
      numberEmployeeH: 0,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const calFunction = (data) => {
    const averageSalary = calculatorService.calAverageSalaryPerMonth(data);
    localStorage.setItem('dataAVGSalary', JSON.stringify(data));
    const resultDataString = localStorage.getItem('resultData');
    const resultData = resultDataString ? JSON.parse(resultDataString) : {};
    var AVGSalaryDay = averageSalary/20/8;
    var SumSalary = calculatorService.calSumSalary(data);
    setDataCalculatorResult({
      "AVGSalaryMonth": calculatorService.displayVNDType(averageSalary),
      "AVGSalaryDay":  calculatorService.displayVNDType(AVGSalaryDay),
      "SumSalary": calculatorService.displayVNDType(SumSalary),
    })

    if (resultData != null) {
        resultData.AVGSalaryMonth = averageSalary;
        localStorage.setItem('resultData', JSON.stringify(resultData));
    } else {
        dataConfigurations.resultData.AVGSalaryMonth = averageSalary;
        localStorage.setItem('resultData', JSON.stringify(dataConfigurations.resultData));
    }
  }

  return (
    <div>

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
          {tableType === 'H' ? (
            <>
              <div style={{ paddingRight: 20, paddingTop: 5 }}>
                Tổng chi lương/tháng: <b>{dataCalculatorResult ? dataCalculatorResult.SumSalary : 0} đồng</b>
              </div>
              <div style={{ paddingRight: 20, paddingTop: 5 }}>
                Mức lương bình quân/người/tháng: <b>{dataCalculatorResult ? dataCalculatorResult.AVGSalaryMonth : 0} đồng</b>
              </div>
              <div style={{ paddingRight: 20, paddingTop: 5 }}>
                Mức lương bình quân 1 người/1 giờ: <b>{dataCalculatorResult ? dataCalculatorResult.AVGSalaryDay : 0} đồng</b>
              </div>
            </>
          ) : (<div/>)}
          <Button
            onClick={handleAdd}
            type="primary"
            style={{
              marginBottom: 16,
              marginRight: 10,
            }}
          >
            Thêm 1 hàng
          </Button>
          <Button type="primary" onClick={() => calFunction(dataSource)} style={{marginLeft: 10}}>Tính toán</Button>
        </div>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};
export default AddRowTable;