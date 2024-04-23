import React from 'react';
import { Descriptions, Tag } from 'antd';

const DataDisplay = () => {
  const dataResultString = localStorage.getItem("resultData");
  const dataResult = dataResultString ? JSON.parse(dataResultString) : {};
  console.log(dataResult)
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
            1. Điểm actor (TAW): <Tag color="#1677ff">{dataResult.TAWpoint}</Tag>
            <br />
            2. Điểm usecase (TBF): <Tag color="#1677ff">{dataResult.TBFpoint}</Tag>
            <br />
            3. Tính điểm UUCP (UUCP = TAW + TBF): <Tag color="#1677ff">{dataResult.TAWpoint + dataResult.TBFpoint}</Tag>
            <br />
            4. Hệ số phức tạp về KT-CN (TCF) (TCF = 0,6 + (0,01 x TFW)): <Tag color="#1677ff">{0.6 + (0.01*dataResult.TFWpoint)}</Tag>
            <br />
            5. Hệ số phức tạp về môi trường (EF) (EF = 1,4 + (-0,03 x EFW)):  <Tag color="#1677ff">{dataResult.EFpoint}</Tag>
            <br />
            6. Tính điểm AUCP (AUCP = UUCP x TCF x EF): <Tag color="#1677ff">{dataResult.TAWpoint * dataResult.TBFpoint * dataResult.EFpoint}</Tag>
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
            Giá trị (P : người/giờ/AUCP): <Tag color="#1677ff">{dataResult.Ppoint}</Tag>
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
            Giá trị (E = 10/6 x AUCP): <Tag color="#1677ff">{dataResult.Epoint}</Tag>
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
            Giá trị (H: người/giờ): <Tag color="#1677ff">{dataResult.Hpoint}</Tag>
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
            Giá trị (G = 1,4 x E x P x H): <Tag color="#1677ff">{1.4*dataResult.Epoint*dataResult.Ppoint*dataResult.Hpoint}</Tag>
          </>
      ),
    },
  ];
  return (
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
  )
};
export default DataDisplay;