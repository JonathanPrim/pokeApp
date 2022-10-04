import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import { registerSW } from 'virtual:pwa-register'
import Pokedex from './views/Pokedex.vue';
registerSW()

components: {
  MenuIcon;
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/pokedex',
      name: 'Pokedex',
      component: Pokedex,
    },
  ],
});

createApp(App).use(router).mount('#app');

