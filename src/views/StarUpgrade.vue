<template>
  <div class="page">
    <cell-wapper>
      <cell-access v-if="exFc" name="我要兑换"
        @tapEvt="selectType"
        :caption="star.name || 请选择">
      </cell-access>

      <cell-base v-if="!exFc" name="我要兑换" :caption="star.name">
      </cell-base>
    </cell-wapper>

    <cell-title title="兑换说明" v-show="star.icon"></cell-title>
    <cell-wapper v-show="star.icon">
      <div class="ante-icon-wapper">
        <star-large-icon :icon="star.icon"></star-large-icon>
      </div>
      <div class="ante-star-condition" v-html="star.exchangeRule"></div>
      <div class="ante-star-desc" v-html="starCountDesc"></div>
    </cell-wapper>

    <div v-show="type==='103'">
      <cell-title title="身心健康"></cell-title>
      <cell-wapper>
        <template v-for="(item, index) in sxjk">
          <cell-num
            @reduce="reduceSxjk"
            @increase="increaseSxjk"
            :i="index"
            :num="item.num"
            :max="item.max"
            :min="item.min"
            :name="item.name">
          </cell-num>
        </template>
      </cell-wapper>

      <cell-title title="品格情怀"></cell-title>
      <cell-wapper>
        <template v-for="(item, index) in pgqh">
          <cell-num
            @reduce="reducePgqh"
            @increase="increasePgqh"
            :i="index"
            :num="item.num"
            :max="item.max"
            :min="item.min"
            :name="item.name">
          </cell-num>
        </template>
      </cell-wapper>

      <cell-title title="创新思维"></cell-title>
      <cell-wapper>
        <template v-for="(item, index) in cxsw">
          <cell-num
            @reduce="reduceCxsw"
            @increase="increaseCxsw"
            :i="index"
            :num="item.num"
            :max="item.max"
            :min="item.min"
            :name="item.name">
          </cell-num>
        </template>
      </cell-wapper>

      <cell-title title="审美雅趣"></cell-title>
      <cell-wapper>
        <template v-for="(item, index) in smyq">
          <cell-num
            @reduce="reduceSmyq"
            @increase="increaseSmyq"
            :i="index"
            :num="item.num"
            :max="item.max"
            :min="item.min"
            :name="item.name">
          </cell-num>
        </template>
      </cell-wapper>

      <cell-title title="人文表达"></cell-title>
      <cell-wapper>
        <template v-for="(item, index) in rwbd">
          <cell-num
            @reduce="reduceRwbd"
            @increase="increaseRwbd"
            :i="index"
            :num="item.num"
            :max="item.max"
            :min="item.min"
            :name="item.name">
          </cell-num>
        </template>
      </cell-wapper>

      <cell-title title="自定义星" v-if="zdyx.length"></cell-title>
      <cell-wapper v-if="zdyx.length">
        <template v-for="(item, index) in zdyx">
          <cell-num
            @reduce="reduceZdyx"
            @increase="increaseZdyx"
            :i="index"
            :num="item.num"
            :max="item.max"
            :min="item.min"
            :name="item.name">
          </cell-num>
        </template>
      </cell-wapper>
      <cell-title warn v-show="silverExTip"><span class="ante-warn-word">{{ silverExTip }}</span></cell-title>
    </div>

    <p class="weui-btn-area">
      <weui-btn name="兑换" :disabled="!canEx" @tapEvt="exchange"></weui-btn>
    </p>

    <weui-toast v-if="showSuc">兑换成功</weui-toast>

    <action-sheet
      v-show="showAction"
      @tapItem="tapTypeItem"
      @cancel="cancelAction"
      :sheets="starNameArr">
    </action-sheet>
  </div>
</template>

<script>
import StarLargeIcon from '../components/star/StarLargeIcon';
import CellNum from '../components/cell/CellNum';
import starRecords from '../mixins/starRecords';

const StarMap = {
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
  116: 'zdy',
  117: 'silver',
  118: 'all',
  119: 'gold',
};


export default {
  name: 'star-upgrade',
  components: {
    StarLargeIcon,
    CellNum,
  },
  mixins: [starRecords],

  data() {
    return {
      type: '', // 大类
      miniType: '', // 小类
      orgId: '',
      star: { name: '请选择' },

      // 风采星列表 102
      starList: [],
      starNameArr: [],

      // 自己拥有的星星
      starCount: {},
      starCountDesc: '',

      // 身心健康
      sxjk: [],
      // 品格情怀
      pgqh: [],
      // 创新思维
      cxsw: [],
      // 审美雅趣
      smyq: [],
      // 人文表达
      rwbd: [],
      // 自定义星
      zdyx: [
        // { code: '116', name: '自定义星', num: 0, max: 0, min: 0 },
      ],

      fengcaiCount: 0,

      // 是否可兑换
      canEx: false,

      showAction: false,
      showSuc: false,
    };
  },

  computed: {
    lackArr() {
      const arr = [];

      [
        { code: 'sxjk', name: '身心健康' },
        { code: 'pgqh', name: '品格情怀' },
        { code: 'cxsw', name: '创新思维' },
        { code: 'smyq', name: '审美雅趣' },
        { code: 'rwbd', name: '人文表达' },
      ].forEach((dalei) => {
        if (!this[dalei.code].some(item => item.num)) {
          arr.push(dalei.name);
        }
      });

      return arr;
    },

    // 不能兑换银星的提示
    silverExTip() {
      let tip = '';
      if (this.lackArr.length) {
        tip = `缺少“${this.lackArr.join('、')}”素养的风采星，五大素养每一类至少要有一颗`;
      } else {
        tip = this.fengcaiCount > 8 ? '选择的数量太多' : '';
      }

      return tip;
    },

    exFc() {
      return this.type === '102';
    },
  },

  methods: {
    initConfig() {
      this.type = ''; // 大类
      this.miniType = ''; // 小类
      this.orgId = '';
      this.star = { name: '请选择' };
      this.starList = [];
      this.starNameArr = [];
      this.starCount = {};
      this.starCountDesc = '';

      // 身心健康
      this.sxjk = [
        { code: '106', name: '箭鱼之星', num: 0, max: 0, min: 0 },
        { code: '107', name: '白鲸之星', num: 0, max: 0, min: 0 },
      ];
      // 品格情怀
      this.pgqh = [
        { code: '108', name: '海豚之星', num: 0, max: 0, min: 0 },
        { code: '109', name: '珊瑚之星', num: 0, max: 0, min: 0 },
        { code: '110', name: '海狮之星', num: 0, max: 0, min: 0 },
        { code: '111', name: '尼莫之星', num: 0, max: 0, min: 0 },
        { code: '112', name: '企鹅之星', num: 0, max: 0, min: 0 },
      ];
      // 创新思维
      this.cxsw = [
        { code: '113', name: '章鱼之星', num: 0, max: 0, min: 0 },
      ];
      // 审美雅趣
      this.smyq = [
        { code: '114', name: '水母之星', num: 0, max: 0, min: 0 },
      ];
      // 人文表达
      this.rwbd = [
        { code: '115', name: '海马之星', num: 0, max: 0, min: 0 },
      ];
      // 自定义星
      this.zdyx = [];
      this.fengcaiCount = 0;
      // 是否可兑换
      this.canEx = false;
      this.showAction = false;
      this.showSuc = false;
    },

    // 查询风采星类型
    loadSubType() {
      this.$http.post('core/evaluestar/seaStar/findSeaStarTypeList', {
        starType: this.type,
      }).then(res => res.json())
      .then(({ resultBean }) => {
        const starNameArr = [];
        this.starList = resultBean.map((item) => {
          item.icon = StarMap[item.code];
          item.exchangeRule = `兑换${item.name}需要<span class="ante-red-word ante-big-word">${item.consumeQty}</span>颗【${item.consumeTypeName}】基础星`;
          starNameArr.push(item.name);
          return item;
        });

        this.starNameArr = starNameArr;
        this.setStarCount();
      });
    },
    selectType() {
      this.showAction = true;
    },
    cancelAction() {
      this.showAction = false;
    },
    tapTypeItem(i) {
      this.cancelAction();
      this.star = this.starList[i];
      this.setStarCountDesc();
    },

    // 设置当前得星数据
    setStarCount() {
      this.loadStarRecords(this.orgId)
        .then(({ resultBean }) => {
          const { starCustom = [], commonStar = {} } = resultBean;
          if (this.type === '103') {
            this.setSilverData(starCustom, commonStar);
          } else {
            this.starCount = commonStar;
            this.setStarCountDesc();
          }
        });
    },
    // 设置当前得星描述，非银星兑换
    setStarCountDesc() {
      if (this.star && this.star.consumeType) {
        const consumeStar = this.starCount[this.star.consumeType] || {}; // 需要消耗的星星
        const leftQty = consumeStar.leftQty || 0;
        const cancelQty = consumeStar.cancelQty || 0;
        const baseStar = this.exFc ? '基础星' : '';

        this.starCountDesc = cancelQty
          ? `( 你的${this.star.consumeTypeName}${baseStar}余额 <span class="ante-red-word">${leftQty}</span> 颗，已撤销${cancelQty}颗 )`
          : `( 你的${this.star.consumeTypeName}${baseStar}余额 <span class="ante-red-word">${leftQty}</span> 颗 )`;

        if (leftQty >= this.star.consumeQty) {
          this.canEx = true;
        }
      }
    },
    // 设置银星兑换星星数
    setSilverData(starCustom, commonStar) {
      let fengcai = 0;
      let cancelFc = 0;
      ['sxjk', 'pgqh', 'cxsw', 'smyq', 'rwbd'].forEach((dalei) => {
        this[dalei].map((item) => {
          const starItem = commonStar[item.code] || {};
          item.max = starItem.leftQty || 0;
          fengcai += item.max;
          cancelFc += (starItem.cancelQty || 0);
          return item;
        });
      });

      this.zdyx = starCustom.map((item) => {
        const { id, name } = item;
        return { id, code: '116', name, num: 0, max: 1, min: 0 };
      });

      this.starCountDesc = cancelFc
        ? `( 你的海洋风采星余额 <span class="ante-red-word">${fengcai}</span> 颗，已撤销${cancelFc}颗 )`
        : `( 你的海洋风采星余额 <span class="ante-red-word">${fengcai}</span> 颗 )`;

      // TODO this.zdyx.map();
    },

    // 身心健康
    reduceSxjk(i) {
      this.sxjk[i].num--;
      this.calcCanExSilver(-1);
    },
    increaseSxjk(i) {
      this.sxjk[i].num++;
      this.calcCanExSilver(1);
    },
    // 品格情怀
    reducePgqh(i) {
      this.pgqh[i].num--;
      this.calcCanExSilver(-1);
    },
    increasePgqh(i) {
      this.pgqh[i].num++;
      this.calcCanExSilver(1);
    },
    // 创新思维
    reduceCxsw(i) {
      this.cxsw[i].num--;
      this.calcCanExSilver(-1);
    },
    increaseCxsw(i) {
      this.cxsw[i].num++;
      this.calcCanExSilver(1);
    },
    // 审美雅趣
    reduceSmyq(i) {
      this.smyq[i].num--;
      this.calcCanExSilver(-1);
    },
    increaseSmyq(i) {
      this.smyq[i].num++;
      this.calcCanExSilver(1);
    },
    // 人文表达
    reduceRwbd(i) {
      this.rwbd[i].num--;
      this.calcCanExSilver(-1);
    },
    increaseRwbd(i) {
      this.rwbd[i].num++;
      this.calcCanExSilver(1);
    },
    // 自定义星
    reduceZdyx(i) {
      this.zdyx[i].num--;
      this.calcCanExSilver(-2);
    },
    increaseZdyx(i) {
      // 自定义星只能加一次
      if (!this.zdyx.some(item => item.num)) {
        this.zdyx[i].num++;
        this.calcCanExSilver(2);
      }
    },

    // 计算可否兑换银星
    calcCanExSilver(increase) {
      this.fengcaiCount += increase;

      if (!this.lackArr.length && this.fengcaiCount === 8) {
        this.canEx = true;
      } else {
        this.canEx = false;
      }
    },

    // 兑换
    exchange() {
      // core/evaluestar/exchange/save
      this.canEx = false;
      const req = {
        type: this.star.code,
        studentOrg: this.orgId,
      };

      // 兑换银星需要传json字符串
      if (this.type === '103') {
        const consumeStar = [];
        ['sxjk', 'pgqh', 'cxsw', 'smyq', 'rwbd', 'zdyx'].forEach((dalei) => {
          this[dalei].forEach((item) => {
            if (item.num) { // 有数量
              if (item.id) { // 自定义星有ID
                consumeStar.push({ id: item.id, type: item.code, qty: item.num });
              } else {
                consumeStar.push({ type: item.code, qty: item.num });
              }
            }
          });
        });

        req.consumeStar = JSON.stringify(consumeStar);
      }

      this.$http.post('core/evaluestar/exchange/save', req)
        .then(res => res.json())
        .then(({ resultCode }) => {
          if (resultCode === 'JSPE-200') {
            this.tipSuc();
          } else {
            this.canEx = true;
          }
        })
        .catch(() => {
          this.canEx = true;
        });
    },

    tipSuc() {
      this.showSuc = true;
      this.timeout = setTimeout(() => {
        this.leave();
      }, 1500);
    },

    // 返回评价选择页
    leave() {
      if (this.timeout) {
        this.showSuc = false;
        clearTimeout(this.timeout);
        this.timeout = null;
      }

      this.$router.go(-1);
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.initConfig();

      vm.type = to.params.type;
      vm.orgId = to.params.id;

      if (to.params.type === '102') {
        vm.star = { name: '请选择' };
        vm.loadSubType();
      } else {
        switch (vm.type) {
          case '103': vm.star = {
            code: '117',
            name: '海洋银星',
            icon: StarMap['117'],
            starType: '103',
            exchangeRule: '兑换海洋银星需要<span class="ante-red-word ante-big-word">8</span>颗海洋风采星 (需要涵盖5大素养)，如果有自定义星则需要<span class="ante-red-word ante-big-word">1</span>颗自定义星加<span class="ante-red-word ante-big-word">6</span>颗海洋风采星',
            consumeType: '102',
            consumeTypeName: '海洋风采星',
            consumeQty: 8,
          };
            break;
          case '104': vm.star = {
            code: '118',
            name: '海洋全能星',
            icon: StarMap['118'],
            starType: '104',
            exchangeRule: '兑换海洋全能星需要<span class="ante-red-word ante-big-word">5</span>颗海洋银星',
            consumeType: '117',
            consumeTypeName: '海洋银星',
            consumeQty: 5,
          };
            break;
          case '105': vm.star = {
            code: '117',
            name: '海洋金星',
            icon: StarMap['119'],
            starType: '105',
            exchangeRule: '兑换海洋金星需要<span class="ante-red-word ante-big-word">5</span>颗海洋全能星',
            consumeType: '118',
            consumeTypeName: '海洋全能星',
            consumeQty: 5,
          };
            break;
          default:
        }
        vm.setStarCount();
      }
    });
  },
};
</script>

<style>
.ante-icon-wapper {
  height: 150px;
  padding: 0 80px;
}
.ante-star-condition {
  color: #666;
  padding: 10px 15px;
}
.ante-star-condition span {
  color: #ff540a;
}
.ante-star-desc {
  color: #666;
  font-size: 12px;
  padding: 0 15px 20px;
}
.ante-big-word {
  font-size: 20px;
}
.ante-warn-word {
  color: red;
}
</style>