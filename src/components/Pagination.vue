<template>
  <div class="fle">
    <button v-if="previousPage != null" @click="PreviousClick" type="button" value="Previous"
      class="btn  border-danger m-1">
      <chevron-left-icon />
    </button>
    <button class="btn border-danger">{{ page }}</button>
    <button v-if="nextPage != null" @click="NextClick" value="Next" class="btn  border-danger m-1">
      <chevron-right-icon />
    </button>

  </div>
</template>

<script setup>
</script>
<script>
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue';
import ChevronLeftIcon from 'vue-material-design-icons/ChevronLeft.vue';
export default {
  components: {
    MenuIcon,
    ChevronRightIcon,
    ChevronLeftIcon
  },
  props: {
    nextPage: String,
    previousPage: String,
    defaultPage: Number
  },
  data() {
    return {
      page: 1,
      next: this.nextPage,
      prev: this.previousPage,
      defaultPage: this.defaultPage
    }
  },
  mounted() {
    console.log(this.next, this.prev)
  },
  methods: {
    PreviousClick() {
      setTimeout(() => {
        console.log("Delayed for 1 second.");
        this.page = this.page - 1
        this.$emit('clicked', 'prev')
      }, "1000")
    },
    NextClick() {

      setTimeout(() => {
        this.page = this.page + 1
        this.$emit('clicked', 'next')
        console.log("Delayed for 1 second.");
      }, "1000")

    }
  }


}
</script>