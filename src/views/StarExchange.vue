<template>
<div class="page ante-page-withb">
  <cell-wapper>
    <star-ex-item
      :up="false"
      :icon="['gold']"
      :name="['海洋金星']"
      desc="5颗海洋全能星可成为“金星少年”进入金星殿堂">
    </star-ex-item>

    <star-ex-item
      :icon="['all']"
      :name="['海洋全能星']"
      desc="5颗海洋全能星可成为“金星少年”进入金星殿堂">
    </star-ex-item>

    <star-ex-item
      :icon="['silver']"
      :name="['海洋银星']"
      desc="5颗海洋全能星可成为“金星少年”进入金星殿堂">
    </star-ex-item>

    <star-ex-item
      :icon="['fc', 'zdy']"
      :name="['海洋风采星', '自定义星']"
      desc="5颗海洋全能星可成为“金星少年”进入金星殿堂">
    </star-ex-item>
  </cell-wapper>
</div>
</template>

<script>
import StarExItem from '../components/star/StarExItem';

export default {
  name: 'star-exchange',
  components: {
    StarExItem,
  },
};
</script>