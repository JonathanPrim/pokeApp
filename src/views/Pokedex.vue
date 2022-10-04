<template>
  <Pagination v-bind="page" @clicked="onClickChild" />
  <div class="d-flex flex-wrap gap-1 justify-content-center mt-3">
    <div v-for="pokemon in sortedPokemons" class="card " style="min-width: 12rem;">
      <img v-bind:src="pokemon?.sprites?.front_default" class="d-block w-50 mx-auto" alt="...">
      <div class="card-body">
        <h5 class="card-title">{{ pokemon.name }}</h5>
        <p class="card-text">{{ pokemon.types[0].type.name }}</p>
      </div>
    </div>
  </div>

</template>

<script>
import client from '../api/client'
import axios from 'axios';
import Pagination from '../components/Pagination.vue';
export default {
  data() {
    return {
      pokemonsUrls: null,
      pokemons: [],
      sortedPokemons: [],
      page: {
        nextPage: null,
        previousPage: null,
      }
    };
  },
  async beforeCreate() {
    await client.getAllPokemons("/pokemon")
      .then(({ data }) => {
        this.pokemonsUrls = data.results;
        this.page.nextPage = data.next;
        this.page.previousPage = data.previous;
        this.setPage(this.pokemonsUrls);
      });
  },
  mounted() {
  },
  methods: {
    getPokemon(url) {
      return axios.get(url);
    },
    setPage(url) {
      url.map(async (poke) => this.getPokemon(poke.url).then(({ data }) => {
        this.pokemons.push(data);
        this.sortedPokemons = this.pokemons.sort((a, b) => a.id - b.id);
      }));
    },
    onClickChild(val) {
      console.log(val, "HREJJEJS")
      switch (val) {
        case 'next':
          axios.get(this.page.nextPage).then(({ data }) => {
            this.pokemons = []
            this.pokemonsUrls = data.results;
            this.page.nextPage = data.next;
            this.page.previousPage = data.previous;
            this.setPage(this.pokemonsUrls);
          })
          break;
        case 'prev':
          axios.get(this.page.previousPage).then(({ data }) => {
            this.pokemons = []
            this.pokemonsUrls = data.results;
            this.page.nextPage = data.next;
            this.page.previousPage = data.previous;
            this.setPage(this.pokemonsUrls);
          })
          break;
        default: break;
      }
    }
  },
  components: { Pagination }
};


</script>