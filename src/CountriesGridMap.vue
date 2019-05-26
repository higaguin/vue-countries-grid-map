<template>
  <div
    ref="cell"
    class="countries-grid-map"
  >
    <template v-for="map_item in map.nodes">
      <GridCell
        v-for="location_item in map_item.locations"
        :key="location_item.x + '-' + location_item.y"
        :x="location_item.x"
        :y="location_item.y"
        :cell-text="completeText ? map_item.name : map_item.abr2letters"
        :color="getColor(map_item)"
        :visible-text="visibleText"
        :size-text="sizeText"
        @change-click-node="changeNode"
      />
    </template>
    <CellDetail
      v-if="visibleDetail"
      :cell-header="actualNode.name"
      :detail-info="map.detailInfo"
    >
      <template slot="detail">
        <slot name="detail" />
      </template>
    </CellDetail>
  </div>
</template>
<script>
import GridCell from './GridCell.vue'
import CellDetail from './CellDetail.vue'
import maps from './utils/maps.js'
import colors from './utils/colors.js'

export default {
  components: {
    GridCell,
    CellDetail,
  },
  props: {
    mapSelected: { default: 'map_world', type: String },
    primaryColor: { default: 'green', type: String },
    colorType: { default: 'random', type: String },
    detailType: { default: 'invisible', type: String },
  },
  data: () => ({
    map: {},
    color: {},
    actualNode: {},

    horizontal_lenght: 0,
    cell_width: 0,
    visibleText: true,
    completeText: true,
    visibleDetail: false,
    sizeText: 1,
  }),
  watch: {
    cell_width: function (val) {
      this.processCellSize(val)
    },
    mapSelected: function (val) {
      this.changeMap(val)
    },
    primaryColor: function (val) {
      this.changePrimaryColor(val)
    },
    colorType: function (val) {
      this.changeColorType()
    },
    detailType: function (val) {
      this.changeDetailType()
    },
  },
  mounted () {
    this.$nextTick(function () {
      window.addEventListener('resize', this.changeCellSize)

      this.changeCellSize()
      this.processCellSize(this.cell_width)
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.changeCellSize)
  },
  created () {
    this.changeMap(this.mapSelected)
    this.changePrimaryColor()
    this.setHorizontalLenght()
  },
  methods: {
    getColor (mapItem) {
      let result = '000000'
      if (this.colorType === 'random') {
        let randomColor = this.color.levels[Math.floor(Math.random() * this.color.levels.length)]
        result = randomColor[Object.keys(randomColor)[0]]
      } else if (this.colorType === 'density') {
        let densityColor = this.color.levels.find(function (level, key) {
          return Number(Object.keys(level)[0]) === mapItem.density
        }, mapItem)
        result = densityColor[Object.keys(densityColor)[0]]
      }
      return result
    },
    changeNode (x, y) {
      this.actualNode = this.map.nodes.find(function (mapItem) {
        return mapItem.locations.find(function (location) {
          return location.x === x && location.y === y
        })
      })
      this.$emit('change-click-node', this.actualNode)
    },
    setHorizontalLenght () {
      let maxLenghtMap = Math.max.apply(Math, this.map.nodes.map(function (node) { return Math.max.apply(Math, node.locations.map(function (location) { return location.x })) }))
      let maxLenghtDetail = this.map.detailInfo.square[1].x
      this.horizontal_lenght = maxLenghtDetail > maxLenghtMap ? maxLenghtDetail : maxLenghtMap
    },
    changeCellSize (event) {
      this.setHorizontalLenght()
      this.cell_width = this.$refs.cell != null ? this.$refs.cell.clientWidth / this.horizontal_lenght : this.cell_width
    },
    processCellSize (cellSize) {
      if (cellSize < 11.5) {
        this.visibleText = false
        if (cellSize < 6) {
          this.visibleDetail = false
        }
      } else if (cellSize > 75) {
        let resultText = cellSize / 110

        this.sizeText = resultText > 1 ? 1 : resultText
        this.completeText = true
        this.visibleText = true
      } else {
        let resultText = cellSize / 64

        this.sizeText = resultText > 1 ? 1 : resultText
        this.completeText = false
        this.visibleText = true
      }
    },
    changeMap (mapSelected) {
      this.map = maps[mapSelected]
      this.changeCellSize()
      this.processCellSize(this.cell_width)
    },
    changePrimaryColor () {
      this.color = colors[this.primaryColor]
    },
    changeColorType () {
      this.changeMap(this.mapSelected)
    },
    changeDetailType () {
      if (this.detailType === 'invisible') {
        this.visibleDetail = false
      } else {
        this.visibleDetail = true
      }
    },
  },
}
</script>
<style>
.countries-grid-map {
  display: grid;
  grid-auto-rows: 1fr;
  grid-auto-columns: 1fr;
}

.countries-grid-map::before {
  content: "";
  width: 0;
  padding-bottom: 100%;
  grid-row: 1 / 1;
  grid-column: 1 / 1;
}

.countries-grid-map > * {
  border: 1px white solid;
}
</style>
