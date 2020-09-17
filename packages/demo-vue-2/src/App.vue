<template>
  <ParentComponent/>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import ParentComponent from '@/components/ParentComponent.vue';
import { counterContainer } from '@/useCounter';

export default defineComponent({
  name: 'App',
  components: {
    ParentComponent,
  },
});
</script>
