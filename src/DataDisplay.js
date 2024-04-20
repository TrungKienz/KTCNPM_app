import React from 'react';
import { Descriptions } from 'antd';
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
          1. Điểm actor (TAW): 
          <br />
          2. Điểm usecase (TBF): 
          <br />
          3. Tính điểm UUCP (UUCP = TAW + TBF):
          <br />
          4. Hệ số phức tạp về KT-CN (TCF) (TCF = 0,6 + (0,01 x TFW)):
          <br />
          5. Hệ số phức tạp về môi trường (EF) (EF = 1,4 + (-0,03 x EFW)): 
          <br />
          6. Tính điểm AUCP (AUCP = UUCP x TCF x EF):
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
          Giá trị (P : người/giờ/AUCP):
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
          Giá trị (E = 10/6 x AUCP):
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
          Giá trị (H: người/giờ):
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
          Giá trị (G = 1,4 x E x P x H):
        </>
    ),
  },
];
const DataDisplay = () => (
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
);
export default DataDisplay;