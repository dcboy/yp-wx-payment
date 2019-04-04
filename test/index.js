/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const WxPayment = require('../src/wx-payment');
const cert = require('../config/cert');

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


const api = new WxPayment(config, true);

describe('小微商户', () => {
  it.skip('获取证书', async () => {
    const res = await api.getCertficates();
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
      cert_sn: cert.serial_no,
      business_code: (new Date()).getTime(),
    }, cert.certificate);
    console.log(res);
    assert.ok(res.return_code === 'SUCCESS');
  });

  it.skip('小微商户-提交升级', async () => {
    const res = await api.applymentMicroSubmitUpgrade({
      cert_sn: cert.serial_no,
      sub_mch_id: '1900000109',
      organization_type: '4',
      business_license_copy: 'OIkiPwZjCl9dJ55LJOJl9tGjgIzicsoLHqCAUy83DP5siDRKUpplVd-elsiR-mskppOPXEhEDDofVsMxvvkZN9BAlp70ocOZt9wzYTlCZ5w',
      business_license_number: '123456789012345',
      merchant_name: '深圳腾讯科技有限公司',
      company_address: '深圳市腾讯大厦',
      legal_person: '张学友',
      business_time: '["2010-01-01","长期"]',
      business_licence_type: '1762',
      business: '0.6%',
      business_scene: '[1721]',
    }, cert.certificate);
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
});

describe('刷脸支付', () => {
  it.skip('刷脸authinfo', async () => {
    const res = await api.facepayAuthInfo({
      store_id: '123',
      store_name: '123',
      device_id: '123',
      rawdata: '3bvvkL2zeNNKpX0hloVk09wmvjGMVl2Pe7F7uU795FvHMxmWFqosNGDFUlxtTxdnYxUJWH+3aIsWq+ab1qltSkJzxhVgVEdGE/+xbUNn9hMacjdY4Ji3aDl1l8nC1OM9lb8jP9S2/xJR9o1Bk+8M1uLmS7iohFAZpEzgRetgs5GWFp/E1anibLfY3zkfLsbwkZuNbDUH2zo/n9yTHfm20QFwxfpWWswML0W77imqJFTABJlgHWnYZUnK+mtixKgTwpKdv4qwz9IfSsAsOfDiK1B+xa/iFfE+v8PgyYv7alGvj+kY83YVQqQ5hZzU/pr/HbAEpKam8QqRiPz3Y8Q3XkI2SjFM1g/uJdmFHS8EatGIWtshkczVrlkeWNntAnjb/jMoeCAKQoEYRl6SdHVbQbxqfArQKXe/gADWC1bmDvU2sa4cA4gwOXGUyw==',
      sub_mch_id: config.sub_mchid,
      mch_id: config.mchid,
      now: Math.round((new Date()).getTime() / 1000),
    });
    console.log(res);
    assert.ok(res.return_code === 'SUCCESS');
  });

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
  it.skip('刷脸支付', async () => {
    const res = await api.facepay({
      openid: 'oA0rgwVzjab4kgOuysZ0KMOEwN-8',
      sub_mch_id: config.sub_mchid,
      spbill_create_ip: '127.0.0.1',
      total_fee: 1,
      body: '商品名称',
      face_code: 'f7444e21-51be-4c5c-a204-abc022b0fdec',
      out_trade_no: '123-cc',
    });
    console.log('facepay', res);
    assert.ok(res.return_code === 'SUCCESS');
    assert.ok(res.result_code === 'SUCCESS');
  });
});

describe('订单相关', () => {
  const id = Date.now();
  const notify_url = 'http://d9b274dd.ngrok.io';

  it.skip('获取unionid', async () => {
    const res = await api.queryUnionID({
      out_trade_no: 'OD190313141329523958',
      openid: config.openid,
      mch_id: config.mchid,
      sub_mch_id: config.sub_mchid,
    });
    console.log(res);
    assert.ok(res.return_code === 'SUCCESS');
  });


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
