<template>
<div class="page">

  <nav-bar :navbar="navBar" @tapEvt="changePanel">
    <!-- nav-page -->
    <template v-for="(records, index) in recordsArr">
      <cell-wapper v-if="currNav === index">
        <!-- records-list -->
        <template v-for="item in records">
          <cell-access :id="item.id" @tapEvt="showDetail">
            <star-icon slot="icon" :icon="item.icon" :right="8"></star-icon>

            <p>{{ item.name }}
              <status-box :name="item.status" :code="item.statusCode"></status-box>
            </p>
            <p class="ante-cell-desc">{{ item.person }}</p>
            <p class="ante-cell-desc">{{ item.desc }}</p>
          </cell-access>
        </template>

      </cell-wapper>
    </template>

  </nav-bar>

</div>
</template>

<script>
import NavBar from '../components/layout/NavBar';
import StarIcon from '../components/star/StarIcon';
import StatusBox from '../components/status/StatusBox';

export default {
  name: 'tch-approve',
  components: {
    NavBar,
    StarIcon,
    StatusBox,
  },

  data() {
    return {
      currNav: 0,

      navBar: ['全部', '待审批', '已审批'],

      recordsArr: [
        // records
        [
          { id: '1', status: '已通过', statusCode: 'passed', name: '创建申请', person: '王小明（2016级1班）', desc: '呵呵呵呵呵', icon: 'hm' },
          { id: '1', status: '已驳回', statusCode: 'refused', name: '创建申请', person: '王小明（2016级1班）', desc: '呵呵呵呵呵', icon: 'sh' },
          { id: '1', status: '待审批', statusCode: 'pending', name: '创建申请', person: '王小明（2016级1班）', desc: '呵呵呵呵呵', icon: 'qe' },
          { id: '1', status: '待审批', statusCode: 'pending', name: '创建申请', person: '王小明（2016级1班）', desc: '呵呵呵呵呵', icon: 'blue' },
          { id: '1', status: '待审批', statusCode: 'pending', name: '创建申请', person: '王小明（2016级1班）', desc: '呵呵呵呵呵', icon: 'all' },
        ],

        // pending
        [
          { id: '1', status: '待审批', statusCode: 'pending', name: '得星申请', person: '王小明（2016级1班）', desc: '哈哈哈', icon: 'blue' },
          { id: '1', status: '待审批', statusCode: 'pending', name: '得星申请', person: '王小明（2016级1班）', desc: '哈哈哈', icon: 'blue' },
          { id: '1', status: '待审批', statusCode: 'pending', name: '得星申请', person: '王小明（2016级1班）', desc: '哈哈哈', icon: 'blue' },
        ],

        // approved
        [
          { id: '1', status: '已通过', statusCode: 'passed', name: '得星申请', person: '王小明（2016级1班）', desc: '哈哈哈', icon: 'blue' },
          { id: '1', status: '已通过', statusCode: 'passed', name: '得星申请', person: '王小明（2016级1班）', desc: '哈哈哈', icon: 'blue' },
          { id: '1', status: '已驳回', statusCode: 'refused', name: '得星申请', person: '王小明（2016级1班）', desc: '哈哈哈', icon: 'blue' },
        ],
      ],
    };
  },

  methods: {
    showDetail(id) {
      this.$router.push(`/TchAprDtl/${id}`);
      // TODO
    },

    changePanel(index) {
      this.currNav = index;
    },
  },
};
</script>

<style>

</style>