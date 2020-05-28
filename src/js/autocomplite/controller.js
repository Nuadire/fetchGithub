import {
  debounce
} from "../debounce";

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // this.autocomplite.bind(this);
    // this.start.bind(this);
  }

  start() {
    const autocompliteDebounce = debounce(this.autocomplite.bind(this), 400);
    this.view.listenField(autocompliteDebounce);
  }

  async autocomplite (evt) {
    this.view.clearAutocomplete();
    const inputSearch = evt.target;
    if (inputSearch.value.length === 0) return;
    try {
      const data = await this.model.getRepositories(inputSearch.value);
      if (!data) return;
      if (data.items.length === 0) return;
      const containerItems = this.view.createContainerItems(inputSearch);
      const arrItems = [];
      data.items.some((item, ind) => {
        if (ind === 5) return true;
        arrItems.push(this.view.crateItem(item));
      });
      this.view.display(inputSearch, containerItems, arrItems);
    } catch (error) {
      console.error(error);
    }
  }
}
