<template>
  <div class="home">
    <div class="flex flex-col">
      <h1>PokeFinder</h1>
      <input class="pokemonInput" ref="poke" v-on:keyup.enter="findPokemon" type="text" v-model="value"
        placeholder="Search Pokemon...">
      <p>Du skriver just nu: {{value}}</p>
      <input @click="findPokemon()" type="button" value="Search" />
    </div>
    <div class="d-flex justify-content-center mt-3">
      <div v-if="pokemon" class="card " style="width: 18rem;">
        <div id="carouselExampleControls" class="carousel carousel-dark slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img v-bind:src="pokemon.sprites.front_default" class="d-block w-90 mx-auto" alt="...">
            </div>
            <div class="carousel-item">
              <img v-if="pokemon.sprites?.back_default" v-bind:src="pokemon.sprites?.back_default"
                class="d-block w-90 mx-auto" alt="...">
              <img v-else v-bind:src="pokemon.sprites.front_default" class="d-block w-90 mx-auto" alt="..," />
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ pokemon.name }}</h5>
          <p class="card-text">{{ pokemon.types[0].type.name }}</p>
        </div>
      </div>
      <h1 v-else>Oh no 😢</h1>
    </div>

  </div>
</template>
<script>
import client from "../api/client";

export default {
  data() {
    return {
      pokemon: null,
      position: { X: "Right" },
      value: ''

    }
  },
  mounted() {
    this.$refs.poke.focus();
  },
  methods: {
    onEnter() {
      this.findPokemon()
    },
    findPokemon() {
      let inputElement = document.querySelector('.pokemonInput')
      if (inputElement.value.length === 0)
        return console.log('empty');

      client.getOnePokemon('/pokemon/' + inputElement.value).then(({ data }) => {
        this.pokemon = data
        inputElement.value = ''
        console.log(this.pokemon)
      }).catch(e => {
        console.log(e)
        this.$refs.element.show();
      })
    }
  }
}

</script>

<style lang="scss">
$font-stack: Helvetica;
$primary-color: #BCB382;
$secondary-color: #121619;

.carousel-item {
  background-color: $primary-color;
  font: 100% $font-stack
}

.card-body {
  color: $secondary-color;
  background-color: $primary-color;
}
</style>