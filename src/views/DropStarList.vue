<template>
<div class="page">
  <cell-wapper>
    <cell-access v-for="item in records"
      :id="String(item.id)"
      :name="item.name"
      @tapEvt="showRecordDetail">
      <star-icon slot="icon" :icon="item.icon" :right="8"></star-icon>
      <p class="ante-cell-desc">{{ item.date }}</p>
      <p class="ante-cell-desc">{{ item.cancelReason }}</p>
    </cell-access>
</div>
</template>

<script>
import StarIcon from '../components/star/StarIcon';
import { dateFormat } from '../utils';
import { StarNameMap, StarCodeMap } from '../utils/starsMap';

export default {
  name: 'drop-star-list',

  components: {
    StarIcon,
  },

  data() {
    return {
      records: [],
    };
  },

  methods: {
    init() {
      this.loadList().then(({ resultBean: { resultList } }) => {
        this.records = resultList.map((item) => {
          const { type, qty, createTime, starType } = item;

          item.name = `${StarNameMap[type]} - ${qty}`;
          item.date = dateFormat(new Date(createTime), 'yyyy年MM月dd日 hh:mm');

          if (starType === '101') {
            item.icon = this.$route.query.starIcon;
          } else {
            item.icon = StarCodeMap[type];
          }

          return item;
        });
      });
    },

    loadList() {
      return this.$http.post('core/evaluestar/cancelrecord/findCancelRecordsByStudentOrg', {
        studentOrg: this.$route.params.id,
        type: this.$route.params.type,
      }).then(res => res.json());
    },

    showRecordDetail(id) {
      this.$router.push(`/DropStarDetail/${id}`);
    },
  },

  beforeRouteEnter(to, from, next) {
    next(vm => vm.init());
  },
};
</script>