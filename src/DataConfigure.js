const dataTAW = [
    {
        key: 1,
        actorTAW: 'Đơn giản',
        descriptionTAW: 'Thuộc loại giao diện của chương trình',
        quantityTAW: 0,
        weightTAW: 1,
    },
    {
        key: 2,
        actorTAW: 'Trung bình',
        descriptionTAW: 'Giao diện tương tác hoặc phục vụ một giao thức hoạt động',
        quantityTAW: 0,
        weightTAW: 2,
    },
    {
        key: 3,
        actorTAW: 'Phức tạp',
        descriptionTAW: 'Giao diện đồ họa',
        quantityTAW: 0,
        weightTAW: 3,
    },
];

const dataTBF = [
    {
        key: 1,
        typeTBF: 'B',
        simpleTBF: 0,
        mediumTBF: 0,
        complicatedTBF: 0,
    },
    {
        key: 2,
        typeTBF: 'M',
        simpleTBF: 0,
        mediumTBF: 0,
        complicatedTBF: 0,
    },
    {
        key: 3,
        typeTBF: 'T',
        simpleTBF: 0,
        mediumTBF: 0,
        complicatedTBF: 0,
    },
];

const dataTCF = [
    {
        key: 1,
        orderTCF: 1,
        coefficientsTCF: 'Hệ thống phân tán',
        weightTCF: 2,
        ratingValueTCF: 0,
        // resultTCF: 0,
    },
    {
        key: 2,
        orderTCF: 2,
        coefficientsTCF: 'Tính chất đáp ứng tức thời hoặc yêu cầu đảm bảo thông lượng',
        weightTCF: 1,
        ratingValueTCF: 0,
        // resultTCF: 0,
    },
    {
        key: 3,
        orderTCF: 3,
        coefficientsTCF: 'Hiệu quả sử dụng trực tuyến',
        weightTCF: 1,
        ratingValueTCF: 0,
        // resultTCF: 0,
    },
    {
        key: 4,
        orderTCF: 4,
        coefficientsTCF: 'Độ phức tạp của xử lý bên trong',
        weightTCF: 1,
        ratingValueTCF: 0,
        // resultTCF: 0,
    },
    {
        key: 5,
        orderTCF: 5,
        coefficientsTCF: 'Mã nguồn phải tái sử dụng được',
        weightTCF: 1,
        ratingValueTCF: 0,
        // resultTCF: 0,
    },
    {
        key: 6,
        orderTCF: 6,
        coefficientsTCF: 'Dễ cài đặt',
        weightTCF: 0.5,
        ratingValueTCF: 0,
        // resultTCF: 0,
    },
    {
        key: 7,
        orderTCF: 7,
        coefficientsTCF: 'Dễ sử dụng',
        weightTCF: 0.5,
        ratingValueTCF: 0,
        // resultTCF: 0,
    },
    {
        key: 8,
        orderTCF: 8,
        coefficientsTCF: 'Khả năng chuyển đổi',
        weightTCF: 2,
        ratingValueTCF: 0,
        // resultTCF: 0,
    },
    {
        key: 9,
        orderTCF: 9,
        coefficientsTCF: 'Khả năng dễ thay đổi',
        weightTCF: 1,
        ratingValueTCF: 0,
        // resultTCF: 0,
    },
    {
        key: 10,
        orderTCF: 10,
        coefficientsTCF: 'Sử dụng đồng thời',
        weightTCF: 1,
        ratingValueTCF: 0,
        // resultTCF: 0,
    },
    {
        key: 11,
        orderTCF: 11,
        coefficientsTCF: 'Có các tính năng bảo mật đặc biệt',
        weightTCF: 1,
        ratingValueTCF: 0,
        // resultTCF: 0,
    },
    {
        key: 12,
        orderTCF: 12,
        coefficientsTCF: 'Cung cấp truy nhập trực tiếp tới các phần mềm của các hãng thứ ba',
        weightTCF: 1,
        ratingValueTCF: 0,
        // resultTCF: 0,
    },
    {
        key: 13,
        orderTCF: 13,
        coefficientsTCF: 'Yêu cầu phương tiện đào tạo đặc biệt cho người sử dụng',
        weightTCF: 1,
        ratingValueTCF: 0,
        // resultTCF: 0,
    },
];

const dataEF = [
    {
        key: 1,
        orderEF: 1,
        impactFactorsEF: 'Có áp dụng qui trình phát triển phần mềm theo mẫu RUP và có hiểu biết về RUP hoặc quy trình phát triển phần mềm tương đương',
        weightEF: 1.5,
        ratingValueEF: 0,
        ratingExEF: 0,
    },
    {
        key: 2,
        orderEF: 2,
        impactFactorsEF: 'Có kinh nghiệm về ứng dụng tương tự',
        weightEF: 0.5,
        ratingValueEF: 0,
        ratingExEF: 0,
    },
    {
        key: 3,
        orderEF: 3,
        impactFactorsEF: 'Có kinh nghiệm về hướng đối tượng',
        weightEF: 1,
        ratingValueEF: 0,
        ratingExEF: 0,
    },
    {
        key: 4,
        orderEF: 4,
        impactFactorsEF: 'Có khả năng lãnh đạo Nhóm',
        weightEF: 0.5,
        ratingValueEF: 0,
        ratingExEF: 0,
    },
    {
        key: 5,
        orderEF: 5,
        impactFactorsEF: 'Tính chất năng động',
        weightEF: 1,
        ratingValueEF: 0,
        ratingExEF: 0,
    },
    {
        key: 6,
        orderEF: 6,
        impactFactorsEF: 'Độ ổn định của các yêu cầu',
        weightEF: 2,
        ratingValueEF: 0,
        ratingExEF: 0,
    },
    {
        key: 7,
        orderEF: 7,
        impactFactorsEF: 'Sử dụng các nhân viên làm bán thời gian',
        weightEF: -1,
        ratingValueEF: 0,
        ratingExEF: 0,
    },
    {
        key: 8,
        orderEF: 8,
        impactFactorsEF: 'Dùng ngôn ngữ lập trình loại khó',
        weightEF: -1,
        ratingValueEF: 0,
        ratingExEF: 0,
    },
];

// const dataH = [
//     {
//         key: 1,
//         orderH: 1,
//         wageH: 0,
//         numberEmployeeH: 0,
//     },
// ];

const resultData = {
    TAWpoint: 0,
    EFWpoint: 0,
    TBFpoint: 0,
    TFWpoint: 0,
    UUCPpoint: 0,
    EFpoint: 0,
    ESpoint: 0,
    Ppoint: 0,
    AVGSalaryMonth: 0,
}


export const dataConfigurations = {
    dataTAW,
    dataTBF,
    dataTCF,
    dataEF,
    resultData,
    // dataH
};

export default dataConfigurations;
