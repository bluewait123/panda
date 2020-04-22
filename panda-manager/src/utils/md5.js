import crypto from 'crypto'

export default{
    
    /**
     * MD5加密
     * @param {*} data 加密数据
     */
    getMD5(data){
        let md5 = crypto.createHash("md5");
        md5.update(data);
        return md5.digest('hex')
    },

    /**
     * MD5加密 加盐
     * @param {*} data 加密数据
     * @param {*} salt 加盐
     */
    getMD5BySalt(data,salt){
        let hmac = crypto.createHmac('md5', salt);
        let up = hmac.update(data);
        return up.digest('hex').toUpperCase()
    }
}