<template>
  <div class="movie-view">
    <h1>{{ this.movieInfo.Title }}</h1>
    <img alt="Movie poster" :src="this.movieInfo.Poster" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import MovieService from '@/services/MovieService';

export default Vue.extend({
  name: 'MovieView',
  data() {
    return {
      movieInfo: {},
    };
  },
  async beforeRouteUpdate(to, from, next) {
    await this.loadMovieInfo(to.params.movieId);

    next();
  },
  async created() {
    const id = this.$route.params.movieId;

    await this.loadMovieInfo(id);
  },
  computed: {
    ...mapGetters(['token']),
  },
  methods: {
    async loadMovieInfo(movieId: string) {
      this.movieInfo = await MovieService.movieService.getSpecificMovie(this.token, movieId);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
