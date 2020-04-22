export default{
    phone :(rule, value, callback) => {
        if (!value) {
            return callback(new Error('手机号不能为空'));
        } else if (!/^1[34578]\d{9}$/.test(value)) {
            callback('手机号格式不正确');
        } else {
            callback();
        }   
    }
}