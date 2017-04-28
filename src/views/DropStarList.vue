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
  </cell-wapper>
</div>
</template>

<script>
import StarIcon from '../components/star/StarIcon';
import { dateFormat } from '../utils';
import { StarNameMap, StarCodeMap, ColorNumMap } from '../utils/starsMap';

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
      if (Number(this.$route.params.id)) {
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
      } else {
        this.prtLoadList().then(({ resultBean: { resultList } }) => {
          this.records = resultList.map((item) => {
            const { type, qty, createTime, starType, colorNum = 1 } = item;

            item.name = type === '116'
              ? `${item.customStarName} - ${qty}`
              : `${StarNameMap[type]} - ${qty}`;
            item.date = dateFormat(new Date(createTime), 'yyyy年MM月dd日 hh:mm');

            if (starType === '101') {
              item.icon = ColorNumMap[colorNum];
            } else {
              item.icon = StarCodeMap[type];
            }

            return item;
          });
        });
      }
    },

    prtLoadList() {
      return this.$http.post('core/evaluestar/cancelrecord/findCancelRecordsByParentId')
        .then(res => res.json());
    },

    loadList() {
      return this.$http.post('core/evaluestar/cancelrecord/findCancelRecordsByStudentOrg', {
        studentOrg: this.$route.params.id,
        type: this.$route.params.type,
      }).then(res => res.json());
    },

    showRecordDetail(id) {
      if (Number(this.$route.params.id)) {
        this.$router.push(`/DropStarDetail/${id}?isTch=true`);
      } else {
        this.$router.push(`/DropStarDetail/${id}`);
      }
    },
  },

  beforeRouteEnter(to, from, next) {
    next(vm => vm.init());
  },
};
</script>