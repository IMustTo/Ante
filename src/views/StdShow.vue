<template>
<div class="page">
  <div>
    <div class="ante-star-log">荣誉殿堂</div>
    <avatar-paper :uri="student.avatar"></avatar-paper>
    <div class="ante-std-name">{{ student.studentName }}</div>
    <div class="ante-std-class">{{ student.className }}</div>

    <template v-for="item in group">
      <cell-title :title="item.title" v-if="item.title"></cell-title>
      <cell-wapper>
        <template v-for="(star, index) in item.stars">
          <star-cell
            :id="index"
            :icon="star.icon"
            :name="star.name"
            :count="star.count"
            :cancel="star.cancel">
          </star-cell>
        </template>
      </cell-wapper>
    </template>

    <div class="ante-copyright-bottom">
      <div class="ante-school-name">{{ schoolName }}</div>
      <div class="ante-platform-name">伴行3618智慧校园平台提供技术支持和运营服务</div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import AvatarPaper from '../components/avatar/AvatarPaper';
import StarCell from '../components/star/StarCell';
import starRecords from '../mixins/starRecords';

export default {
  name: 'std-show',
  components: {
    AvatarPaper,
    StarCell,
  },
  mixins: [starRecords],

  data() {
    return {
      group: [],
      schoolName: WWW_CONFIG.currentCorpName,
    };
  },

  computed: {
    ...mapGetters({
      student: 'getHonorPerson',
    }),
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.setStarData(to.params.id, true)
        .then(group => vm.group = group); // eslint-disable-line
    });
  },
};
</script>

<style scoped>
.page {
  text-align: center;
  background-color: #ff7300;
  color: #fff;
}

.page .weui-cells__title {
  text-align: left;
  color: #fff;
}
.page .weui-cells {
  color: #000;
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
  margin: 25px 40px 10px;
  padding: 15px 0;
  border-top: 1px solid #e5d6b0;
  border-bottom: 1px solid #e5d6b0;
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
.ante-copyright-bottom {
  margin: 20px 40px 20px;
}
.ante-school-name {
  padding: 18px 0;
  font-size: 18px;
}
.ante-platform-name {
  font-size: 12px;
}
</style>