<template>
<div class="page">
  <nav-menu :menus="menus" @tapEvt="tapNav"></nav-menu>

  <honor-area>
    <tab-bar :tabbar="tabBar" @tapEvt="changePanel">
      <template v-if="0 === currTab" v-for="item in goldHonor">
        <avatar-cell
          @tapEvt="checkAvatar"
          :id="item.studentId"
          :name="item.studentName"
          :ban="item.className"
          :date="item.date"
          :avatar="item.avatar">
        </avatar-cell>
      </template>

      <template v-if="1 === currTab" v-for="item in allHonor">
        <avatar-cell
          @tapEvt="checkAvatar"
          :id="item.studentId"
          :name="item.studentName"
          :ban="item.className"
          :date="item.date"
          :avatar="item.avatar">
        </avatar-cell>
      </template>

      <template v-if="2 === currTab" v-for="item in silverHonor">
        <avatar-cell
          @tapEvt="checkAvatar"
          :id="item.studentId"
          :name="item.studentName"
          :ban="item.className"
          :date="item.date"
          :avatar="item.avatar">
        </avatar-cell>
      </template>

      <empty-cell v-show="showNoneContent">暂无学生进入该殿堂</empty-cell>
    </tab-bar>
  </honor-area>
</div>
</template>

<script>
import { mapActions } from 'vuex';
import NavMenu from '../components/button/NavMenu';
import HonorArea from '../components/area/HonorArea';
import TabBar from '../components/layout/TabBar';
import AvatarList from '../components/list/AvatarList';
import AvatarCell from '../components/avatar/AvatarCell';
import EmptyCell from '../components/cell/EmptyCell';

export default {
  name: 'honnor-hall',
  components: {
    NavMenu,
    HonorArea,
    TabBar,
    AvatarList,
    AvatarCell,
    EmptyCell,
  },

  data() {
    return {
      termId: 0,
      gradeId: 0,
      menus: [
        { title: '全校', btns: [{ id: 0, name: '全校' }] },
        { title: '全部学期', btns: [{ id: 0, name: '全部学期' }] },
      ],
      currTab: 0,
      // 105金星 104全能星 103银星
      tabBar: ['金星殿堂', '全能星殿堂', '银星殿堂'],


      // {
      //  "studentName": "陈小鑫",
      //  "className": "14级一班",
      //  "createTime": 1481644800000,
      //  "orgSeq": null,
      //  "termId": null,
      //  "studentId": null,
      //  "headPortraitId": null,
      //  "avatar": "http://img.i3618.com.cn/i3618-config/child-avator/boy.png",
      //  "studentSex": "103"
      // }
      goldHonor: [],
      allHonor: [],
      silverHonor: [],
    };
  },

  computed: {
    // 显示为空
    showNoneContent() {
      return (
        (this.currTab === 0 && !this.goldHonor.length) ||
        (this.currTab === 1 && !this.allHonor.length) ||
        (this.currTab === 2 && !this.silverHonor.length)
      );
    },
  },

  created() {
    Promise.all([
      this.loadGrade(),
      this.loadTerm(),
    ]).then(res => this.setMenus(res));

    this.loadHonorList();
  },

  methods: {
    ...mapActions(['setHonorPerson']),

    // 查询年级
    loadGrade() {
      return this.$http
        .post('/system/org/findByRootOrgIdAndType', {
          type: 104,
        }).then(res => res.json());
    },

    // 查询学期
    loadTerm() {
      return this.$http
        .post('core/evaluestar/starStudentTerm/findAllTerm')
        .then(res => res.json());
    },

    // 查询荣誉列表
    loadHonorList() {
      let starType = '105';
      switch (this.currTab) {
        case 1: starType = '104';
          break;
        case 2: starType = '103';
          break;
        default: starType = '105';
      }
      const req = {
        pageSize: 9999,
        currentPage: 1,
        starType,
      };

      if (this.termId) req.termId = this.termId;
      if (this.gradeId) req.orgSeq = this.gradeId;

      return this.$http
        .post('core/evaluestar/starStudentTerm/findStudentHonorList', req)
        .then(res => res.json())
        .then(({ resultBean: { resultList } }) => {
          switch (this.currTab) {
            case 1: this.allHonor = resultList;
              break;
            case 2: this.silverHonor = resultList;
              break;
            default: this.goldHonor = resultList;
          }
        });
    },

    setMenus(res) {
      const grades = res[0].resultBean || [];
      const terms = res[1].resultBean || [];
      this.menus = [
        {
          title: '全校',
          btns: [
            { id: 0, name: '全校', orgSeq: '' },
            ...grades.map(({ orgId, orgSeq, orgName }) => { // eslint-disable-line
              return { id: orgId, orgSeq, name: orgName };
            }),
          ],
        },
        {
          title: '全部学期',
          btns: [{ id: 0, name: '全部学期' }, ...terms],
        },
      ];
    },

    // 点击切换 年级 || 学期
    tapNav(indexId) {
      const [i, id] = indexId.split('_'); // '${i}_${id}'
      const { btns } = this.menus[i];

      btns.some((item) => {
        if (item.id == id) { // eslint-disable-line
          this.menus[i].title = item.name;

          if (i === '0') this.gradeId = item.orgSeq;
          if (i === '1') this.termId = Number(id);
          return true;
        }

        return false;
      });
    },
    // 切换殿堂种类
    changePanel(index) {
      this.currTab = index;
    },

    // 查看个人详细
    checkAvatar(id) {
      let persons = [];
      switch (this.currTab) {
        case 1: persons = this.allHonor;
          break;
        case 2: persons = this.silverHonor;
          break;
        default: persons = this.goldHonor;
      }

      persons.some((item) => {
        if (item.studentId === id) {
          this.setHonorPerson({ student: item });
          return true;
        }
        return false;
      });

      this.$router.push(`/StdShow/${id}`);
    },
  },

  watch: {
    currTab() {
      this.loadHonorList();
    },
    gradeId() {
      this.loadHonorList();
    },
    termId() {
      this.loadHonorList();
    },
  },
};
</script>
