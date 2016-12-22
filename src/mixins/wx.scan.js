export default {
  methods: {
    scanQrcode(needResult = 0) {
      return new Promise((resolve, reject) => {
        try {
          wx.scanQRCode({
            desc: '请扫描二维码',
            needResult,
            scanType: ['qrCode'], // 可以指定扫二维码还是一维码，默认二者都有
            success(res) {
              resolve(res);
            },
            error(res) {
              reject(res);
            },
          });
        } catch (e) {
          reject(e);
        }
      });
    },
  },
};
