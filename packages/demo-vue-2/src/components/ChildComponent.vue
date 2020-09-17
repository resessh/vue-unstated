<template>
  <div>
    <p>Child</p>
    <p>Count: {{ state.count }}</p>
    <button @click="increment">++</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { counterContainer } from '@/useCounter';

export default defineComponent({
  name: 'ChildComponent',
  setup() {
    const { state, increment } = counterContainer.useContainer();

    return {
      state,
      increment,
    };
  },
});
</script>
