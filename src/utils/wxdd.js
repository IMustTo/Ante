// eslint-disable
// import Vue from 'vue';

export const uploadImage = (options) => {
  wx.chooseImage({
    count: options.max || 9,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success(res) {
      const localIds = res.localIds;
      console.log(localIds);
    },
  });
};

export const test = () => {};
