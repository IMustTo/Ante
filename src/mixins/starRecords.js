const StarMap = {
  101: 'blue',
  102: 'green',
  103: 'pink',
  104: 'purple',
  105: 'red',
  601: 'yellow',
  // '116': 'fc',
  106: 'jy',
  107: 'bj',
  108: 'ht',
  109: 'sh',
  110: 'hs',
  111: 'nm',
  112: 'qe',
  113: 'zy',
  114: 'sm',
  115: 'hm',
  117: 'silver',
  118: 'all',
  119: 'gold',
};

export default {
  methods: {
    setStarData(studentOrg, isStudentId) {
      return new Promise((resolve, reject) => {
        this.loadStarRecords(studentOrg, isStudentId)
          .then((res) => {
            resolve(this.getStarGroup(res.resultBean || {
              starCustom: [],
              commonStar: {},
            }));
          }).catch(e => reject(e));
      });
    },
    // 查询得星纪录
    loadStarRecords(studentOrg, isStudentId) {
      let url = 'core/evaluestar/studentstar/findByStudentOrg';
      let req = { studentOrg };
      if (isStudentId) {
        url = 'core/evaluestar/studentstar/findByStudentId';
        req = { studentId: studentOrg };
      }

      return this.$http.post(url, req).then(res => res.json());
    },

    // 设置星星数据
    getStarGroup(res) {
      const group = [];
      const haiyang = { stars: [] };
      const fengcai = { title: '海洋风采星', stars: [] };
      const zidingyi = { title: '自定义星', stars: [] };
      const jichu = { title: '基础星', stars: [] };

      const { starCustom, commonStar } = res;
      const starArr = Object.keys(commonStar);
      starArr.forEach((item) => {
        const { starType, type, typeName, leftQty, cancelQty } = commonStar[item];
        const starItem = {
          icon: StarMap[type], name: typeName, count: leftQty, cancel: cancelQty,
        };

        switch (starType) {
          case '102':
            fengcai.stars.push(starItem);
            break;
          case '103':
            haiyang.stars.push(starItem);
            break;
          default: // 101
            jichu.stars.push(starItem);
        }
      });

      starCustom.forEach(item => zidingyi.stars.push({
        icon: 'zdy', name: item.name, count: 1, img: item.imageUrl,
      }));

      if (haiyang.stars.length) {
        group.push(haiyang);
      }
      if (fengcai.stars.length) {
        group.push(fengcai);
      }
      if (zidingyi.stars.length) {
        group.push(zidingyi);
      }
      if (jichu.stars.length) {
        group.push(jichu);
      }

      return group;
    },
  },
};
