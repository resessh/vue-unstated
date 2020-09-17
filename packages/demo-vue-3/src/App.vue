<template>
  <ParentComponent />
</template>

<script>
import ParentComponent from '@/components/ParentComponent.vue';
import { counterContainer } from '@/useCounter';

export default {
  name: 'App',
  components: {
    ParentComponent,
  },
  setup() {
    counterContainer.provide({
      initialState: { count: 10 },
    })
  }
};
</script>
