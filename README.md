![logo](./assets/logo.png)

[![version](https://img.shields.io/npm/v/vue-unstated.svg)](https://www.npmjs.com/package/vue-unstated)
[![typescript](https://camo.githubusercontent.com/832d01092b0e822178475741271b049a2e27df13/68747470733a2f2f62616467656e2e6e65742f62616467652f2d2f547970655363726970742f626c75653f69636f6e3d74797065736372697074266c6162656c)](https://www.typescriptlang.org/docs/home.html)

----
# vue-unstated
A tiny state management library for Vue Composition API based on [unstated-next](https://github.com/jamiebuilds/unstated-next) which is for React.

## :electric_plug: Installation
```shell
$ npm install --save vue-unstated
```
or
```shell
$ yarn add vue-unstated
```

## :surfer: Usage
:warning: Currently you must use `@vue/composition-api`.

__use/counter.js__
```js
import { reactive } from '@vue/composition-api'
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

## :wrench: API

### createContainer(useComposition: function): Container
```js
import { reactive } from '@vue/composition-api'
import { createContainer } from 'vue-unstated'

const useCounter = (initialState = { count: 0 }) => {
  const state = reactive(initialState)

  const increment = () => {
    state.count++
  }

  const decrement = () => {
    state.count--
  }

  return { state, increment, decrement }
}

export const counterContainer = createContainer(useCounter)
```

### Container.provide(props: { initialState: any }): Composition
```js
export default {
  setup() {
    // 'provide' function must be called in 'setup' function.
    const {
      state,
      increment,
      decrement
    } = counterContainer.provide({
      initialState: { count: 0 }
    })
  }
}
```

### Container.useContainer(): Composition
```js
export default {
  setup() {
    // 'useContainer' function must be called in 'setup' function.
    const { state, increment, decrement } = counterContainer.useContainer()
  }
}
```

## :checkered_flag: LICENSE
MIT
