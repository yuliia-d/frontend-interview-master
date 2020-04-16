<template>
  <div class="wrap_main">
    <img alt="Batman logo" src="../assets/logo.png" class="main__logo" />
    <HelloWorld :msg="`Hello ${userName}, which batman movie do you want to see?`"/>
    <MovieList />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import HelloWorld from '@/components/HelloWorld.vue';
import MovieList from '@/components/MovieList.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    MovieList,
  },
  computed: {
    ...mapGetters(['userName']),
  },
};
</script>
<style scoped lang="scss">
  .main__logo {
    max-width: 40%;
  }
</style>
