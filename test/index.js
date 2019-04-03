/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const WxPayment = require('../src/wx-payment');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const config = process.env.TESTER === 'travis' ? {
  appid: process.env.appid || '0',
  mchid: process.env.mchid || '0',
  partnerKey: process.env.partnerKey || '0',
  openid: process.env.openid || '0',
} : require('../config');

const pfxFile = path.resolve(__dirname, '../config/apiclient_cert.p12');
if (fs.existsSync(pfxFile)) {
  config.pfx = fs.readFileSync(pfxFile);
}

let cert = {
  serial_no: '6A7685AD2F743BEE0753E52AB5EE4A38F90D1F3F',
  effective_time: '2019-03-15 16:39:33',
  expire_time: '2024-03-13 16:39:33',
  encrypt_certificate:
  {
    algorithm: 'AEAD_AES_256_GCM',
    nonce: '5773c1b414cf',
    associated_data: 'certificate',
    ciphertext: '0hxzzXH/HnJ1IrXN+SzJBrfosIMasz++8RMWEmt1Av5CjkLHRggqlomCMeLlw4/P194ihSmek4Afiz3VhP75WCLQf0pCYlBXLukVtT40bJDUHgHoopghvdCQ3fVjB/A0BoZsdInqMLlBgRGyT7gHOU37A4sCWLsk33eRNNWjsC0fOvDqDpewtQfnF8dRC0CuqE9U3t5SQXS9xZzJbYqid7mKeY3GT8DPmLaLCr2uuQg96MpyPDS8iC97YfMDpXzlYzVuhTe4XbNleA8UFJBYMOwcEVhdsDVUUZEcml5G1jjT5uqzWdhT/jErH3DcFzSdJ3EG1zaMimIHgfi4I9ymREM4v0mSv7Pf6uPTJk66Oc7GJ1v5P0PMNetmGkkj/cb9zmRQbACGgO0CdtBjthqQvWn4iQt/230CS4YZLYGZzxFq9RgxKCBeQ8+pBkhVICJioNmGTzReu9hWtlrhiR1mxYw04E5TJjp0kjN1QCN/T2B5D6Kh8BLi5vcwY06CGg6xt0aTEzWbLoxUBPBNvIEC4uXMIT4F4/VPk463ORqLC9gJ7eWqAZp59OfBj0PN4pZ4QmZAZZ8YFR9KgM8cC4k3Uih1dJhBgnoCxtV606ZfWZgm4ZtI02Fh/CyOemf3oxLq8C2Two9RQuohfkK5qYgnBuZKmreC9F8GcOceW4uVYN3rf98N5gAkCczdKrjwIpEFbc4HEt+1XoEbz0n4lMsRIhefl/mjECIWNi5NnkjisjT8hxc/zWTpvSl11JgMA4MOPVEJyZGHxt++MkM1N7GmXQYCCyIsVjI8VqVlWolKOu9EjwX6kz+lfCDidq7S6MjPIxTVdOX+szuTckBLewoALb5IuVznipkaHv8bkpDaKGdil45TDSx8Fef7Te4JXQNCH9HkqUL9GXaUEayTGkX81o25cbD1PcczLjIaDWyWyQ9EZ0kwpCc90q7FeHaPlZU4+2OIFeYv68FlKGaw+1JMpOS+3+4kstijzycboF6YL7dg8m9QlsP8bwVFjGS7BxsjhkeQEMfW6njTiF0U7sl7aTlbJf3nt7eWKzfvr6ZrUuVIQHSb06C+naQAhLaB8kRzm5dJU+UKGxeuvGLGfUflNgUR3dsIWefKWHnNOUhvIeXDnP5ci6nvi/qTk9LoycaKEUt3i/0HAnN30bDtVxrC3kweey6JD1elt8c4Y3C/PYW2Cg1Qtn7AqlKb7U15tsgntU+UPciiCucPutrWu7qJpk0/PYoD+eoN/CnTU+e6FA4EajsZzmVy04zoFV3zzGn4dMtGXPxHXBE62Po+vC7Gd+lqqS2SCfbVOw7UN9Ngq8K9ThBvP5HyRYuciehmYnKoVhwVnbWWatkJKei9i0XWDNZpHsXZckxYJD/GfR5xgA3CPEon3X22lQb8lI9NF8WIaRRNaIfRq+jmaAeud0uM+pww16EZQ3G3EnejeGfyKu64TdQABtA4P8qFstptoAIPiVuGYrXLi42msORKASb1yll5gsW0S9s8ISD41qpPRvJgwiBL45n0gYDh3ugVudxng94NVtWwCymllCkLMc72eiI/bj8mJCiu2vJjjirMv5DWF+sCUmdsP2qBTbtKy20WvKeaCMPqwoLN98oWV1gX79n8zqtx4pkFnAvNZhL71Mfidzjk428jJUBQJFlPblxjHKmr6sttjXTvJDAg71NTk9cN/uN87W1b5wCwFwaHa87rmT0hu3aM9ofGql/KTW86ElqCB7WNBC0TjEDeud1z0d6wS+OEc0TmT448KnOHWXrKW43vztDf7siO+jpRaL4fu6gZa39Wp4AKmb+xZfsQlR7fSiPtmOww8tsOwWLicrxsTcgF0gYzGo2aX8aJElp9/cZ0L4dN1y7nrr1UVdXwQWrqnQikWrKMuTIoJIgMtggkqSTuuUzYztae2w0fgpESERsq',
  },
  certificate: '-----BEGIN CERTIFICATE-----\nMIID8TCCAtmgAwIBAgIUanaFrS90O+4HU+Uqte5KOPkNHz8wDQYJKoZIhvcNAQEL\nBQAwXjELMAkGA1UEBhMCQ04xEzARBgNVBAoTClRlbnBheS5jb20xHTAbBgNVBAsT\nFFRlbnBheS5jb20gQ0EgQ2VudGVyMRswGQYDVQQDExJUZW5wYXkuY29tIFJvb3Qg\nQ0EwHhcNMTkwMzE1MDgzOTMzWhcNMjQwMzEzMDgzOTMzWjCBgjEYMBYGA1UEAwwP\nVGVucGF5LmNvbSBzaWduMRMwEQYDVQQKDApUZW5wYXkuY29tMR0wGwYDVQQLDBRU\nZW5wYXkuY29tIENBIENlbnRlcjELMAkGA1UEBgwCQ04xEjAQBgNVBAgMCUd1YW5n\nRG9uZzERMA8GA1UEBwwIU2hlblpoZW4wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAw\nggEKAoIBAQCn+E6PlSYHjD7yFJUKsvTPFetsmqFmutRKz3nzNQCuF/fDmXDMjVDr\nQ31ryGT7CFcNF0tCmPdD3Q0HsM5ygC9FY9JCyZnIvDC2ixRO/qUvv3fNNBfYLG00\nvtbch0ux7cjjomARGQIZ5d82h6nmUj1f+WxvKgkUPfB1sn7j6037Em0U4RNhWaso\ny4fLRiKVKmpXOP+AN3HrBi8VnUKuSTqdF56gIp6A6gB2TvMzsdjf0IGXGSuGeQ0/\nLmLOAwNGAk2lUv0vUZMvnSG3YCD7yzeMqVyTFnAShFPGYnvifIeKlCz11ZLbfbyk\nPybnvZEhy/Re6wN5l8JMB5Aa02Tnbuz1AgMBAAGjgYEwfzAJBgNVHRMEAjAAMAsG\nA1UdDwQEAwIE8DBlBgNVHR8EXjBcMFqgWKBWhlRodHRwOi8vZXZjYS5pdHJ1cy5j\nb20uY24vcHVibGljL2l0cnVzY3JsP0NBPTFCRDQyMjBFNTBEQkMwNEIwNkFEMzk3\nNTQ5ODQ2QzAxQzNFOEVCRDIwDQYJKoZIhvcNAQELBQADggEBADx9tF7w0O70lHzD\n3b3GOsxpIbExqcocEyI4B0xgPdYkfrvEhl/2Fk6AqojGv+MyMZzPgHowKRQeiH6U\nKtlAO/IKkWBe8ChDoh+QUUzKf3yIVsVfUHaaWY7bHvKMzNXy5lDQoukfLrynV2MX\nGg2cPzzSm0kjeoCevl5ocK7saWiVw/pYz9rES3WOY8hB3lWbsG4DkNKsncBUanR3\noD6fzdNcoFHi3Q8t4OR8oziWwXV6TAHvC2RLfim8EfranpnT6BjHhlBECBRfABMC\nrFT8NQzWt+GL+7wmJzUbD4l9q8r87++KXRhgLzHLw48bCQTAmKU2gWA0Tvu5XeWy\nO3SF/Uc=\n-----END CERTIFICATE-----',
};

const api = new WxPayment(config, true);


describe('订单相关', () => {
  const id = Date.now();
  const notify_url = 'http://d9b274dd.ngrok.io';

  it.skip('获取证书', async () => {
    const res = await api.getCertficates();
    cert = res;
    console.log(res);
    assert.ok(res.serial_no);
  });

  /**
    * {
    *   "return_code": "SUCCESS",
    *   "return_msg": "OK",
    *   "nonce_str": "zyTM40luLWmSs9Vc",
    *   "sign": "800D3EDD35BC9DFB3D9C96CF91076EA5B8447AD6264A4B0E5C5707BF13033EF2",
    *   "result_code": "SUCCESS",
    *   "applyment_id": "2000002124770771"
    * }
    */
  it.skip('小微商户-申请入驻', async () => {
    const res = await api.applymentMicroSubmit({
      id_card_name: '张学友',
      id_card_copy: 'OIkiPwZjCl9dJ55LJOJl9tGjgIzicsoLHqCAUy83DP5siDRKUpplVd-elsiR-mskppOPXEhEDDofVsMxvvkZN9BAlp70ocOZt9wzYTlCZ5w',
      id_card_national: 'OIkiPwZjCl9dJ55LJOJl9tGjgIzicsoLHqCAUy83DP5siDRKUpplVd-elsiR-mskppOPXEhEDDofVsMxvvkZN9BAlp70ocOZt9wzYTlCZ5w',
      id_card_number: '440301198110103611',
      id_card_valid_time: '["2010-01-01","2020-01-01"]',
      account_name: '张学友',
      account_bank: '交通银行',
      account_number: '1712345',
      bank_address_code: '110000',
      store_name: '测试',
      store_address_code: '110000',
      store_street: '测试街道',
      store_entrance_pic: 'OIkiPwZjCl9dJ55LJOJl9tGjgIzicsoLHqCAUy83DP5siDRKUpplVd-elsiR-mskppOPXEhEDDofVsMxvvkZN9BAlp70ocOZt9wzYTlCZ5w',
      indoor_pic: 'OIkiPwZjCl9dJ55LJOJl9tGjgIzicsoLHqCAUy83DP5siDRKUpplVd-elsiR-mskppOPXEhEDDofVsMxvvkZN9BAlp70ocOZt9wzYTlCZ5w',
      merchant_shortname: '友朋',
      service_phone: '18607555761',
      product_desc: '线下零售',
      rate: '0.6%',
      contact: '张学友',
      contact_phone: '18607555761',
      business_code: (new Date()).getTime(),
    }, cert.serial_no, cert.certificate);
    console.log(res);
    assert.ok(res.return_code === 'SUCCESS');
  });

  /**
    * {
    *   "return_code": "SUCCESS",
    *   "return_msg": "OK",
    *   "nonce_str": "rHvJLoKfSpXF3jvP",
    *   "sign": "0AB62265772AF59AB936468D65E05D53EFFD121C781D7DB2F8C221EE897D3748",
    *   "result_code": "SUCCESS",
    *   "applyment_id": "2000002124770771",
    *   "applyment_state": "REJECTED",
    *   "applyment_state_desc": "已驳回",
    *   "audit_detail": "{\"audit_detail\":[{\"param_name\":\"id_card_copy\",\"reject_reason\":\"身份证正面识别失败，请重新上传\"}]}"
    * }
  */
  it('小微商户-查询', async () => {
    const res = await api.applymentMicroGetState({
      applyment_id: '2000002124770771',
    });
    assert.ok(res.return_code === 'SUCCESS');
  });


  it.skip('上传图片', async () => {
    const filePath = path.resolve(__dirname, './logo.png');
    const res = await api.uploadMedia(filePath, path.basename(filePath));
    /**
      * {
      *   "return_code": "SUCCESS",
      *   "return_msg": "OK",
      *   "result_code": "SUCCESS",
      *   "media_id": "OIkiPwZjCl9dJ55LJOJl9tGjgIzicsoLHqCAUy83DP5siDRKUpplVd-elsiR-mskppOPXEhEDDofVsMxvvkZN9BAlp70ocOZt9wzYTlCZ5w",
      *   "sign": "FA587321DABBA26EFF7AE83283BAD461"
      * }
    */
    console.log(res);
    assert.ok(res.return_code === 'SUCCESS');
  });


  // it('获取unionid', async () => {
  //   const res = await api.queryUnionID({
  //     out_trade_no: 'OD190313141329523958',
  //     openid: config.openid,
  //     mch_id: config.mchid,
  //     sub_mch_id: config.sub_mchid,
  //   });
  //   console.log(res);
  //   assert.ok(res.return_code === 'SUCCESS');
  // });

  // it('刷脸authinfo', async () => {
  //   const res = await api.facepayAuthInfo({
  //     store_id: '123',
  //     store_name: '123',
  //     device_id: '123',
  //     rawdata: '3bvvkL2zeNNKpX0hloVk09wmvjGMVl2Pe7F7uU795FvHMxmWFqosNGDFUlxtTxdnYxUJWH+3aIsWq+ab1qltSkJzxhVgVEdGE/+xbUNn9hMacjdY4Ji3aDl1l8nC1OM9lb8jP9S2/xJR9o1Bk+8M1uLmS7iohFAZpEzgRetgs5GWFp/E1anibLfY3zkfLsbwkZuNbDUH2zo/n9yTHfm20QFwxfpWWswML0W77imqJFTABJlgHWnYZUnK+mtixKgTwpKdv4qwz9IfSsAsOfDiK1B+xa/iFfE+v8PgyYv7alGvj+kY83YVQqQ5hZzU/pr/HbAEpKam8QqRiPz3Y8Q3XkI2SjFM1g/uJdmFHS8EatGIWtshkczVrlkeWNntAnjb/jMoeCAKQoEYRl6SdHVbQbxqfArQKXe/gADWC1bmDvU2sa4cA4gwOXGUyw==',
  //     sub_mch_id: config.sub_mchid,
  //     mch_id: config.mchid,
  //     now: Math.round((new Date()).getTime() / 1000),
  //   });
  //   console.log(res);
  //   assert.ok(res.return_code === 'SUCCESS');
  // });

  /**
{ return_code: 'SUCCESS',
  return_msg: 'OK',
  appid: 'wx7a0adc4aeeb295b7',
  mch_id: '1480520852',
  sub_mch_id: '1509079171',
  nonce_str: 'S9D0W1plPlFGDTnK',
  sign: 'EB6AB091F60085F62D46DDF764B17EED',
  result_code: 'SUCCESS',
  openid: 'oA0rgwVzjab4kgOuysZ0KMOEwN-8',
  trade_type: 'FACEPAY',
  bank_type: 'CMB_CREDIT',
  total_fee: '1',
  fee_type: 'CNY',
  transaction_id: '4200000162201809079569745850',
  out_trade_no: '123',
  attach: '',
  time_end: '20180907223442',
  cash_fee: '1',
  cash_fee_type: 'CNY',
  promotion_detail: '{}' }
  */
  // it('刷脸支付', async () => {
  //   let res = await api.facepay({
  //     openid: 'oA0rgwVzjab4kgOuysZ0KMOEwN-8',
  //     sub_mch_id: config.sub_mchid,
  //     spbill_create_ip: '127.0.0.1',
  //     total_fee: 1,
  //     body: '商品名称',
  //     face_code: 'f7444e21-51be-4c5c-a204-abc022b0fdec',
  //     out_trade_no: '123-cc',
  //   });
  //   console.log('facepay', res);
  //   assert.ok(res.return_code === 'SUCCESS');
  //   assert.ok(res.result_code === 'SUCCESS');
  // });

  it.skip('H5/小程序支付参数(自动下单): getPayParams', async () => {
    const res = await api.getPayParams({
      out_trade_no: id,
      body: '商品简单描述',
      total_fee: 100,
      notify_url,
      sub_mch_id: config.sub_mchid,
      openid: config.openid,
    });
    console.log('getPayParams', res);
    const keys = ['appId', 'timeStamp', 'nonceStr', 'package', 'signType', 'paySign', 'timestamp'];
    assert.deepEqual(Object.keys(res), keys);
  });

  it.skip('APP支付参数(自动下单): getAppParams', async () => {
    const res = await api.getAppParams({
      out_trade_no: id,
      body: '商品简单描述',
      total_fee: 100,
      sub_mch_id: config.sub_mchid,
      notify_url,
    });
    const keys = ['appid', 'partnerid', 'prepayid', 'package', 'noncestr', 'timestamp', 'sign'];
    assert.deepEqual(Object.keys(res), keys);
  });

  it.skip('统一下单: unifiedOrder', async () => {
    const res = await api.unifiedOrder({
      out_trade_no: id,
      body: '商品简单描述',
      total_fee: 100,
      notify_url,
      openid: config.openid,
      sub_mch_id: config.sub_mchid,
    });
    console.log('unifiedOrder', res);
    assert.ok(res.return_code === 'SUCCESS');
    assert.ok(res.result_code === 'SUCCESS');
  });

  it.skip('H5/小程序支付参数: getPayParamsByPrepay', async () => {
    const res = await api.getPayParamsByPrepay({
      prepay_id: id,
    });
    console.log('getPayParamsByPrepay', res);
    const keys = ['appId', 'timeStamp', 'nonceStr', 'package', 'signType', 'paySign', 'timestamp'];
    assert.deepEqual(Object.keys(res), keys);
  });

  it.skip('APP支付参数: getAppParamsByPrepay', async () => {
    const res = await api.getAppParamsByPrepay({
      prepay_id: id,
    });
    const keys = ['appid', 'partnerid', 'prepayid', 'package', 'noncestr', 'timestamp', 'sign'];
    assert.deepEqual(Object.keys(res), keys);
  });

  it.skip('生成扫码支付(模式一)URL: getNativeUrl', async () => {
    const url = api.getNativeUrl({
      product_id: '88888',
    });
    console.log('getNativeUrl', url);
    assert.ok(url);
  });

  it.skip('订单查询: orderQuery', async () => {
    const res = await api.orderQuery({
      out_trade_no: 'OD190313141329523958',
      sub_mch_id: config.sub_mchid,
    });
    console.log('orderQuery', res);
    assert.ok(res.return_code === 'SUCCESS');
    assert.ok(res.result_code === 'SUCCESS');
  });

  it.skip('关闭订单: closeOrder', async () => {
    const res = await api.closeOrder({
      out_trade_no: id,
    });
    console.log('closeOrder', res);
    assert.ok(res.return_code === 'SUCCESS');
    assert.ok(res.result_code === 'SUCCESS');
  });
});

describe('退款相关', () => {
  it.skip('申请退款: refund', async () => {
    const res = await api.refund({
      out_trade_no: 'OD190313141329523958',
      out_refund_no: 'OD190313141329523958',
      sub_mch_id: config.sub_mchid,
      total_fee: 10,
      refund_fee: 10,
    });
    assert.ok(res.return_code === 'SUCCESS');
    assert.ok(res.result_code === 'SUCCESS');
  });

  it.skip('退款查询: refundQuery - out_trade_no', async () => {
    const res = await api.refundQuery({
      out_trade_no: '1711185583256741',
    });
    assert.ok(res.return_code === 'SUCCESS');
    assert.ok(res.result_code === 'SUCCESS');
  });

  it.skip('退款查询: refundQuery - out_refund_no', async () => {
    const res = await api.refundQuery({
      out_refund_no: 'REFUND_1711185583256741',
    });
    assert.ok(res.return_code === 'SUCCESS');
    assert.ok(res.result_code === 'SUCCESS');
  });
});

describe('企业付款相关', () => {
  const id = 'T1514732081550';

  it.skip('申请付款: transfers', async () => {
    const res = await api.transfers({
      partner_trade_no: id,
      openid: config.openid,
      amount: 100,
      desc: '企业付款测试',
    });
    assert.ok(res.return_code === 'SUCCESS');
    assert.ok(res.result_code === 'SUCCESS');
  });

  it.skip('付款查询: transfersQuery', async () => {
    const res = await api.transfersQuery({
      partner_trade_no: id,
    });
    assert.ok(res.return_code === 'SUCCESS');
    assert.ok(res.result_code === 'SUCCESS');
  });
});

describe('红包相关', () => {
  let mch_billno;
  it.skip('普通红包: sendRedpack', async () => {
    const res = await api.sendRedpack({
      mch_autono: Math.random().toString().substr(2, 10),
      send_name: '商户名称',
      re_openid: config.openid,
      total_amount: 100,
      wishing: '大吉大利，今晚吃鸡',
      act_name: '测试红包',
      remark: '无',
    });
    assert.ok(res.return_code === 'SUCCESS');
    assert.ok(res.result_code === 'SUCCESS');
    ({ mch_billno } = res);
  });

  it.skip('分裂红包: sendGroupRedpack', async () => {
    const res = await api.sendGroupRedpack({
      mch_autono: Math.random().toString().substr(2, 10),
      send_name: '商户名称',
      re_openid: config.openid,
      total_amount: 300,
      total_num: 3,
      wishing: '大吉大利，今晚吃鸡',
      act_name: '测试红包',
      remark: '无',
    });
    assert.ok(res.return_code === 'SUCCESS');
    assert.ok(res.result_code === 'SUCCESS');
  });

  it.skip('红包查询: redpackQuery', async () => {
    const res = await api.redpackQuery({
      mch_billno: `${config.mchid}201801028986462339`,
    });
    assert.ok(res.return_code === 'SUCCESS');
    assert.ok(res.result_code === 'SUCCESS');
  });
});
