<template>
<div class="page ante-page-withb">
  <template v-for="list in group">
    <cell-title>{{ list.title }}</cell-title>
    
    <cell-wapper>
      <template v-for="item in list.data">
        <count-item :desc="item.desc" :count="item.count"></count-item>
      </template>
    </cell-wapper>
  </template>
</div>
</template>

<script>
import CountItem from '../components/list/CountItem';

export default {
  name: 'star-record-detail',
  components: {
    CountItem,
  },

  data() {
    return {
      id: '',
      orgId: '',

      group: [
        // {
        //   title: '身心健康',
        //   data: [
        //     { desc: '呵呵呵呵呵', count: '2' },
        //     { desc: '呵呵呵呵呵', count: '3' },
        //   ],
        // },
        // {
        //   title: '品格情怀',
        //   data: [
        //     { desc: '呵呵呵呵呵', count: '2' },
        //     { desc: '呵呵呵呵呵', count: '3' },
        //   ],
        // },
      ],
    };
  },

  methods: {
    loadData() {
      this.$http.post('core/evaluestar/standard/findListByRecordId', {
        recordId: this.id,
        stuOrgId: this.orgId,
      }).then(res => res.json())
      .then(({ resultBean }) => {
        this.setGroupByRes(resultBean);
      });
    },

    setGroupByRes(res) {
      const group = [];
      const typeMap = Object.create(null); // { 101: 0 }, type对应groupItem的index

      res.forEach(({ id, type, name, content }) => {
        if (!isNaN(typeMap[type])) {
          group[typeMap[type]].data.push({ id, desc: content, count: 1 });
        } else {
          // 当前的长度就是下一个的index
          typeMap[type] = group.length;

          group.push({
            title: name,
            data: [{ id, desc: content, count: 1 }],
          });
        }
      });

      this.group = group;
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.orgId = to.params.org;
      vm.id = to.params.id;
      vm.loadData();
    });
  },
};
</script>
