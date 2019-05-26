<template>
  <div :style="styling">
    <div style="width: 100%; height: 100%;">
      <div
        v-if="detailInfo!=null"
        class="headerStyle"
      >
        {{ cellHeader }}
      </div>
      <div style="padding: 16px;">
        <slot name="detail" />
      </div>
      <!-- <span class="numero_estado">Estado #{{ nodeData.id }}</span> -->
    </div>
  </div>
</template>
<script>
export default {
  props: {
    cellHeader: { default: '', type: String },
    x: { default: null, type: Number },
    detailInfo: { default: function () { return {} }, type: Object },
  },
  computed: {
    styling: function () {
      return {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gridArea: this.detailInfo.square[0].y + ' / ' + this.detailInfo.square[0].x + ' / ' + this.detailInfo.square[1].y + ' / ' + this.detailInfo.square[1].x,
        boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
      }
    },
  },
}
</script>
<style>
    .headerStyle {
            font-size: 24px !important;
            font-weight: 400;
            line-height: 32px !important;
            letter-spacing: normal !important;
            font-family: 'Roboto', sans-serif !important;
            padding: 16px;
    }
</style>
