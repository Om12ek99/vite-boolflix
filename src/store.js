
import { reactive } from "vue";
export const store = reactive({
    arrayFilm: [],         //array dei film vuoto
    arraySerie: [],       //array delle serie tv vuoto
    searchQuery: "ciao", // stringa di testo che miserve per cercare un valore
    apiKey: "4875e1f3e6e0b3d38e3d893c57795332",   //key per accedere al database
})