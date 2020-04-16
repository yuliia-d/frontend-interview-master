<template>
  <div class="wrapper_item">
    <router-link :to="routerLink">
      <p>{{ movie.Title }}</p>
      <img :src="movie.Poster" alt="Poster" class="item__img">
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';

import { Movie } from '@/services/types';

export default Vue.extend({
  name: 'MovieListItem',
  props: {
    movie: {
      type: Object,
    } as PropOptions<Movie>,
  },
  computed: {
    routerLink(): string {
      return `/movies/${this.movie.imdbID}`;
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  a {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 10px;
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    p {
      margin: 0;
    }

    &:visited {
      color: #1e4fb9;
    }
    &:hover {
      text-decoration: underline;

      .item__img {
        -webkit-box-shadow: 0px 0px 11px 3px rgba(105,105,105,1);
        -moz-box-shadow: 0px 0px 11px 3px rgba(105,105,105,1);
        box-shadow: 0px 0px 11px 3px rgba(105,105,105,1);
      }
    }
  }
  .item__img {
    max-height: 180px;
    transition: ease-in-out all 0.4s;
  }
  .wrapper_item {
    padding: 10px;
    flex-basis: 20%;
    flex-grow: 1;
    box-sizing: border-box;
  }
</style>
