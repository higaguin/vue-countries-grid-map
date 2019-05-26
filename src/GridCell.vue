<template>
  <div
    :style="styling"
    @click="changeNode"
  >
    <span v-if="visibleText">{{ cellText }}</span>
  </div>
</template>
<script>
export default {
  props: {
    cellText: { default: '', type: String },
    x: { default: null, type: Number },
    y: { default: null, type: Number },
    color: { default: '000000', type: String },
    visibleText: { default: false, type: Boolean },
    sizeText: { default: 1, type: Number },
  },
  computed: {
    styling: function () {
      return {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        color: 'white',
        gridColumn: this.x + ' / ' + this.x,
        gridRow: this.y + ' / ' + this.y,
        position: 'relative',
        backgroundColor: '#' + this.color,
        fontSize: this.sizeText + 'em',
      }
    },
  },
  methods: {
    changeNode: function (event) {
      this.$emit('change-click-node', this.x, this.y)
    },
  },
}
</script>
