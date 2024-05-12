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
        SearchFilmSeries() {  // SEARCH FILM WITH INPUT TEXT

            // CREATE PARAMS
            const paramsobj = {
                api_key: this.store.apiKey,
                query: this.store.searchQuery,
            }
            //  CREATE CALL
            const CallMovie = axios.get("https://api.themoviedb.org/3/search/movie", {
                params: paramsobj
            });
            const CallSerie = axios.get("https://api.themoviedb.org/3/search/tv", {
                params: paramsobj
            });
            //  TWO CALL IN ONE
            axios
                .all([CallMovie, CallSerie])
                .then((resp) => {
                    // SAVE INTO ARRAY IN THE GLOBAL STORE
                    this.store.arrayFilm = resp[0].data.results;
                    this.store.arraySerie = resp[1].data.results;
                })
            // CLEAR INPUT TEXT
            this.store.searchQuery = "";
        },
        searchType() {  // SEARCH FILM WUTH SELECT OPTION AND START WITH RANDON SEARCH WHEN THE OPTION IS DEFAULT
            // CREATE PARAMS
            const paramsobj = { api_key: this.store.apiKey }
            // CONTROL IF OPTION IS DEAFAULT
            if (this.store.currentOption === "default") {
                // SAVE IN TO QUERY PARAMS RANDOM WORD
                paramsobj.query = this.store.randomWord[this.store.randomNumber];
                //  CREATE CALL
                const CallMovie = axios.get("https://api.themoviedb.org/3/search/movie", {
                    params: paramsobj
                });
                const CallSerie = axios.get("https://api.themoviedb.org/3/search/tv", {
                    params: paramsobj
                });
                // TWO CALL IN ONE
                axios
                    .all([CallMovie, CallSerie])
                    .then((resp) => {
                        //  SAVE INTO ARRAY IN THE GLOBAL STORE
                        this.store.arrayFilm = resp[0].data.results;
                        this.store.arraySerie = resp[1].data.results;
                    })
            //  IF SELECT OPTION IS POPULAR OR TOP_RATED CALL FOR SERIES AND FILM ESLE ONLY FILM
            } else if (this.store.currentOption === "popular" || this.store.currentOption === "top_rated") {
                //   chiamata doppia per serie e per film
                const CallMovie = axios.get(`https://api.themoviedb.org/3/movie/${this.store.currentOption}`, {
                    params: paramsobj
                });
                const CallSerie = axios.get(`https://api.themoviedb.org/3/tv/${this.store.currentOption}`, {
                    params: paramsobj
                });
                // TWO CALL IN ONE
                axios
                    .all([CallMovie, CallSerie])
                    .then((resp) => {
                        // SAVE INTO ARRAY IN THE GLOBAL STORE
                        this.store.arrayFilm = resp[0].data.results;
                        this.store.arraySerie = resp[1].data.results;
                    })
            } else {
                //  CALL ONLY FOR FILM
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