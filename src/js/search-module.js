import {autocompliteDebounce} from "./autocomplite";

const serchInput = document.querySelector(".search-module__search");
serchInput.addEventListener("input", autocompliteDebounce);