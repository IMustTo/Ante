<template>
<ul :class="cls">
  <template v-for="(item, index) in group">
    <li class="ui-selector-item selector-class"
      v-if="item.orgProperty !== option"
      :data-index="`${preIndex}_${index}`"
      :data-id="item.orgId">
      <h3 class="ui-border-b" @click="tapTitle">
        <p>{{ item.orgName }}</p>
      </h3>

      <ui-select-item
        v-if="item.children && item.children.length"
        @changeEvt="selectOrg"
        @tapEvt="emitTapLi"
        :cls="{ 'ui-list': true }"
        :option="option"
        :preIndex="`${preIndex}_${index}`"
        :group="item.children">
      </ui-select-item>
    </li>

    <div v-if="item.orgProperty === option"
      class="weui-cells weui-cells_checkbox"
      style="margin-top: -1px;">
      <weui-checkbox
        @changeEvt="selectOrg"
        :id="item.orgId"
        :index="`${preIndex}_${index}`"
        :name="item.orgName"
        :check="item.checked">
      </weui-checkbox>
    </div>
  </template>
</ul>
</template>

<script>
import WeuiCheckbox from './WeuiCheckbox';

export default {
  name: 'ui-select-item',
  components: {
    WeuiCheckbox,
  },

  props: {
    group: {
      type: Array,
      default() {
        return [];
      },
    },

    // 103: 班级, 102: 家庭
    option: {
      type: String,
      default: '102',
    },

    preIndex: {
      type: String,
      default: '',
    },

    cls: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data() {
    return {
      active: false,
    };
  },

  methods: {
    tapTitle(e) {
      const prt = e.target.closest('.ui-selector-item');
// TOFIX: closest安卓不支持
      if (!/active/.test(prt.className)) {
        prt.className = `${prt.className} active`;
      } else {
        prt.className = prt.className.split(' active').join('');
      }

      this.emitTapLi(prt.dataset);
    },

    emitTapLi(data) {
      this.$emit('tapEvt', data);
    },

    selectOrg(id, value, name, index) {
      this.$emit('changeEvt', id, value, name, index);
    },
  },
};
</script>

<style>
.ui-selector .ui-selector-item p {
  margin-left: 10px;
  -webkit-box-flex: 1;
  box-flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
}

.ui-selector .ui-selector-item .ui-txt-info {
  margin: 0 10px;
  color: #777777;
}

.ui-selector .ui-selector-item .ui-list-link li:after {
  display: none;
}

.ui-selector .ui-list-link li:last-child .ui-list-info {
  border: none;
}

.ui-list {
  list-style: none;
  margin: 0;
  background-color: #fff;
}

.ui-list > li {
  position: relative;

  display: block;

  margin-left: 15px;
}
/*文字列表*/
.ui-list-text > li {
  font-size: 16px; 
  line-height: 20px;

  padding: 12px 25px 12px 0;
}

.ui-list > li.ui-border-t:first-child {
  border: none;
  background-image: none;
}

.ui-list > li:first-child .ui-border-t {
  border-top: 0;
  background-image: none;
}

/*********** ui-selector *************/
.ui-selector header {
  padding: 6px 10px;

  color: #ababab;
}

.ui-selector header:after {
  display: table; 
  clear: both;

  content: '';
}

.ui-selector header h3 {
  font-size: 16px;
  font-weight: 500;

  float: left;
}

.ui-selector .ui-selector-item p {
  font-size: 16px; 

  overflow: hidden;

  margin-left: 10px;

  white-space: nowrap;
  text-overflow: ellipsis;

  -webkit-box-flex: 1;
          box-flex: 1;
}

.ui-selector .ui-selector-item .ui-txt-info {
  margin: 0 10px;

  color: #777;
}

.ui-selector .ui-selector-item .ui-list-link li:after {
  display: none;
}

.ui-selector .ui-list-link li:last-child .ui-list-info {
  border: none;
}

.ui-selector .ui-selector-item h3:before {
  position: absolute;
  top: 16px;
  left: 10px;

  display: block;

  width: 11px;
  height: 11px;

  content: '';
  -webkit-transition: all .2s; 
          transition: all .2s;

  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAYAAACEYr13AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAOtJREFUeNpibGpq2sDAwJAHxI8YyABMQOwPxNeAuByI2cgxAAS4gbgDiM8DsT05BsCAFhDvB+JFQCxGjgEgwAjEsUB8E4gzcKjBawAMCADxdCA+AcTG5BgAA6ZAfAqIJ0MNJdkAmLocIL4OxDHkGAADEkC8GIj3ArEGSICFgTzgBMQXgbiXiYF8ANLLSa4LjgNxFhBfINUFb4E4DYhtQJpJCYP/QDwfml/eIEsQY8AlqHOPkpqQvgBxCTQVHsWlCJcL1gBxIRA/IeQ8dAPuAHEuEO8gNTv/AOJGINYjRTPMBbuhgXSHnAQBEGAAskkmlXEGsU0AAAAASUVORK5CYII=) no-repeat center left;
  -webkit-background-size: 9px auto;
          background-size: 9px auto;
}

.ui-selector .ui-selector-item.active > h3:before {
  -webkit-transform: rotate(90deg); 
          transform: rotate(90deg);
}

.ui-selector .ui-selector-item.active > ul {
  display: block;
}

.ui-selector .ui-selector-item ul {
  display: none;

  color: #282828;
}

.ui-selector .ui-selector-item h3 {
  font-size: 16px;
  font-weight: 400;
  line-height: 44px;

  position: relative;

  height: 44px;
  padding-left: 20px;

  color: #282828;
}

/****************** selector-class *****************/
.selector-class h3 p {
  display: inline-block;
}
.selector-class-checkbox {
  position: absolute;
  top: 0;
  right: 0;

  display: inline-block;
}
.selector-class-checkbox .weui_cell:active {
  background-color: #fff;
}


/****************** 1px hack *****************/
.ui-border-t {
  border-top: 1px solid #e0e0e0;
}

.ui-border-b {
  border-bottom: 1px solid #e0e0e0;
}

.ui-border-tb {
  border-top: #e0e0e0 1px solid;
  border-bottom: #e0e0e0 1px solid;
  background-image: none;
}

.ui-border-l {
  border-left: 1px solid #e0e0e0;
}

.ui-border-r {
  border-right: 1px solid #e0e0e0;
}

.ui-border {
  border: 1px solid #e0e0e0;
}

@media screen and (-webkit-min-device-pixel-ratio: 2) {
  .ui-border {
    position: relative;

    border: 0;
  }

  .ui-border-t,
  .ui-border-b,
  .ui-border-l,
  .ui-border-r,
  .ui-border-tb {
    border: 0;
  }

  .ui-border:before {
    position: absolute;
    top: 0;
    left: 0;

    -webkit-box-sizing: border-box; 
    width: 200%;
    height: 200%;
    padding: 1px;

    content: '';
    -webkit-transform: scale(.5);
    -webkit-transform-origin: 0 0;

    border: 1px solid #e0e0e0;
  }

  .ui-border-t {
    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(.5, transparent), color-stop(.5, #e0e0e0), to(#e0e0e0)); 
    background-position: left top;
  }

  .ui-border-b {
    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(.5, transparent), color-stop(.5, #e0e0e0), to(#e0e0e0)); 
    background-position: left bottom;
  }

  .ui-border-t,
  .ui-border-b {
    background-repeat: repeat-x;
    -webkit-background-size: 100% 1px;
  }

  .ui-border-tb {
    background: -webkit-gradient(linear, left bottom, left top, color-stop(.5, transparent), color-stop(.5, #e0e0e0), to(#e0e0e0)) left top repeat-x, -webkit-gradient(linear, left top, left bottom, color-stop(.5, transparent), color-stop(.5, #e0e0e0), to(#e0e0e0)) left bottom repeat-x;
  }

  .ui-border-tb {
    -webkit-background-size: 100% 1px;
  }

  .ui-border-l {
    background-image: -webkit-gradient(linear, left top, right top, color-stop(.5, transparent), color-stop(.5, #e0e0e0), to(#e0e0e0)); 
    background-position: left top;
  }

  .ui-border-r {
    background-image: -webkit-gradient(linear, right top, left top, color-stop(.5, transparent), color-stop(.5, #e0e0e0), to(#e0e0e0)); 
    background-position: right top;
  }

  .ui-border-l,
  .ui-border-r {
    background-repeat: repeat-y;
    -webkit-background-size: 1px 100%;
  }
}

</style>