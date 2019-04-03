import crypto from 'crypto';
import xml2js from 'xml2js';

module.exports = {
  // 解密证书
  decryptCertificates: (keys, cert) => {
    // 向量
    const iv = cert.encrypt_certificate.nonce;

    let cdata = cert.encrypt_certificate.ciphertext;
    cdata = Buffer.from(cdata, 'base64').toString('binary');

    const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(keys, 'binary'), Buffer.from(iv, 'binary'));
    decipher.setAutoPadding(true);

    decipher.setAAD(Buffer.from(cert.encrypt_certificate.associated_data, 'binary'));

    const data = Buffer.from(cdata, 'binary');

    let rtn = decipher.update(data, 'binary', 'utf8').toString('utf8');
    rtn = `${rtn.split('-----END CERTIFICATE-----')[0]}-----END CERTIFICATE-----`;
    cert.certificate = rtn;
    return cert;
  },
  /**
   * RSA公钥加密
  */
  encryptRSAPublicKey: (txt, publicKey) => {
    const buffer = Buffer.from(txt, 'utf8');
    // if (typeof (publicKey) === 'string') {
    //   publicKey = Buffer.from(publicKey, 'utf8');
    // }
    const encrypted = crypto.publicEncrypt({
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    }, buffer);
    return encrypted.toString('base64');
  },
  decrypt: (encryptedData, key, iv = '') => {
    const decipher = crypto.createDecipheriv('aes-256-ecb', key, iv);
    decipher.setAutoPadding(true);
    let decoded = decipher.update(encryptedData, 'base64', 'utf8');
    decoded += decipher.final('utf8');
    return decoded;
  },
  md5: (str, encoding = 'utf8') => crypto.createHash('md5').update(str, encoding).digest('hex'),
  hmac: (str, key) => crypto.createHmac('sha256', key).update(str).digest('hex'),
  checkXML: (str) => {
    const reg = /^(<\?xml.*\?>)?(\r?\n)*<xml>(.|\r?\n)*<\/xml>$/i;
    return reg.test(str.trim());
  },
  getFullDate: () => {
    const str = new Date();
    const YYYY = str.getFullYear();
    const MM = (`00${str.getMonth() + 1}`).substr(-2);
    const DD = (`00${str.getDate()}`).substr(-2);
    return YYYY + MM + DD;
  },
  toQueryString: obj => Object.keys(obj)
    .filter(key => key !== 'sign' && obj[key] !== undefined && obj[key] !== '')
    .sort()
    .map(key => `${key}=${obj[key]}`)
    .join('&'),
  generate: (length = 16) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let noceStr = '';
    for (let i = 0; i < length; i += 1) {
      noceStr += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return noceStr;
  },
  buildXML: (obj, rootName = 'xml') => {
    const opt = { rootName, allowSurrogateChars: true, cdata: true };
    return new xml2js.Builder(opt).buildObject(obj);
  },
  parseXML: xml => new Promise((resolve, reject) => {
    const opt = { trim: true, explicitArray: false, explicitRoot: false };
    xml2js.parseString(xml, opt, (err, res) => (err ? reject(new Error('XMLDataError')) : resolve(res || {})));
  }),
};
