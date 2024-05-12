<script>
import axios from "axios";
import { store } from './store';
import AppHeader from "./components/AppHeader.vue";
import AppMain from "./components/AppMain.vue";

export default {
    components: {
        AppHeader,
        AppMain,
    },
    data() {
        return {
            store,
        }
    },
    created() {
        this.store.randomNumber = Math.floor(Math.random() * this.store.randomWord.length);
        this.store.currentOption = "default";
        this.searchType();
    },

    methods: {
        SearchFilmSeries() {  // cerca il film per imput

            // Crea parametri per accedere al database
            const paramsobj = {
                api_key: this.store.apiKey,
                query: this.store.searchQuery,
            }
            //  fai la chiamata
            const CallMovie = axios.get("https://api.themoviedb.org/3/search/movie", {
                params: paramsobj
            });
            const CallSerie = axios.get("https://api.themoviedb.org/3/search/tv", {
                params: paramsobj
            });
            //  2 chiamate in una
            axios
                .all([CallMovie, CallSerie])
                .then((resp) => {
                    // SAVE INTO ARRAY IN THE GLOBAL STORE
                    this.store.arrayFilm = resp[0].data.results;
                    this.store.arraySerie = resp[1].data.results;
                })
            // pulisci il query
            this.store.searchQuery = "";
        },
        searchType() {                          //cerca il film per tipo
            const paramsobj = { api_key: this.store.apiKey }
            // controlla se lopzione corrente è settata su default
            if (this.store.currentOption === "default") {
                // Salva nella query una parola random
                paramsobj.query = this.store.randomWord[this.store.randomNumber];
                //  crea la call
                //film
                const CallMovie = axios.get("https://api.themoviedb.org/3/search/movie", {
                    params: paramsobj
                });
                //serie tv
                const CallSerie = axios.get("https://api.themoviedb.org/3/search/tv", {
                    params: paramsobj
                });
                // 2 chiamate in una
                axios
                    .all([CallMovie, CallSerie])
                    .then((resp) => {
                        //  salva negli array nel global storage
                        this.store.arrayFilm = resp[0].data.results;
                        this.store.arraySerie = resp[1].data.results;
                    })
              
            } else if (this.store.currentOption === "popular" || this.store.currentOption === "top_rated") {
                //   chiamata doppia per serie e per film
                const CallMovie = axios.get(`https://api.themoviedb.org/3/movie/${this.store.currentOption}`, {
                    params: paramsobj
                });
                const CallSerie = axios.get(`https://api.themoviedb.org/3/tv/${this.store.currentOption}`, {
                    params: paramsobj
                });
                // due chiamate in una
                axios
                    .all([CallMovie, CallSerie])
                    .then((resp) => {
                        // salva in un array nel global storage
                        this.store.arrayFilm = resp[0].data.results;
                        this.store.arraySerie = resp[1].data.results;
                    })
            } else {
                //  chiama solo per film
                axios.get(`https://api.themoviedb.org/3/movie/${this.store.currentOption}`, {
                    params: paramsobj
                })
                    .then((resp) => {
                        this.store.arrayFilm = resp.data.results;
                    });
            }
        }
    }
}
</script>

<template>

    <AppHeader @searchFilm="SearchFilmSeries" @changeOption="searchType" />

    <AppMain />

</template>

<style lang="scss"></style>