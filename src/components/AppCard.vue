<script>
import { computed } from 'vue';
import { store } from "../store";

export default {
    data() {
        return {
            flag: ["en", "it", "es", "fr"],
            maxValue: 5,
            store,
            isDecimal: false,
            valutationLess: 0,
            valutationPlus: 0,
        }
    },
    props: {
        cardObj: Object,
        cardCast: Number,
        ind: Number,
    },
    created() {
        // CREATE KEY POPUP FOR ALL CARD IN TO ARRAY
        this.cardObj.popup = false;
    },
    computed: {
        Image() {
            // TO CREATE DYNAMIC IMAGE
            return `https://image.tmdb.org/t/p/w342${this.cardObj.poster_path}`;
        },
        titleFilm() {
            // RETURN ORIGINAL_TITLE OR ORIGINAL_NAME IF IS FILM OR SERIE
            return this.cardObj.original_title ? this.cardObj.original_title : this.cardObj.original_name;
        },
        title() {
            // RETURN TITLE OR NAME IF IS FILM OR SERIE
            return this.cardObj.title ? this.cardObj.title : this.cardObj.name;
        },
        valutation() {
            // TRASFORM AVERAGE BETWEEN 1 AND 5
            Math.round(this.cardObj.vote_average) / 2 % 1 ? this.isDecimal = true : this.isDecimal = false;
            return Math.floor(this.cardObj.vote_average / 2);
        },
    },
    methods: {
        // CREATE URL FOR FLAG
        getImage(name) {
            if (this.flag.includes(name)) {
                return new URL(`../assets/img/${name}.png`, import.meta.url).href;
            } else {
                return new URL(`../assets/img/int.png`, import.meta.url).href;
            }
        }
    }
}
</script>

<template>
    <div @click="flip = !flip" class="card-container">
        <!-- front -->
        <div class="front-card">
            <img :src="`${Image}`" alt="">
        </div>
        <!-- /front -->

        <!-- back -->
        <div class="back-card">
            <span class="text-red">Titolo originale:</span>
            <span>{{ titleFilm }}</span>
            <span class="text-red">Titolo:</span>
            <span>{{ title }}</span>
            <span class="text-red">Lingua:</span>

            <!--  flag -->
            <div class="cont-language">
                <img :src="getImage(cardObj.original_language)">
                <button class="btn-cast" @click="$emit('cast', cardObj, ind)">vedi cast</button>
            </div>
            <!--  /flag -->

            <!-- trailer -->
            <div v-if="cardObj.overview" class="overview">
                <span class="text-red">Trama:</span>
                <div class="overview-text">
                    <span>{{ cardObj.overview }}</span>
                </div>
            </div>
            <!-- trailer -->


            <!-- star -->
            <div class="rating">
                <span>Voto:</span>
                <!-- full star if isDecimal or not -->
                <span class="text-gold" v-for="i in valutation">
                    <i class="fa-solid fa-star"></i>
                </span>
                <!-- half star if isDecimal -->
                <span class="text-gold">
                    <i v-show="isDecimal" class="fa-solid fa-star-half-stroke"></i>
                </span>

                <!-- empy star if is Decimal  -->
                <span v-if="isDecimal" v-for="i in maxValue - 1 - valutation">
                    <i class="fa-regular fa-star"></i>
                </span>

                <!-- empy star if is Decimal  -->
                <span v-if="!isDecimal" v-for="i in maxValue - valutation">
                    <i class="fa-regular fa-star"></i>
                </span>
            </div>
            <!-- /star -->

            <!-- cast -->
            <div class="overlay" v-show="cardObj.popup === true">
                <h2 v-if="this.store.listCastArray.length === 0"> NESSUNA LISTA ATTORI PRESENTE</h2>
                <ul>
                    <li v-for="curName in this.store.listCastArray"> {{ curName.name }}</li>
                </ul>
            </div>
            <!-- /cast -->

        </div>
        <!-- /back -->

    </div>

</template>

<style lang="scss" scoped>
@use "../style/partials/variable" as *;
@use "../style/partials/mixin" as *;

// COMMONS

.card-container,
.back-card,
.front-card,
.overlay,
.front-card img {
    width: 100%;
    height: 100%;
}

.card-container,
.front-card {
    position: relative;
}

.back-card,
.rating,
.overlay,
.btn-cast {
    position: absolute;
}

.back-card,
.overlay {
    top: 0;
    left: 0;
}

.back-card,
.cont-language,
.rating {
    display: flex;
}

.back-card,
.overlay,
.overlay ul {
    padding: 10px;
}

.overlay,
.overview-text {
    overflow-y: auto;
    scrollbar-width: none;
}

.rating,
.btn-cast {
    color: $black;
}

.back-card .overlay,
.btn-cast:hover {
    color: $white;
}

.back-card,
.front-card:hover {
    opacity: 0;
}

.front-card:hover,
.back-card:hover {
    transition: 1;
}

.card-container:hover .front-card,
.back-card {
    transform: rotateY(180deg);
}

// NO COMMONS
.card-container {

    .back-card,
    .front-card {
        transform-style: preserve-3d;
        transition: 1s;
        border-radius: 20px;
    }

    .front-card {
        z-index: -1;
    }

    .back-card {
        flex-direction: column;
        background-color: $lightgrey;

        .cont-language {
            justify-content: space-between;
            align-items: center;
        }

        img {
            width: 30px;
        }

        span {
            font-size: 0.65rem;
            display: block;
        }

        .rating {
            bottom: 5px;
            right: 15px;
            i,span{
                font-size: 15px;
            }
        }

        .overlay {
            background-color: rgba($color: #000000, $alpha: 0.9);
            z-index: 9999;
            border-radius: 20px;
            text-align: center;

            ul {
                list-style: none;
                line-height: 20px;
            }
        }

        .overview {
            overflow-y: hidden;

            .overview-text {
                width: 100%;
                flex-grow: 1;
                height: 150px;
                display: inline-block;

                span {
                    font-size: 13px;
                }
            }
        }

        .btn-cast {
            bottom: 100%;
            right: 5%;
            border: 2px solid $black;
            background-color: $white;
            padding: 5px;
            border-radius: 10px;

            &:hover {
                background-color: $blue;
                border: 2px solid $black;
            }
        }
    }

    .front-card img {
        border-radius: 20px;
    }

    &:hover {

        .back-card {
            transform: rotateY(360deg);
            opacity: 1;
        }
    }
}
</style>