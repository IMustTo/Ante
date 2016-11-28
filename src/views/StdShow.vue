<template>
<div class="page">
  <div class="ante-star-log">荣誉殿堂</div>
  <avatar-paper :uri="avatar"></avatar-paper>
  <div class="ante-std-name">样那男</div>
  <div class="ante-std-class">2016级3班</div>

  <div class="ante-std-stars">
    <div class="ante-std-star-item ante-high-star">全能星&nbsp;x&nbsp;2</div>
    <div class="ante-std-star-item">海马之星&nbsp;x&nbsp;1</div>
    <div class="ante-std-star-item">海马之星&nbsp;x&nbsp;3</div>
    <div class="ante-std-star-item">海马之星&nbsp;x&nbsp;1</div>
    <div class="ante-std-star-item">海马之星&nbsp;x&nbsp;1</div>
  </div>
  <div class="ante-std-stars ante-std-stars-no-line">
    <div class="ante-std-star-item">基础星&nbsp;x&nbsp;87</div>
  </div>

  <div class="ante-copyright-bottom">
    <div class="ante-school-name">青岛市崂山区石老人小学</div>
    <div class="ante-platform-name">伴行3618智慧校园平台提供技术支持和运营服务</div>
  </div>
</div>
</template>

<script>
import AvatarPaper from '../components/avatar/AvatarPaper';

export default {
  name: 'std-show',
  components: {
    AvatarPaper,
  },

  data() {
    return {
      avatar: '//avatars3.githubusercontent.com/u/7122313?v=3&s=460',
    };
  },
};
</script>

<style scoped>
.page {
  padding-top: 120px;
  text-align: center;
  background-color: #ff7300;
  color: #fff;
}
.ante-star-log {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 140px;
  -webkit-background-size: 191px 140px;
  background-size: 191px 140px;
  background-repeat: no-repeat;
  background-position: center center;
  z-index: 1;
  font-size: 26px;
  padding-top: 85px;
  box-sizing: border-box;
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
  margin: 130px 40px 20px;
  border-top: 2px solid #d8a473;
}
.ante-school-name {
  padding: 18px 0;
  font-size: 18px;
}
.ante-platform-name {
  font-size: 12px;
}
</style>