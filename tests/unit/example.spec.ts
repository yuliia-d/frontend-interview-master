import { shallowMount, mount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';
import MovieList from '@/components/MovieList.vue';
import MovieService from '@/services/MovieService.ts';
import axios from "axios";


const data = (page: number) => Array.from({length: 10}, (elem, i) => ({
  Title: "Batman Begins",
  Year: "2005",
  imdbID: i + "tt0372784" + page,
  Type: "movie",
  Poster: "https://m.media-amazon.com/images/M/MV5BZmUwNGU2ZmItMmRiNC00MjhlLTg5YWUtODMyNzkxODYzMmZlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
}));

jest.mock('axios', () => {
  return {
    create: jest.fn(),
    get: jest.fn(),
  };
});

jest.mock('@/services/MovieService.ts', () => {
  return {
    movieService: {
      getMovieList: jest.fn((tocken: string, page: number) => Promise.resolve({
        result: data(page),
        numberOfResult: 50,
      })),
    }
  }
});

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});

describe('MovieList.vue', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('get movies when button is clicked', (done) => {
    const wrapper = shallowMount(MovieList);

    expect(wrapper.vm.$data.movies.length).toBe(0);
    expect(wrapper.vm.$data.numPage).toBe(1);

    wrapper.find('button').trigger('click');

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$data.movies.length).toBe(10);
      expect(wrapper.vm.$data.lastPage).toBe(5);

      done()
    })

  });
});
