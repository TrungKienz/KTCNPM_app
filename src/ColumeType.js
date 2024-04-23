const columnsTitleTAW = [
    {
        title: 'Các loại tác nhân',
        dataIndex: 'actorTAW',
        width: '20%',
        editable: false,
    },
    {
        title: 'Mô tả',
        dataIndex: 'descriptionTAW', 
        width: '40%',
        editable: false,
    },
    {
        title: 'Số lượng',
        dataIndex: 'quantityTAW',
        width: '10%',
        editable: true,
    },
    {
        title: 'Trọng số',
        dataIndex: 'weightTAW',
        width: '10%',
        editable: false,
    },
    {
        title: 'Kết quả',
        dataIndex: 'resultTAW',
        width: '10%',
        editable: false,
        render: (text, record) => record.quantityTAW ? record.quantityTAW * record.weightTAW : 0,
    }
];

const columnsTitleTBF = [
    {
        title: 'Loại',
        dataIndex: 'typeTBF',
        width: '20%',
        editable: false,
    },
    {
        title: 'Đơn giản',
        dataIndex: 'simpleTBF',
        width: '20%',
        editable: true,
    },
    {
        title: 'Trung Bình',
        dataIndex: 'mediumTBF',
        width: '20%', 
        editable: true,
    },
    {
        title: 'Phức tạp',
        dataIndex: 'complicatedTBF',
        width: '20%', 
        editable: true,
    }
];

const columnsTitleTCF = [
    {
        title: 'Số thứ tự',
        dataIndex: 'orderTCF',
        width: '10%',
        editable: false,
    },
    {
        title: 'Các hệ số',
        dataIndex: 'coefficientsTCF',
        width: '50%',
        editable: false,
    },
    {
        title: 'Trọng số',
        dataIndex: 'weightTCF',
        width: '10%',
        editable: false,
    },
    {
        title: 'Giá trị xếp hạng',
        dataIndex: 'ratingValueTCF',
        width: '10%',
        editable: true,
    },
    {
        title: 'Kết quả',
        dataIndex: 'resultTCF',
        width: '10%',
        editable: false,
        render: (text, record) => record.ratingValueTCF ? record.weightTCF * record.ratingValueTCF : 0,
    }
];

const columnsTitleEF = [
    {
        title: 'Số thứ tự',
        dataIndex: 'orderEF',
        width: '5%',
        editable: false,
    },
    {
        title: 'Các hệ số tác động',
        dataIndex: 'impactFactorsEF',
        width: '40%',
        editable: false,
    },
    {
        title: 'Trọng số',
        dataIndex: 'weightEF',
        width: '10%',
        editable: false,
    },
    {
        title: 'Giá trị xếp hạng',
        dataIndex: 'ratingValueEF',
        width: '10%',
        editable: true,
    },
    {
        title: 'Kết quả',
        dataIndex: 'resultTCF',
        width: '10%',
        editable: false,
        render: (text, record) => record.ratingValueEF ? record.ratingValueEF * record.weightEF : 0,
    },
    {
        title: 'Độ ổn định kinh nghiệm',
        dataIndex: 'ratingExEF',
        width: '10%',
        editable: true,
    },
];

export const columnConfigurations = {
    columnsTitleTAW,
    columnsTitleTBF,
    columnsTitleTCF,
    columnsTitleEF
};

export default columnConfigurations;
