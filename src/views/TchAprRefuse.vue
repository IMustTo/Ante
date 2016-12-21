<template>
<div class="page">
  <cell-title>驳回原因</cell-title>
  <checkbox-group>
    <template v-for="(item, index) in reasons">

      <weui-checkbox
        @changeEvt="selectReason"
        :id="index"
        :check="item.check"
        :name="item.name">

        <textarea class="weui-textarea"
          v-if="!item.name"
          v-model="item.value"
          placeholder="请输入驳回原因"
          rows="2">
        </textarea>
      </weui-checkbox>

    </template>
  </checkbox-group>

  <p class="weui-btn-area">
    <weui-btn :disabled="!canRefuse" name="驳回" @tapEvt="refuse"></weui-btn>
  </p>
</div>
</template>

<script>
import WeuiCheckbox from '../components/input/WeuiCheckbox';
import CheckboxGroup from '../components/input/CheckboxGroup';
import dictionary from '../mixins/dictionary';

export default {
  name: 'tch-apr-refuse',
  components: {
    CheckboxGroup,
    WeuiCheckbox,
  },

  mixins: [dictionary],

  data() {
    return {
      id: '',
      type: '',
      custom_star_cre_reject_remark: null,
      custom_star_get_reject_remark: null,

      reasons: [
        { value: '', check: false },
      ],
    };
  },

  computed: {
    canRefuse() {
      return this.reasons.some(item => (item.check) && (item.name || item.value));
    },
  },

  methods: {
    init() {
      const type = this.type === '101'
        ? 'custom_star_cre_reject_remark'
        : 'custom_star_get_reject_remark';

      if (this[type]) {
        this.setDicData(this[type]);
      } else {
        this.getDicByType(type)
          .then(({ resultBean }) => {
            this[type] = resultBean;
            this.setDicData(resultBean);
          });
      }
    },
    // 设置数据字典数据
    setDicData(res) {
      this.reasons = [{ value: '', check: false }]
        .concat(res.map((item) => { // eslint-disable-line
          return {
            name: item.businName,
            check: false,
          };
        }));
    },

    selectReason(i, checked) {
      if (checked) {
        this.reasons.map((item, index) => {
          if (i !== index) {
            item.check = false;
          } else {
            item.check = true;
          }

          return item;
        });
      } else {
        this.reasons[i].check = false;
      }
    },

    refuse() {
      const reason = this.reasons.filter(item => item.check)[0];
      const status = this.type === '101' ? '103' : '105';

      this.$http.post(`core/evaluestar/starCustom/updateStarCustom/${status}`, {
        id: this.id,
        status,
        remark: reason.value || reason.name,
      }).then(res => res.json())
      .then(({ resultCode }) => {
        if (resultCode === 'JSPE-200') {
          this.$router.replace(`/AprPassSuc/${this.id}`);
        }
      });
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const [id, type] = to.params.id.split('_');
      vm.id = id;
      vm.type = type;

      vm.init();
    });
  },
};
</script>
