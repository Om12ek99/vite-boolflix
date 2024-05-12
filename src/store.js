
import { reactive } from "vue";
export const store = reactive({
    arrayFilm: [],
    arraySerie: [],
    listCastArray:[],
    randomWord:["italia","alien","marvel","amore","inter"],
    randomNumber: 0,
    // activePopup: 0,
    // popup: false,
    searchQuery: "",
    apiKey: "4875e1f3e6e0b3d38e3d893c57795332",   //key per accedere al database
    currentOption: "Default",
    selectOption:[
        {option:"Default", value: "default"},
        {option:"Piu popolari", value: "popular"},
        {option:"Piu votati", value: "top_rated"},
        {option:"Prossimamente", value: "upcoming"},

    ]
})

