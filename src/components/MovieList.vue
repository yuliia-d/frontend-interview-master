<template>
  <div class="wrapper_items">
    <MovieFilter  @set-filter="filterMovies" />
    <MovieListItem
      v-for="movie in filteredMovies"
      :key="movie.imdbID"
      :movie="movie"
    />
    <div v-if="lastPage !== numPage" class="items__footer">
      <button id="load_more" class="items__btn" @click="loadMoreMovies">Show more</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import MovieService from '@/services/MovieService';
import MovieListItem from './MovieListItem.vue';
import MovieFilter from './MovieFilter.vue';
import { Movie } from '../services/types';

export default Vue.extend({
  name: 'MovieList',
  data() {
    return {
      movies: [] as Movie[],
      filteredMovies: [] as Movie[],
      numPage: 1,
      filter: 'all',
      lastPage: 2,
      numOfItems: 10,
    };
  },
  async created() {
    await this.loadMovies(this.numPage);
  },
  computed: {
    ...mapGetters(['token']),
  },
  methods: {
    async loadMovies(page: number) {
      const result = await MovieService.movieService.getMovieList(this.token, page);

      this.movies = [...this.movies, ...result.result];
      this.lastPage = Math.ceil(result.numberOfResult / this.numOfItems);
      this.filterMovies(this.filter);
    },
    async loadMoreMovies() {
      this.numPage += 1;

      await this.loadMovies(this.numPage);
    },
    filterMovies(localFilter: string) {
      this.filter = localFilter;

      if (this.filter === 'all') {
        this.filteredMovies = [...this.movies];
      } else {
        this.filteredMovies = this.movies.filter((elem) => elem.Type === this.filter);
      }
    },
  },
  components: {
    MovieListItem,
    MovieFilter,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .wrapper_items {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .items__footer {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 30px 0 20px 0;
  }
  .items__btn {
    display: block;
    padding: 5px 10px;
    background-color: #42b983;
    border-color: #42b983;
    border-radius: 5px;
    color: #fff;
    font-size: 14px;
    outline: none;
    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
</style>
