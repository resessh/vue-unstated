<template>
  <div>
    <p>Parent</p>
    <p>Count: {{ state.count }}</p>
    <hr />
    <ChildComponent />
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';
import { counterContainer } from '@/useCounter';

export default {
  name: 'ParentComponent',
  components: {
    ChildComponent,
  },
  setup() {
    const { state } = counterContainer.useContainer();

    return {
      state,
    };
  },
};
</script>
