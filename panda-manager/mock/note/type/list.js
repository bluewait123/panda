//next(err, data)
next(null, {
    code: '0000',
    message: 'success',
    data: [
        {id: 'T001', typeName:'编程语言', parentId:'', status: '1', createTime: '2020-07-01'},
        {id: 'T001001', typeName:'JAVA', parentId:'T001', status: '1', createTime: '2020-07-01'},
        {id: 'T00100101', typeName:'SpringBoot2.0', parentId:'T001001', status: '1', createTime: '2020-07-01'},
        {id: 'T00100102', typeName:'MyBatis', parentId:'T001001', status: '1', createTime: '2020-07-01'},
        {id: 'T00100103', typeName:'Redis', parentId:'T001001', status: '1', createTime: '2020-07-01'},
        {id: 'T001002', typeName:'VUE', parentId:'T001', status: '1', createTime: '2020-07-01'},
        {id: 'T002', typeName:'服务器', parentId:'', status: '1', createTime: '2020-07-01'},
        {id: 'T002001', typeName:'Linux', parentId:'T002', status: '1', createTime: '2020-07-01'},
        {id: 'T002002', typeName:'CentOS', parentId:'T002', status: '1', createTime: '2020-07-01'},
        {id: 'T003', typeName:'第三方软件', parentId:'', status: '1', createTime: '2020-07-01'},
        {id: 'T003001', typeName:'Maven', parentId:'T003', status: '1', createTime: '2020-07-01'},
        {id: 'T003002', typeName:'Git', parentId:'T003', status: '1', createTime: '2020-07-01'},
    ]
});