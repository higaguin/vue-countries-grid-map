# vue-countries-grid-map

[![npm](https://img.shields.io/npm/v/vue-countries-grid-map.svg) ![npm](https://img.shields.io/npm/dm/vue-countries-grid-map.svg)](https://www.npmjs.com/package/vue-countries-grid-map)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

A Vue component that draws a series of interactive maps represented in a grid

<img src="https://media.giphy.com/media/LT6uxHelxGeyE9XvUh/giphy.gif"/>

# Installation

```
npm install --save vue-countries-grid-map
```

## Default import

Install all the components:

```javascript
import Vue from 'vue'
import VueCountriesGridMap from 'vue-countries-grid-map'

Vue.use(VueCountriesGridMap)
```

## Distribution import

Install all the components:

```javascript
import 'vue-countries-grid-map/dist/vue-countries-grid-map.css'
import VueCountriesGridMap from 'vue-countries-grid-map/dist/vue-countries-grid-map.common'

Vue.use(VueCountriesGridMap)
```

**⚠️ You may have to setup your bundler to embed the css file in your page.**

## Browser

```html
<link rel="stylesheet" href="vue-countries-grid-map/dist/vue-countries-grid-map.css"/>

<script src="vue.js"></script>
<script src="vue-countries-grid-map/dist/vue-countries-grid-map.browser.js"></script>
```

The plugin should be auto-installed. If not, you can install it manually with the instructions below.

Install all the components:

```javascript
Vue.use(VueCountriesGridMap)
```

## Source import

Install all the components:

```javascript
import Vue from 'vue'
import VueCountriesGridMap from 'vue-countries-grid-map/src'

Vue.use(VueCountriesGridMap)
```

**⚠️ You need to configure your bundler to compile `.vue` files.** More info [in the official documentation](https://vuejs.org/v2/guide/single-file-components.html).

# Usage

> TODO

# Example

```
<template>
  <div id="app">
    <select v-model="selected_option">
      <option v-for="option in mapOptions" v-bind:value="option.value" v-bind:key="option.value">{{option.text}}</option>
    </select>
    <select v-model="selected_color">
      <option v-for="option in colorOptions" v-bind:value="option.value" v-bind:key="option.value">{{option.text}}</option>
    </select>
    <select v-model="selected_type">
      <option v-for="option in typeOptions" v-bind:value="option.value" v-bind:key="option.value">{{option.text}}</option>
    </select>
    <select v-model="selected_detail">
      <option v-for="option in detailOptions" v-bind:value="option.value" v-bind:key="option.value">{{option.text}}</option>
    </select>
    <countries-grid-map 
      :mapSelected="selected_option" 
      :primaryColor="selected_color" 
      :colorType="selected_type"
      :detailType="selected_detail"
      @change-click-node="changeClickNode">
      <template slot="detail">
        <span v-if="actualNode!=null">A description of: {{ actualNode.name }}</span>
      </template>
    </countries-grid-map>
  </div>
</template>

<script>
  import {CountriesGridMap} from 'vue-countries-grid-map';

  export default {
    name: 'app',
    components: {
      CountriesGridMap
    },
    methods: {
      changeClickNode (actualNode) {
        this.actualNode = actualNode
      }
    },
    data: function() {
      return {
        actualNode: null,
        selected_option: 'map_world',
        selected_color: 'purple',
        selected_type: 'random',
        selected_detail: 'invisible',
        mapOptions: [
          { value: 'map_world', text: 'World' },
          { value: 'map_mexico', text: 'México' },
          { value: 'map_usa', text: 'United States of America' }
        ],
        typeOptions: [
          { value: 'random', text: 'Random' },
          { value: 'density', text: 'Density' }
        ],
        detailOptions: [
          { value: 'invisible', text: 'Without Detail' },
          { value: 'side', text: 'Side Detail' }
        ],
        colorOptions: [
          { value: 'red', text: 'Red' },
          { value: 'pink', text: 'Pink' },
          { value: 'purple', text: 'Purple' },
          { value: 'deepPurple', text: 'Deep Purple' },
          { value: 'indigo', text: 'Indigo' },
          { value: 'blue', text: 'Blue' },
          { value: 'lightBlue', text: 'Light Blue' },
          { value: 'cyan', text: 'Cyan' },
          { value: 'teal', text: 'Teal' },
          { value: 'green', text: 'Green' },
          { value: 'lightGreen', text: 'Light Green' },
          { value: 'lime', text: 'Lime' },
          { value: 'yellow', text: 'Yellow' },
          { value: 'amber', text: 'Amber' },
          { value: 'orange', text: 'Orange' },
          { value: 'deepOrange', text: 'Deep Orange' },
          { value: 'brown', text: 'Brown' },
          { value: 'blueGrey', text: 'Blue Grey' },
          { value: 'grey', text: 'Grey' },
        ]
      }
    }
  }
</script>
```

## License

[MIT](http://opensource.org/licenses/MIT)
