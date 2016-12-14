<template>
<div class="page">

  <bottom-fix>
    <cell-wapper>
      <cell-base name="周期" :caption="zhouqi"></cell-base>
      <cell-access name="评价类型"
        @tapEvt="selectType"
        :caption="checkedType.name"></cell-access>
    </cell-wapper>

    <cell-wapper>
      <cell-access name="组织"
        @tapEvt="$router.push('/SelectClass')"
        :caption="currClass.name"></cell-access>
    </cell-wapper>

    <avatar-list v-if="students && students.length">
      <template v-for="(item, index) in students">
        <avatar-item
          @changeEvt="checkAvatar"
          :check="item.check"
          :id="index"
          :name="item.name"
          :avatar="item.avatar">
        </avatar-item>
      </template>
    </avatar-list>
  
    <area-center slot="bottom">
      <weui-btn mini plain
        @tapEvt="selectAll"><i class="ante-icon-inbtn"
          :class="checkAllBtnCls"></i>&emsp;全选</weui-btn>
      <weui-btn mini :disabled="!canAssess" @tapEvt="showSliderPage">评价</weui-btn>
    </area-center>
  </bottom-fix>

  <transition
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideOutRight">
    <router-view></router-view>
  </transition>

  <action-sheet
    v-show="showAction"
    @tapItem="tapTypeItem"
    @cancel="cancelAction"
    :sheets="typeNameArr">
  </action-sheet>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BottomFix from '../components/layout/BottomFix';
import RightSlider from '../components/layout/RightSlider';

import AreaBase from '../components/area/AreaBase';
import AreaCenter from '../components/area/AreaCenter';

import AvatarList from '../components/list/AvatarList';
import AvatarItem from '../components/list/AvatarItem';
import CellGroup from '../components/cell/CellGroup';
import { dateFormat } from '../utils';

export default {
  name: 'tch-assess',

  components: {
    AreaBase,
    AreaCenter,
    AvatarList,
    AvatarItem,
    BottomFix,
    RightSlider,
    CellGroup,
  },

  data() {
    return {
      zhouqi: dateFormat(new Date(), 'yyyy年MM月'),
      // 是否显示actionsheet
      showAction: false,

      // 缓存学生列表，不每次都查了
      cacheStds: {},

      // 所有学生
      students: [],

      // 选中的学生
      checkedAvatar: [],

      // 是否显示评价项页
      showSlider: false,
    };
  },

  computed: {
    // 评价类型
    ...mapGetters({
      checkedType: 'getCheckedAssess',
      assessTypes: 'getAssessType',
      checkedClass: 'getCheckedClass',
      checkedStudents: 'getCheckedStudents',
    }),

    // 评价类型名字
    typeNameArr() {
      const arr = [];
      this.assessTypes.forEach((item) => {
        arr.push(item.name);
      });
      return arr;
    },

    // 当前班级
    currClass() {
      let cls = {};

      if (this.checkedClass.id) {
        cls = this.checkedClass;
        this.checkedAvatar = [];
      }

      return cls;
    },

    checkAllBtnCls() {
      const checked = !!(this.students.length &&
        (this.checkedAvatar.length === this.students.length));

      return {
        'weui-icon-success': checked,
        'weui-icon-circle': !checked,
      };
    },

    canAssess() {
      return !!(this.students.length && this.checkedAvatar.length);
    },
  },

  created() {
    // 当前页面刷新重新查询 评价类型
    if (!this.assessTypes.length) {
      this.loadTypes();
    }

    if (!this.checkedClass || !this.checkedClass.id) {
      this.loadDefaultOrg();
    }
  },

  methods: {
    ...mapActions([
      'setAssessType',
      'checkAssessType',
      'checkOneClass',
      'setCheckedStudents',
    ]),

    // 查询类型
    loadTypes() {
      this.$http
        .post('core/evaluestar/standard/findTypeAndNameByEvalueType',
          { evalueType: 101 })
        .then(response => response.json())
        .then(({ resultBean }) => {
          this.setAssessType({ types: resultBean });
          this.checkAssessType({ id: this.$route.params.id });
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
      const id = this.assessTypes[i].type;
      this.$router.replace(`/TchAssess/${id}`);
    },

    // 查询默认班级
    loadDefaultOrg() {
      this.$http
        .post('core/evaluestar/findDefaultOrg')
        .then(response => response.json())
        .then(({ resultBean }) => {
          const org = {
            name: resultBean.orgName || '',
            id: resultBean.orgId || 0,
          };
          this.checkOneClass({ org });
        });
    },
    // 查询班级下的学生
    loadStudents(orgIdList) {
      if (this.cacheStds[orgIdList]) {
        this.students = this.cacheStds[orgIdList];

        this.students.map((item) => {
          item.check = false;
          return item;
        });
      } else {
        this.$http
          .post('system/user/findChildByOrgIds', { orgIdList })
          .then(response => response.json())
          .then(({ resultBean }) => {
            resultBean.map((item) => {
              item.name = item.studentName;
              item.id = item.orgId;

              return item;
            });

            this.students = resultBean;
            this.cacheStds[orgIdList] = resultBean;
          });
      }
    },
    // 选中一个小哥
    checkAvatar(index, value) {
      this.students[index].check = value;
      const { id } = this.students[index];

      if (value) {
        this.checkedAvatar.push(id);
      } else {
        const i = this.checkedAvatar.indexOf(id);
        this.checkedAvatar.splice(i, 1);
      }

      this.setCheckedStudents({ students: this.checkedAvatar });
    },
    // 全选
    selectAll() {
      let check = true;
      if (this.students.length === this.checkedAvatar.length) {
        check = false;
      }

      this.checkedAvatar = [];
      this.students.forEach(({ id }, index) => {
        this.students[index].check = check;

        if (check) this.checkedAvatar.push(id);
      });

      this.setCheckedStudents({ students: this.checkedAvatar });
    },
    // 显示评价页
    showSliderPage() {
      this.showSlider = this.$router.push({ name: 'slider' });
    },
  },

  // 切换路由params更改状态
  beforeRouteEnter(to, from, next) {
    next(vm => vm.checkAssessType({ id: to.params.id }));
  },
  watch: {
    $route(to) {
      this.checkAssessType({ id: to.params.id });
    },

    // 更改班级重新查询学生
    checkedClass({ id }) {
      this.loadStudents(id);
    },
  },
};
</script>

<style scoped>
.ante-icon-inbtn {
  font-size: 14px;
  position: absolute;
  left: 10px;
  top: 7px;
}
</style>