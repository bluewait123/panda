//next(err, data)
next(null, {
    code: '0000',
    message: 'success',
    data: [
        {id: '1', typeName:'编程语言', parentId:'', level:0, status: '1', createTime: '2020-07-01'},
        {id: '1001', typeName:'JAVA', parentId:'1', level:1, status: '1', createTime: '2020-07-01'},
        {id: '100101', typeName:'SpringBoot2.0', parentId:'1001', level:2, status: '1', createTime: '2020-07-01'},
        {id: '100102', typeName:'MyBatis', parentId:'1001', level:2, status: '1', createTime: '2020-07-01'},
        {id: "100103", typeName:'Redis', parentId:'1001', level:2, status: '0', createTime: '2020-07-01'},
        {id: '100102', typeName:'VUE', parentId:'1', level:1, status: '1', createTime: '2020-07-01'},
        {id: '2', typeName:'服务器', parentId:'', level:0, status: '1', createTime: '2020-07-01'},
        {id: '1002', typeName:'Linux', parentId:'2', level:1, status: '1', createTime: '2020-07-01'},
        {id: '100201', typeName:'CentOS', parentId:'2', level:1, status: '1', createTime: '2020-07-01'},
        {id: '3', typeName:'第三方软件', parentId:'', level:0, status: '1', createTime: '2020-07-01'},
        {id: '1003', typeName:'Maven', parentId:'3', level:1, status: '1', createTime: '2020-07-01'},
        {id: '100301', typeName:'Git', parentId:'3', level:1, status: '0', createTime: '2020-07-01'},
    ]
});