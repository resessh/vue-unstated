<template>
  <div>
    <p>Parent</p>
    <p>Count: {{ state.count }}</p>
    <hr />
    <ChildComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import ChildComponent from './ChildComponent.vue';
import { counterContainer } from '@/useCounter';

export default defineComponent({
  name: 'ParentComponent',
  components: {
    ChildComponent,
  },
  setup() {
    const { state } = counterContainer.provide({ initialState: { count: 10 } });

    return {
      state,
    };
  },
});
</script>
