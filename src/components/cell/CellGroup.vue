<template>
<div class="weui-cells">

  <template v-for="cell in cells">
    <cell-access
      v-if="cell.isLink"
      :name="cell.name"
      :caption="cell.caption"
      :imguri="cell.imguri"
      :go="cell.go"
      :isLink="cell.isLink">
    </cell-access>

    <cell-base
      v-if="!cell.isLink"
      :name="cell.name"
      :caption="cell.caption"
      :imguri="cell.imguri">
    </cell-base>
  </template>

</div>
</template>

<script>
import CellBase from './CellBase';
import CellAccess from './CellAccess';

export default {
  name: 'cell-group',

  props: ['cells'],

  components: {
    CellBase,
    CellAccess,
  },
};
</script>

<style>

</style>