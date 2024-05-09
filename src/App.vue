<script>
import { store } from './store';
import axios from "axios";
import AppHeader from "./components/AppHeader.vue";
import AppMain from "./components/AppMain.vue";
export default{
  components: {
    AppHeader,
    AppMain,
  },
  data(){
    return {
      store,
    }
  },
  methods: {
  sortingMedia(){
    const dbValues = {                    //dbValues sono i valori costanti che mi servono per accedere e navigare il database
      api_key: this.store.apiKey,         //richiama la chiave di accesso
      query: this.store.searchQuery,      //richiama la stringa con il valore che vogliamo cercare
    }
    axios.get("https://api.themoviedb.org/3/search/movie",)

  }
}
}

</script>

<template>
  <AppHeader/>
  <AppMain/>
</template>

<style scoped lang="scss">
</style>