<script>
import AppCard from "./AppCard.vue";
import axios from "axios";
import { store } from '../store';
import { popScopeId } from "vue";
export default {
    components: {
        AppCard,
    },
    data() {
        return {
            store,
        }
    },
    methods: {
        searchCast(curElem, curInd) {
            store.listCastArray = "";
            let FioSe = "";
            const paramsobj = {
                api_key: this.store.apiKey,
            }

            curElem.popup = !curElem.popup;

            
            if (curElem.title) {
                FioSe = "movie";
            } else {
                FioSe = "tv"
            }
          

            axios.get(`https://api.themoviedb.org/3/${FioSe}/${curElem.id}/credits`, {
                params: paramsobj
            }).then((resp) => {
                store.listCastArray = resp.data.cast;
            });

            
            setTimeout(function () {
                if (FioSe === "movie") {
                    store.arrayFilm[curInd].popup = false;
                } else {
                    store.arraySerie[curInd].popup = false;
                }
            }, 4500);
        }
    }
}
</script>

<template>
    <div class="container-film-serie">

        <!-- FILM -->
        <div v-if="store.arrayFilm.length > 0">
            <div class="header-container">
                <span>Film</span>
                <span>Trovati {{ store.arrayFilm.length }} Elementi</span>
            </div>
            <div class="container" v-show="this.store.arrayFilm.length !== 0">
                <div v-show="curFilm.poster_path" class="card" v-for="curFilm, index in store.arrayFilm">
                    <AppCard @cast="searchCast" :cardObj="curFilm" :ind="index" />
                </div>
            </div>
        </div>
        <!-- /FILM -->

        <!-- SERIE -->
        <div v-if="store.arraySerie.length > 0">
            <div class="header-container">
                <span>Serie</span>
                <span>Trovati {{ store.arrayFilm.length }} Elementi</span>
            </div>
            <div class="container" v-show="this.store.arrayFilm.length !== 0">
                <div v-show="curSerie.poster_path" class="card" v-for="curSerie, index in store.arraySerie">
                    <AppCard @cast="searchCast" :cardObj="curSerie" :ind="index" />
                </div>
            </div>
        </div>
        <!-- /SERIE -->

    </div>
</template>

<style lang="scss" scoped>
@use "../style/partials/variable" as *;
@use "../style/partials/mixin" as *;

//  COMMONS

.container-film-serie,
.header-container,
.container {
    display: flex;
}

//  NO COMMONS
.container-film-serie {
    padding: 20px;
    padding-top: 100px;
    margin-bottom: 30px;
    flex-direction: column;

    .header-container {
        margin: 30px;
        justify-content: space-between;
        align-items: center;

        span:last-child {
            font-size: 23px;
        }
    }

    span {
        text-align: right;
        font-size: 40px;
        color: $white;
    }

    .container {
        justify-content: flex-start;
        gap: 10px;
        flex-wrap: wrap;

        .card {
            width: calc(100% / 5 - 40px / 5);

            @media screen and (max-width: 968px) {
                width: calc(100% / 3 - 20px / 3);
            }

            @media screen and (max-width: 768px) {
                width: calc(100% / 2 - 10px);
            }
        }
    }
}
</style>