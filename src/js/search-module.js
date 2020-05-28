import Model from "./autocomplite/model";
import View from "./autocomplite/view";
import Controller from "./autocomplite/controller";


const autocomplite = new Controller(new Model(), new View("search-module__search"));
autocomplite.start();

