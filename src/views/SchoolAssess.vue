<template>
<div class="page">
  <bottom-fix>
    <cell-wapper>
      <cell-base name="学生" :caption="studentName">
      </cell-base>
    </cell-wapper>
    <cell-title title="校园评价"></cell-title>
    <cell-wapper>
      <template v-for="star in items">
        <star-item
          @changeEvt="change"
          :id="star.id"
          :desc="star.content">
        </star-item>
      </template>
    </cell-wapper>

    <area-center slot="bottom">
      <weui-btn mini
        :disabled="!canSubmit"
        @tapEvt="submit">提交</weui-btn>
    </area-center>
  </bottom-fix>
</div>
</template>

<script>
import BottomFix from '../components/layout/BottomFix';
import AreaCenter from '../components/area/AreaCenter';
import StarItem from '../components/list/StarItem';

export default {
  name: 'school-assess',
  components: {
    BottomFix,
    AreaCenter,
    StarItem,
  },

  data() {
    return {
      type: '',
      id: '',
      studentName: '',

      items: [
        // { id: 1, content: '生活自理', checked: false },
        // { id: 2, content: '讲究卫生', checked: false },
        // { id: 3, content: '分担家务', checked: false },
        // { id: 4, content: '生活规律', checked: false },
      ],

      showSuc: false,
    };
  },

  computed: {
    canSubmit() {
      return this.items.some(item => item.checked);
    },
  },

  methods: {
    init() {
      this.loadStudentByID();
      this.loadAssessItems();
    },

    loadStudentByID() {
      this.$http.get(`system/org/findById/${this.id}`)
        .then(res => res.json())
        .then(({ resultBean }) => {
          this.studentName = resultBean.orgName || '';
        });
    },

    // 查询点评项
    loadAssessItems() {
      this.$http
        .post('core/evaluestar/standard/findList', {
          evalueType: this.$route.params.type,
        })
        .then(response => response.json())
        .then(({ resultBean = [] }) => {
          this.items = resultBean.map((item) => {
            item.checked = false;
            return item;
          });
        });
    },

    // 选择一颗星星
    change(id, checked) {
      this.items.some((item, i) => {
        if (item.id === id) {
          this.items[i].checked = checked;
          return true;
        }

        return false;
      });
    },

    // 提交评价
    submit() {
      const starItems = [];
      this.items.forEach((item) => {
        if (item.checked) {
          starItems.push(item.id);
        }
      });

      this.$http.post('core/evaluestar/saveEvalueStar', {
        standardIdList: starItems,
        studentOrgList: this.id,
      })
      .then(res => res.json())
      .then(({ resultCode }) => {
        if (resultCode === 'JSPE-200') {
          this.$router.replace('/AssessSuc');
        }
      });
    },
  },

  // 切换路由params更改状态
  beforeRouteEnter(to, from, next) {
    const { type, id } = to.params;

    next((vm) => {
      vm.type = type;
      vm.id = id;
      vm.init();
    });
  },
};
</script>
