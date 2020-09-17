<template>
  <div>
    <p>Child</p>
    <p>Count: {{ state.count }}</p>
    <button @click="increment">++</button>
  </div>
</template>

<script>
import { counterContainer } from '@/useCounter';

export default {
  name: 'ChildComponent',
  setup() {
    const { state, increment } = counterContainer.useContainer();

    return {
      state,
      increment,
    };
  },
};
</script>
