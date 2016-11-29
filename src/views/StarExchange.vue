<template>
<div class="page ante-page-withb">
  <cell-wapper>
    <star-ex-item
      @exchange="exchangeStar(1)"
      :up="false"
      :icon="['gold']"
      :name="['海洋金星']"
      desc="5颗海洋全能星可成为“金星少年”进入金星殿堂">
    </star-ex-item>

    <star-ex-item
      @exchange="exchangeStar(1)"
      :icon="['all']"
      :name="['海洋全能星']"
      desc="5颗海洋全能星可成为“金星少年”进入金星殿堂">
    </star-ex-item>

    <star-ex-item
      @exchange="exchangeStar(1)"
      :icon="['silver']"
      :name="['海洋银星']"
      desc="5颗海洋全能星可成为“金星少年”进入金星殿堂">
    </star-ex-item>

    <star-ex-item
      @exchange="exchangeStar(1)"
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

  methods: {
    exchangeStar(id) {
      this.$router.push(`/StarUpgrade/${id}`);
    },
  },
};
</script>