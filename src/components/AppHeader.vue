<script>
import { store } from "../store"
export default {
    data() {
        return {
            store,
        }
    }
}
</script>

<template>
    <div class="header">
        <div class="container">
            <span>BOOLFLIX</span>

            <div class="search-container">
                <label for="search">trova un film </label>
                <div class="select">
                    <select @change="$emit('changeOption')" v-model="store.currentOption" name="selectType">
                        <option id="selectType" :value="curOption.value" v-for="curOption in store.selectOption">{{ curOption.option }}</option>
                    </select>
                    <input v-model="store.searchQuery" id="search" type="text" placeholder="ricerca..">
                    <button :disabled='store.searchQuery === ""' @click="$emit('searchFilm')">cerca</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../style/partials/variable" as *;
@use "../style/partials/mixin" as *;

//  COMMONS

.container,
.search-container,
.select,
.select div{
    display: flex;
    align-items: center;
}

input,
.header{
    width: 100%;
}

.header {
    position: fixed;
    z-index: 9999;
    height: 17vh;
    background-color: $black;

.container,
.select{
    justify-content: space-between;
}

.search-container,
.select div{
    flex-direction: column;
}

.container span,
.container label{
    color:$red;
}

//  NO COMMONS

    .container {
        height: 100%;
        width: 90%;
        margin: 0 auto;

        span {
            font-weight: 800;
            font-size: clamp(1.5rem, 3vw, 2rem);
        }

        .search-container {
            width: 50%;
            max-width: 300px;
            justify-content: center;
            padding: 10px;
            border: 2px solid $red;
            border-radius: 10px;
            height: 60%;
            select{
                width: 50%;
                margin-right: 3px;
            }
            .select{
                padding: 0;
                margin: 0;
            }
            label {
                margin: 0 4px;
            }
            input {
                width: 50%;
                border: 1px solid black;
                border-right: 0;
                border-top-left-radius: 10px;
                border-bottom-left-radius: 10px;
                outline: 0;
                padding: 1px 11px;
            }
            button {
                border: 0;
                padding: 1px 10px;
                background-color: $red;
                color: $white;
                border-top-right-radius: 10px;
                border-bottom-right-radius: 10px;
            }
        }
    }
}
</style>