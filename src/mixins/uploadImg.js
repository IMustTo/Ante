export default {
  methods: {
    uploadImg({ max = 9 }) {
      return new Promise((resolve) => {
        this.chooseImage({ max }).then((localIds) => {
          const len = localIds.length;
          this.anteLocalIds = localIds;
          this.anteMediaIds = [];

          // 队列传到微信
          this.uploadQueue();
          const ups = setInterval(() => {
            // 都传完了, 传到阿里云
            if (len === this.anteMediaIds.length) {
              this.uploadToAliyun(this.anteMediaIds)
              .then(res => resolve(res));

              clearInterval(ups);
            }
          }, 50);
        });
      });
    },

    // 选取照片
    chooseImage({ max }) {
      return new Promise((resolve, reject) => {
        wx.chooseImage({
          count: max,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success: ({ localIds }) => {
            resolve(localIds);
          },
          error: () => {
            reject();
          },
        });
      });
    },

    // 队列上传至微信
    uploadQueue() {
      const localId = this.anteLocalIds.pop();

      if (localId) {
        this.uploadToWechat(localId).then((mediaId) => {
          this.anteMediaIds.push(mediaId);
          this.uploadQueue();
        });
      }
    },

    // 上传至微信服务器（不能提交数组，也不支持并发！！！）
    uploadToWechat(localId) {
      return new Promise((resolve, reject) => {
        wx.uploadImage({
          localId,
          isShowProgressTips: 0,
          success: ({ serverId }) => {
            resolve(serverId);
          },
          error: (err) => {
            reject(err);
          },
        });
      });
    },

    // 传至阿里云
    uploadToAliyun(mediaId) {
      return new Promise((resolve) => {
        this.$http.get('adapter/attach/uploadWechatFile', {
          params: {
            corpId: WECHAT_CONFIG.currentCorpId,
            agentId: WECHAT_CONFIG.currentAgentId,
            mediaId,
          },
        })
        .then(response => response.json())
        .then((res) => {
          resolve(res);
        });
      });
    },
  },
};
