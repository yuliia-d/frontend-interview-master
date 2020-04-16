<template>
  <div class="items__filter">
    <div v-for="item in radioFilter" :key="item.id" class="filter__elem">
      <input
        type="radio"
        :id="item.id"
        :value="item.id"
        v-model="filter"
        @change="$emit('set-filter', filter)"
      >
      <label :for="item.id">{{ item.title }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'MovieFilter',
  data() {
    return {
      filter: 'all',
      radioFilter: [
        {
          id: 'movie',
          title: 'Movie',
        }, {
          id: 'series',
          title: 'Series',
        }, {
          id: 'all',
          title: 'All',
        },
      ],
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .items__filter {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 10px;
  }
  .filter__elem {
    display: flex;
    align-items: center;
    padding: 10px;
    input:hover,
    label:hover {
      cursor: pointer;
    }
  }
</style>
