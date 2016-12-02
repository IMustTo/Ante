<template>
<div class="page ante-page-withb">
  <div>
    <div class="ante-star-log">海洋星</div>
    <avatar-paper :uri="detail.avatar"></avatar-paper>
    <div class="ante-std-name">{{ detail.studentName }}</div>
    <div class="ante-std-class">{{ detail.className }}</div>

    <div class="ante-std-stars">
      <div class="ante-std-star-item"
        v-if="detail.studentName">恭喜{{ detail.studentName }}同学获得了{{ detail.starNumCount }}颗星星</div>
      <div class="ante-std-star-item">评价老师：{{ detail.teacherName }}</div>
      <div class="ante-std-star-item">评价周期：{{ zhouqi }}</div>
      <div class="ante-std-star-item">获得原因：</div>
      <div class="ante-std-star-item" v-for="item in detail.standardList">
        &emsp;【{{ item.standardName }}】 {{ item.standardContent }}
      </div>

      <img class="ante-std-star-img"
        src="item.attachmentUrl"
        v-for="item in detail.attachIdList"/>
    </div>

    <div class="ante-copyright-bottom">
      <div class="ante-school-name">{{ detail.schoolName }}</div>
      <div class="ante-platform-name">伴行3618智慧校园平台提供技术支持和运营服务</div>
    </div>
  </div>
</div>
</template>

<script>
import AvatarPaper from '../components/avatar/AvatarPaper';
import { getQueryString, dateFormat } from '../utils';

export default {
  name: 'tch-assess-notice',
  components: {
    AvatarPaper,
  },

  data() {
    return {
      detail: {
        // avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460',
        // schoolName: '爱心小学',
        // attachIdList: null,
        // starNumCount: 1,
        // remark: '阿萨法发',
        // standardList: [{
        //   standardName: '创新思维',
        //   standardContent: '大胆创新，勤于动手，勇于设计，积极参加科技比赛。',
        // }, {
        //   standardName: '创新思维',
        //   standardContent: '善于从生活中发现问题，积极探究，形成课题报告。',
        // }],
        // evalueTime: '1480590713000',
        // studentName: '陈小鑫',
        // className: '14级一班',
        // teacherName: '我是谁a',
      },

    };
  },

  computed: {
    zhouqi() {
      return this.detail.evalueTime
        ? dateFormat(new Date(Number(this.detail.evalueTime)), 'yyyy年MM月')
        : '';
    },
  },

  created() {
    this.loadAssessData();
  },

  methods: {
    loadAssessData() {
      const rootOrgId = getQueryString('rootOrgId');
      const studentId = getQueryString('studentId');
      const recordId = getQueryString('starRecordId');

      this.$http.post('core/evaluestar/findParentMessage', {
        rootOrgId,
        studentId,
        recordId,
      })
      .then(response => response.json())
      .then(({ resultBean = {} }) => {
        this.detail = resultBean;
      });
    },
  },
};
</script>

<style scoped>
.page {
  text-align: center;
  background-color: #63b0ce;
  color: #fff;
}
.page > div {
  padding-top: 120px;
  background-image: url('../assets/images/honor-bg.png');
  background-repeat: no-repeat;
  -webkit-background-size: contain;
  background-size: contain;
  background-position: 0 0;
}
.ante-star-log {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 140px;
  -webkit-background-size: 191px 110px;
  background-size: 191px 110px;
  background-repeat: no-repeat;
  background-position: center center;
  z-index: 1;
  font-size: 26px;
  padding-top: 80px;
  box-sizing: border-box;
  background-image: url('../assets/images/honor-avatar.png');
}
.ante-std-name {
  font-size: 28px;
  font-weight: 700;
  padding: 20px 0 15px;
}
.ante-std-class {
  font-size: 20px;
  line-height: 20px;
}
.ante-std-stars {
  margin: 25px 40px 0;
  padding: 15px 0;
  border-top: 1px solid #b0d6e5;
  border-bottom: 1px solid #b0d6e5;
  text-align: left;
}
.ante-std-star-item {
  font-size: 17px;
}
.ante-high-star {
  color: #fffd00;
  font-size: 20px;
}
.ante-std-stars-no-line {
  border: none;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
}
.ante-school-name {
  padding: 18px 0;
  font-size: 18px;
}
.ante-platform-name {
  font-size: 12px;
}
.ante-std-star-img {
  width: 100%;
}
.ante-std-star-img + .ante-std-star-img {
  margin-top: 10px;
}
</style>