import React from 'react';
import { Button, Descriptions, Tag } from 'antd';
import calculatorService from './service';

const DataDisplay = () => {
  const dataResultString = localStorage.getItem("resultData");
  const dataResult = dataResultString ? JSON.parse(dataResultString) : {};
  console.log(dataResult)

  const TAW = dataResult.TAWpoint;
  const TBF = dataResult.TBFpoint;
  const UUCP = dataResult.TAWpoint + dataResult.TBFpoint;
  const TCF = 0.6 + (0.01*dataResult.TFWpoint);
  const EF = 1.4 - 0.03*dataResult.EFWpoint;
  const AUCP = UUCP * TCF * EF;
  const P = dataResult.Ppoint;
  const E = 10/6 * AUCP;
  const H = (dataResult.AVGSalaryMonth/20)/8;
  const G = 1.4 * E * P * H;

  const items = [
    {
      label: 'I. Tính điểm trường hợp sử dụng (Usecase)',
      span: {
          xs: 2,
          sm: 2,
          md: 2,
          lg: 2,
          xl: 2,
          xxl: 2,
      },
        children: (
          <>
            1. Điểm actor (TAW): <b>{TAW ? TAW.toFixed(0) : 0}</b>
            <br />
            2. Điểm usecase (TBF): <b>{TBF ? TBF.toFixed(0) : 0}</b>
            <br />
            3. Tính điểm UUCP (UUCP = TAW + TBF): <b>{UUCP ? UUCP.toFixed(0) : 0}</b>
            <br />
            4. Hệ số phức tạp về KT-CN (TCF) (TCF = 0,6 + (0,01 x TFW)): <b>{TCF ? TCF.toFixed(2) : 0}</b>
            <br />
            5. Hệ số phức tạp về môi trường (EF) (EF = 1,4 + (-0,03 x EFW)):  <b>{EF ? EF.toFixed(3) : 0}</b>
            <br />
            6. Tính điểm AUCP (AUCP = UUCP x TCF x EF): <b>{AUCP ? AUCP.toFixed(3) : 0}</b>
          </>
        ),
    },
    {
      label: 'II. Nội suy thời gian lao động (P)',
      span: {
          xs: 2,
          sm: 2,
          md: 2,
          lg: 2,
          xl: 2,
          xxl: 2,
      },
        children: (
          <>
            Giá trị (P : người/giờ/AUCP): <b>{P ? P.toFixed(0) : 0}</b>
          </>
        ),
    },
    {
      label: 'III. Giá trị nỗ lực thực tế (E)',
      span: {
          xs: 2,
          sm: 2,
          md: 2,
          lg: 2,
          xl: 2,
          xxl: 2,
      },
        children: (
          <>
            Giá trị (E = 10/6 x AUCP): <b>{E ? E.toFixed(3) : 0}</b>
          </>
        ),
    },
    {
      label: 'IV. Mức lương lao động bình quân (H)',
      span: {
          xs: 2,
          sm: 2,
          md: 2,
          lg: 2,
          xl: 2,
          xxl: 2,
      },
        children: (
          <>
            Giá trị (H: người/giờ): <b>{H ? calculatorService.displayVNDType(H.toFixed(0)) : 0}</b>
          </>
        ),
    },
    {
      label: 'V. Giá trị phần mềm nội bộ (G)',
      span: {
          xs: 2,
          sm: 2,
          md: 2,
          lg: 2,
          xl: 2,
          xxl: 2,
      },
      children: (
          <>
            Giá trị (G = 1,4 x E x P x H): <b>{G ? calculatorService.displayVNDType(G.toFixed(0)) : 0} đồng</b>
          </>
      ),
    },
  ];
  const handleReload = () => {
    window.location.reload()
  }

  return (
    <>
      <div
        style={{
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'right',
          justifyContent: 'right',
          padding: 10,
        }}
      >
        <Button type='primary' onClick={handleReload}>Cập nhật</Button>
      </div>
      <Descriptions
        title="Kết quả"
        bordered
        column={{
            xs: 2,
            sm: 2,
            md: 2,
            lg: 2,
            xl: 2,
            xxl: 2,
        }}
        items={items}
      />
    </>
  )
};
export default DataDisplay;