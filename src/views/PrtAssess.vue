<template>
<div class="page">
  <bottom-fix>
    <cell-wapper>
      <cell-access name="学生" :caption="student.name"></cell-access>
    </cell-wapper>
    <cell-title title="家庭评价"></cell-title>
    <cell-wapper>
      <template v-for="star in items">
        <star-item
          @changeEvt="change"
          :id="star.id"
          :desc="star.desc">
        </star-item>
      </template>
    </cell-wapper>

    <cell-title tip>每个家庭每个评价周期可以给自己家孩子评5颗星，剩余{{ maxStar }}颗星</cell-title>

    <weui-toast v-if="showSuc">评价成功</weui-toast>

    <area-center slot="bottom">
      <weui-btn mini
        :disabled="!canSubmit"
        @tapEvt="tipSuccess">提交</weui-btn>
    </area-center>
  </bottom-fix>
</div>
</template>

<script>
import BottomFix from '../components/layout/BottomFix';
import AreaCenter from '../components/area/AreaCenter';
import CellTitle from '../components/cell/CellTitle';
import CellWapper from '../components/cell/CellWapper';
import CellAccess from '../components/cell/CellAccess';
import StarItem from '../components/list/StarItem';
import WeuiToast from '../components/toast/WeuiToast';
import WeuiBtn from '../components/button/WeuiBtn';

export default {
  name: 'prt-assess',
  components: {
    BottomFix,
    AreaCenter,
    CellTitle,
    CellWapper,
    CellAccess,
    StarItem,
    WeuiToast,
    WeuiBtn,
  },

  data() {
    return {
      student: {
        name: '昂小明',
        id: 1,
      },

      items: [
        { id: 1, desc: '生活自理', checked: false },
        { id: 2, desc: '讲究卫生', checked: false },
        { id: 3, desc: '分担家务', checked: false },
        { id: 4, desc: '生活规律', checked: false },
      ],

      maxStar: 2,

      showSuc: false,
    };
  },

  computed: {
    canSubmit() {
      return (
        this.student.id &&
        this.items.some(item => item.checked) &&
        this.items.filter(item => item.checked).length <= this.maxStar
      );
    },
  },

  methods: {
    change(id, checked) {
      this.items.some((item, i) => {
        if (item.id === id) {
          this.items[i].checked = checked;
          return true;
        }

        return false;
      });
    },

    tipSuccess() {
      this.$router.replace('/AssessSuc');
    },
  },
};
</script>

<style>

</style>