<template>
<div>
  <ul class="ante-nav-mune">
    <li>
      <div class="ante-nav-mune-curr"
        @click="tapOrg">{{ orgName }}
        <i class="anteicon" :class="orgStatus"></i>
      </div>
    </li>

    <li>
      <div class="ante-nav-mune-curr"
        @click="tapTerm">{{ termName }}
        <i class="anteicon" :class="termStatus"></i>
      </div>
    </li>
  </ul>

  <div class="ante-mask" v-show="displayMask"></div>

  <ul class="ante-nav-mune-inner ante-parent-btns" v-show="displayOrgs">
    <li v-for="(item, index) in orgs"
      :class="{ 'z-has-child': item.cls, 'z-has-checked': item.checked }"
      @click="showChildOrgs(index)">{{ item.name }}</li>
  </ul>

  <ul class="ante-nav-mune-inner ante-child-btns" v-show="displayChildOrgs">
    <li v-for="item in childOrgs" 
      @click="chooseOrg(item.id)">{{ item.name }}</li>
  </ul>

  <ul class="ante-nav-mune-inner" v-show="displayTerms">
    <li v-for="item in terms"
      @click="chooseTerm(item.id)">{{ item.name }}</li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'nav-choose',

  data() {
    return {
      orgName: '全校',
      termName: '所有日期',
      orgStatus: 'icon-xiajiantou',
      termStatus: 'icon-xiajiantou',

      orgs: [],
      childOrgs: [],

      terms: [],
    };
  },

  computed: {
    displayOrgs() {
      return this.orgStatus === 'icon-shangjiantou';
    },

    displayChildOrgs() {
      return this.orgStatus === 'icon-shangjiantou' &&
        this.orgs.filter(item => item.checked).length;
    },

    displayTerms() {
      return this.termStatus === 'icon-shangjiantou';
    },

    displayMask() {
      return this.displayOrgs || this.displayChildOrgs || this.displayTerms;
    },
  },

  created() {
    this.init();
  },

  methods: {
    init() {
      Promise.all([
        this.loadGrade(),
        this.loadTerm(),
      ]).then(res => this.setMenus(res));
    },

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

    setMenus(res) {
      const grades = res[0].resultBean || [];
      const terms = res[1].resultBean || [];

      this.orgName = '全校';
      this.termName = '所有日期';
      this.orgs = [
        { id: 0, name: '全校', orgSeq: '', cls: false },
        ...grades.map(({ orgId, orgSeq, orgName }) => { // eslint-disable-line
          return { id: orgId, orgSeq, name: orgName, cls: true, checked: false };
        }),
      ];
      this.terms = [
        { id: 0, name: '全部学期' },
        { id: -1, name: '前一个月' },
        { id: -3, name: '前三个月' },
        ...terms,
      ];
    },

    tapOrg() {
      if (this.orgStatus === 'icon-shangjiantou') {
        this.orgStatus = 'icon-xiajiantou';
      } else {
        this.termStatus = 'icon-xiajiantou';
        this.orgStatus = 'icon-shangjiantou';
      }
    },

    tapTerm() {
      if (this.termStatus === 'icon-shangjiantou') {
        this.termStatus = 'icon-xiajiantou';
      } else {
        this.orgStatus = 'icon-xiajiantou';
        this.termStatus = 'icon-shangjiantou';
      }
    },

    showChildOrgs(index) {
      const currOrg = this.orgs[index];
      this.orgs.forEach((item) => {
        if (item.checked) {
          this.$set(item, 'checked', false);
        }
      });

      if (index) {
        this.$set(currOrg, 'checked', true);

        if (currOrg.child) {
          this.childOrgs = currOrg.child;
        } else {
          this.$http.get(`system/org/findNextIgnoreAuth/${currOrg.id}`)
            .then(res => res.json())
            .then(({ resultBean }) => {
              const rsb = resultBean || [];
              const childOrgs = [
                { id: currOrg.id, orgSeq: currOrg.orgSeq, name: `${currOrg.name}所有班级` },
                ...rsb.map(({ orgId, orgSeq, orgName }) => (
                  { id: orgId, orgSeq, name: orgName }
                )),
              ];
              this.$set(currOrg, 'child', childOrgs);
              this.childOrgs = childOrgs;
            });
        }
      } else {
        this.chooseOrg(0);
      }
    },

    chooseOrg(id) {
      this.$emit('org', id);
      if (id) {
        this.childOrgs.forEach((item) => {
          if (id === item.id) {
            this.orgName = item.name;
            return false;
          }

          return true;
        });
      } else {
        this.orgName = '全校';
      }

      this.tapOrg();
    },

    chooseTerm(id) {
      this.$emit('term', id);
      this.terms.forEach((item) => {
        if (id === item.id) this.termName = item.name;
      });

      this.tapTerm();
    },
  },
};
</script>

<style scoped>
.ante-nav-mune {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.ante-nav-mune li {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;

  height: 44px;
  line-height: 44px;
  text-align: center;
  background-color: #fff;
  position: relative;
}
.ante-nav-mune > li:not(:last-child):after {
  content: " ";
  position: absolute;
  bottom: 0;
  top: 0;
  right: 0;
  width: 1px;
  border-right: 1px solid #D9D9D9;
  color: #D9D9D9;
  -webkit-transform-origin: 50% 0;
  transform-origin: 50% 0;
  -webkit-transform: scaleX(0.5);
  transform: scaleX(0.5);
}
.ante-nav-mune-curr {
  color: #888;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ante-nav-mune-inner {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  box-shadow: 1px 1px 5px #bbb;
  z-index: 100;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: #fff;
}
.ante-parent-btns {
  background-color: #f0f0f0;
  right: 50%;
}
.ante-child-btns {
  left: 50%;
  background-color: #fff;
}
.ante-nav-mune-inner > li {
  height: 32px;
  line-height: 32px;
  padding: 0 10px;
  position: relative;
}
.ante-nav-mune-inner > li:active {
  background-color: #dfdfdf;
}
/* .ante-nav-mune-inner > li:not(:last-child):after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #D9D9D9;
  color: #D9D9D9;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
 */
.ante-parent-btns li.z-has-child:after {
  content: " ";
  display: inline-block;
  height: 6px;
  width: 6px;
  border-width: 2px 2px 0 0;
  border-color: #C8C8CD;
  border-style: solid;
  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  position: absolute;
  top: 50%;
  margin-top: -4px;
  right: 10px;
}
.ante-parent-btns li.z-has-child.z-has-checked {
  background-color: #fff;
}

.ante-mask {
  position: fixed;
  z-index: 1;
}
</style>