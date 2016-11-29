<template>
<div class="page">
  <cell-wapper>
    <cell-access name="学生" :caption="student.name"></cell-access>
  </cell-wapper>

  <cell-title>我的自定义星</cell-title>
  <cell-wapper>
    <template v-for="(star, index) in stars">
      <star-cell
        :id="index"
        :icon="star.icon"
        :name="star.name"
        :count="star.count">
      </star-cell>
    </template>
  </cell-wapper>

  <cell-wapper>
    <cell-access name="审批纪录"></cell-access>
  </cell-wapper>

  <p class="weui-btn-area">
    <weui-btn name="创建自定义星" @tapEvt="$router.push('/CustomStar')"></weui-btn>
  </p>
</div>
</template>

<script>
import CellTitle from '../components/cell/CellTitle';
import CellWapper from '../components/cell/CellWapper';
import CellAccess from '../components/cell/CellAccess';
import CellFiller from '../components/cell/CellFiller';
import StarCell from '../components/star/StarCell';
import WeuiBtn from '../components/button/WeuiBtn';

export default {
  name: 'custom-star-assess',
  components: {
    CellTitle,
    CellWapper,
    CellAccess,
    CellFiller,
    StarCell,
    WeuiBtn,
  },

  data() {
    return {
      student: {
        name: '王大明',
        id: 1,
      },

      stars: [
        { icon: 'gold', name: '海洋金星', count: 2 },
        { icon: 'all', name: '海洋全能星', count: 1 },
        { icon: 'silver', name: '海洋银星', count: 1 },
      ],
    };
  },

  methods: {

  },
};
</script>
