![logo](./assets/logo.png)

<p align="center">
<a href="https://www.npmjs.com/package/vue-unstated"><img src="https://img.shields.io/npm/v/vue-unstated.svg" alt="version"></a>
<img src="https://github.com/resessh/vue-unstated/workflows/Build/badge.svg" alt="Build" />
<img src="https://github.com/resessh/vue-unstated/workflows/Test/badge.svg" alt="Test" />
<a href="https://codecov.io/gh/resessh/vue-unstated"><img src="https://codecov.io/gh/resessh/vue-unstated/branch/master/graph/badge.svg" alt="codecov" /></a>
<a href="https://bundlephobia.com/result?p=vue-unstated"><img src="https://badgen.net/bundlephobia/minzip/vue-unstated" alt="minzipped size"/></a>
<a href="https://www.typescriptlang.org/docs/home.html"><img src="https://camo.githubusercontent.com/832d01092b0e822178475741271b049a2e27df13/68747470733a2f2f62616467656e2e6e65742f62616467652f2d2f547970655363726970742f626c75653f69636f6e3d74797065736372697074266c6162656c" alt="typescript" /></a>
</p>

----
# vue-unstated
A tiny state management library for Vue Composition API based on [unstated-next](https://github.com/jamiebuilds/unstated-next) which is for React.

## :horse_racing: Demo
[![Edit [vue-unstated DEMO] Todo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/ugdg7-ugdg7?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fuse%2Ftodos.js&theme=dark)

## :electric_plug: Installation
```shell
$ npm install --save vue-unstated
```
or
```shell
$ yarn add vue-unstated
```

## :surfer: Usage
__use/counter.js__
```js
import { reactive } from '@vue/composition-api' // Vue 2 with @vue/composition-api
import { reactive } from 'vue' // or Vue 3
import { createContainer } from 'vue-unstated'

const useCounter = (initialState = { count: 0 }) => {
  const state = reactive(initialState)

  const increment = () => {
    state.count++
  }

  return { state, increment }
}

export const counterContainer = createContainer(useCounter)
```

__Parent.vue__
```vue
<script>
import { counterContainer } from 'use/counter'
import Child from 'Child.vue'

export default {
  components: { Child },
  setup() {
    // You can share same state in its child nodes!!
    const { state, increment } = counterContainer.provide()

    return {
      count: state.count,
      increment,
    }
  }
}
</script>
```

__Child.vue__
```vue
<script>
import { counterContainer } from 'use/counter'

export default {
  setup() {
    // You can use same state with Parent.vue!!
    const { state, increment } = counterContainer.useContainer()

    return {
      count: state.count,
      increment,
    }
  }
}
</script>
```

## :checkered_flag: LICENSE
MIT
