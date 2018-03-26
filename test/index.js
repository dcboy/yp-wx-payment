const tenpay = require('../lib');
const config = process.env.TESTER == 'travis' ? {
  appid: process.env.appid || '0',
  mchid: process.env.mchid || '0',
  partnerKey: process.env.partnerKey || '0',
  openid: process.env.openid || '0'
} : require('../config');
const api = new tenpay(config);

const assert = require('assert');
describe('订单相关', () => {
  let id = Date.now();
  let notify_url = '';

  it.skip('H5/小程序支付参数(自动下单): getPayParams', async () => {
    let res = await api.getPayParams({
      out_trade_no: id,
      body: '商品简单描述',
      total_fee: 100,
      notify_url: notify_url,
      openid: config.openid
    });
    console.log('getPayParams', res);
    let keys = ['appId', 'timeStamp', 'nonceStr', 'package', 'signType', 'paySign', 'timestamp'];
    assert.deepEqual(Object.keys(res), keys);
  });

  it.skip('APP支付参数(自动下单): getAppParams', async () => {
    let res = await api.getAppParams({
      out_trade_no: id,
      body: '商品简单描述',
      total_fee: 100,
      notify_url: notify_url,
    });
    let keys = ['appid', 'partnerid', 'prepayid', 'package', 'noncestr', 'timestamp', 'sign'];
    assert.deepEqual(Object.keys(res), keys);
  });

  it('统一下单: unifiedOrder', async () => {
    let res = await api.unifiedOrder({
      out_trade_no: id,
      body: '商品简单描述',
      total_fee: 100,
      notify_url: notify_url,
      openid: config.openid
    });
    console.log('unifiedOrder', res);
    assert.ok(res.return_code === 'SUCCESS');
    assert.ok(res.result_code === 'SUCCESS');
  });

  it('H5/小程序支付参数: getPayParamsByPrepay', async () => {
    let res = await api.getPayParamsByPrepay({
      prepay_id: id
    });
    console.log('getPayParamsByPrepay', res);
    let keys = ['appId', 'timeStamp', 'nonceStr', 'package', 'signType', 'paySign', 'timestamp'];
    assert.deepEqual(Object.keys(res), keys);
  });

  it.skip('APP支付参数: getAppParamsByPrepay', async () => {
    let res = await api.getAppParamsByPrepay({
      prepay_id: id
    });
    let keys = ['appid', 'partnerid', 'prepayid', 'package', 'noncestr', 'timestamp', 'sign'];
    assert.deepEqual(Object.keys(res), keys);
  });

  it('生成扫码支付(模式一)URL: getNativeUrl', async () => {
    let url = api.getNativeUrl({
      product_id: '88888'
    });
    console.log('getNativeUrl', url);
    assert.ok(url);
  });

  it('订单查询: orderQuery', async () => {
    let res = await api.orderQuery({
      out_trade_no: id
    });
    console.log('orderQuery', res);
    assert.ok(res.return_code === 'SUCCESS');
    assert.ok(res.result_code === 'SUCCESS');
  });

  it('关闭订单: closeOrder', async () => {
    let res = await api.closeOrder({
      out_trade_no: id
    });
    console.log('closeOrder', res);
    assert.ok(res.return_code === 'SUCCESS');
    assert.ok(res.result_code === 'SUCCESS');
  });
});

describe('退款相关', () => {
  it.skip('申请退款: refund', async () => {
    let res = await api.refund({
      out_trade_no: '1711185583256741',
      out_refund_no: 'REFUND_1711185583256741',
      total_fee: 1,
      refund_fee: 1
    });
    assert.ok(res.return_code === 'SUCCESS');
    assert.ok(res.result_code === 'SUCCESS');
  });

  it.skip('退款查询: refundQuery - out_trade_no', async () => {
    let res = await api.refundQuery({
      out_trade_no: '1711185583256741'
    });
    assert.ok(res.return_code === 'SUCCESS');
    assert.ok(res.result_code === 'SUCCESS');
  });

  it.skip('退款查询: refundQuery - out_refund_no', async () => {
    let res = await api.refundQuery({
      out_refund_no: 'REFUND_1711185583256741'
    });
    assert.ok(res.return_code === 'SUCCESS');
    assert.ok(res.result_code === 'SUCCESS');
  });
});

describe('企业付款相关', () => {
  let id = 'T1514732081550';

  it.skip('申请付款: transfers', async () => {
    let res = await api.transfers({
      partner_trade_no: id,
      openid: config.openid,
      amount: 100,
      desc: '企业付款测试'
    });
    assert.ok(res.return_code === 'SUCCESS');
    assert.ok(res.result_code === 'SUCCESS');
  });

  it.skip('付款查询: transfersQuery', async () => {
    let res = await api.transfersQuery({
      partner_trade_no: id
    });
    assert.ok(res.return_code === 'SUCCESS');
    assert.ok(res.result_code === 'SUCCESS');
  });
});

describe('红包相关', () => {
  let mch_billno;
  it.skip('普通红包: sendRedpack', async () => {
    let res = await api.sendRedpack({
      mch_autono: Math.random().toString().substr(2, 10),
      send_name: '商户名称',
      re_openid: config.openid,
      total_amount: 100,
      wishing: '大吉大利，今晚吃鸡',
      act_name: '测试红包',
      remark: '无'
    });
    assert.ok(res.return_code === 'SUCCESS');
    assert.ok(res.result_code === 'SUCCESS');
    mch_billno = res.mch_billno;
  });

  it.skip('分裂红包: sendGroupRedpack', async () => {
    let res = await api.sendGroupRedpack({
      mch_autono: Math.random().toString().substr(2, 10),
      send_name: '商户名称',
      re_openid: config.openid,
      total_amount: 300,
      total_num: 3,
      wishing: '大吉大利，今晚吃鸡',
      act_name: '测试红包',
      remark: '无'
    });
    assert.ok(res.return_code === 'SUCCESS');
    assert.ok(res.result_code === 'SUCCESS');
  });

  it.skip('红包查询: redpackQuery', async () => {
    let res = await api.redpackQuery({
      mch_billno: config.mchid + '201801028986462339'
    });
    assert.ok(res.return_code === 'SUCCESS');
    assert.ok(res.result_code === 'SUCCESS');
  });
});
