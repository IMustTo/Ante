<template>
<div class="page">
  <bottom-fix>
    <cell-wapper>
      <cell-access name="学生"
        v-if="children.length > 1"
        :caption="student.studentName"
        @tapEvt="selectStd">
      </cell-access>
      <cell-base name="学生"
        v-if="children.length < 2"
        :caption="student.studentName">
      </cell-base>

      <weui-input name="星星名称" holder="给星星起个名字吧" @inputEvt="nameStar">
      </weui-input>

      <cell-base name="上传标志">
        <pick-img-btn slot="desc"
          :bgimg="image.attachmentUrl"
          @tapEvt="selectImg"></pick-img-btn>
      </cell-base>
    </cell-wapper>

    <cell-title title="评价标准"></cell-title>
    <cell-wapper>
      <template v-for="(item, index) in benchmarks">
        <input-delete
          holder="请输入一条评价标准"
          @tapEvt="deleteBenchmark"
          @inputEvt="inputBenchmark"
          :index="index"
          :canDelete="item.canDelete">
        </input-delete>
      </template>

      <cell-base name="增加一条" @tapEvt="addBenchmark">
        <pick-img-btn slot="icon" mini></pick-img-btn>
        <span slot="icon">&nbsp;</span>
      </cell-base>
    </cell-wapper>

    <cell-title title="创建原因"></cell-title>
    <cell-wapper>
      <input-delete holder="请输入创建这颗星星的原因"
        @inputEvt="addReason">
      </input-delete>
    </cell-wapper>
    <cell-title tip>经过相关老师审批通过才能生效</cell-title>

    <area-center slot="bottom">
      <weui-btn mini
        :disabled="!canCreate"
        @tapEvt="create">申请创建</weui-btn>
    </area-center>
  </bottom-fix>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BottomFix from '../components/layout/BottomFix';
import AreaCenter from '../components/area/AreaCenter';
import WeuiInput from '../components/input/WeuiInput';
import InputDelete from '../components/input/InputDelete';
import PickImgBtn from '../components/button/PickImgBtn';
import uploadImg from '../mixins/uploadImg';

export default {
  name: 'custom-star',
  components: {
    AreaCenter,
    BottomFix,
    WeuiInput,
    InputDelete,
    PickImgBtn,
  },

  mixins: [uploadImg],

  data() {
    return {
      // 星星名字
      starName: '',
      // 自定义图片
      image: {},
      // 评价标准
      benchmarks: [
        { value: '' },
      ],
      // 创建原因
      reason: '',
    };
  },

  computed: {
    ...mapGetters({
      student: 'getCheckedChild',
      children: 'getChildren',
    }),

    // 检查是否符合创建条件
    canCreate() {
      return (
        this.student.orgId &&
        this.starName &&
        this.benchmarks.some(item => item.value) &&
        this.reason
      );
    },
  },

  created() {
    // 第一次进入查询孩子，设置
    if (!this.children.length) {
      this.loadChild()
        .then(({ resultBean }) => this.initChild(resultBean));
    }
  },

  methods: {
    ...mapActions([
      'showGlobleTip',
      'setChildOrg',
      'checkOneChild',
    ]),

    // 查询孩子
    loadChild() {
      return this.$http.post('system/user/findChildByOperatorId', {
        rootOrgId: WECHAT_CONFIG.currentRootOrgId,
        operatorId: WWW_CONFIG.loginUser.operatorId,
      })
      .then(response => response.json());
    },
    // 首次设置孩子
    initChild(children) {
      this.setChildOrg({ children });
      if (children.length) this.checkOneChild({ child: children[0] });
    },
    // 选择孩子页面
    selectStd() {
      this.$router.push('/SelectMyChild');
    },

    nameStar(value) {
      this.starName = value;
    },

    // 选择星星图片
    selectImg() {
      this.uploadImg({ max: 1 })
        .then(({ resultBean = [] }) => {
          this.image = resultBean[0] || {};
        });
    },

    // 标准
    addBenchmark() {
      this.benchmarks.push({ value: '', canDelete: true });
    },
    deleteBenchmark(index) {
      this.benchmarks.splice(index, 1);
    },
    inputBenchmark(value, index) {
      this.benchmarks[index].value = value;
    },
    // 申请原因
    addReason(value) {
      this.reason = value;
    },

    create() {
      const benchmarks = [];
      this.benchmarks.forEach(item => benchmarks.push(item.value));
      const opt = {
        isReapply: false,
        name: this.starName,
        studentOrgId: this.student.orgId,
        customContentList: benchmarks,
        applyRemark: this.reason,
      };
      if (this.image.id) {
        opt.imageId = this.image.id;
        opt.imageUrl = this.image.attachmentUrl;
      }

      this.$http.post('core/evaluestar/starCustom/createStarCustom', opt)
        .then(res => res.json())
        .then(({ resultCode }) => {
          if (resultCode === 'JSPE-200') {
            this.showGlobleTip('创建自定义星成功，已提交评星委员会进行审核，请耐心等待审核结果！');
            this.$router.go(-1);
          }
        });
    },
  },
};
</script>
