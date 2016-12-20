import { StarCodeMap } from '../utils/starsMap';

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
      let goldStar = {};
      let allStar = {};
      let silverStar = {};
      const haiyang = { stars: [] };
      const fengcai = { title: '海洋风采星', stars: [] };
      const zidingyi = { title: '自定义星', stars: [] };
      const jichu = { title: '基础星', stars: [] };

      const { starCustom, commonStar } = res;
      const starArr = Object.keys(commonStar);
      starArr.forEach((item) => {
        const { starType, type, typeName, leftQty, cancelQty } = commonStar[item];
        const starItem = {
          type, icon: StarCodeMap[type], name: typeName, count: leftQty, cancel: cancelQty,
        };

        switch (starType) {
          case '102':
            fengcai.stars.push(starItem);
            break;
          case '103':
            silverStar = starItem;
            break;
          case '104':
            allStar = starItem;
            break;
          case '105':
            goldStar = starItem;
            break;
          default: // 101
            jichu.stars.push(starItem);
        }
      });

      if (goldStar.name) {
        haiyang.stars.push(goldStar);
      }
      if (allStar.name) {
        haiyang.stars.push(allStar);
      }
      if (silverStar.name) {
        haiyang.stars.push(silverStar);
      }

      starCustom.forEach(item => zidingyi.stars.push({
        id: item.id, type: item.type, icon: 'zdy', name: item.name, count: 1, img: item.imageUrl,
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
