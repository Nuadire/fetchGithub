export default class View {
  constructor(fieldClass) {
    this.rootField = fieldClass;
  }

  createContainerItems(inputSearch) {
    const containerItems = document.createElement("div");
    containerItems.classList.add("search-module__items");
    containerItems.addEventListener("click", (evt) => {
      inputSearch.value = "";
      this.clearAutocomplete();
      const data = JSON.parse(evt.target.dataset.obj);
      document.querySelector(".search-module__container").append(this.createRepo(data));
    });
    return containerItems;
  }

  createRepo(data) {
    const template = document.querySelector(".repo-template").content.cloneNode(true);
    template.querySelector(".repo__text--name").textContent = `Name: ${data.name}`;
    template.querySelector(".repo__text--owner").textContent = `Owner: ${data.owner}`;
    template.querySelector(".repo__text--stars").textContent = `Stars: ${data.stars}`;
    template.querySelector(".close-button").addEventListener("click", (eventClose) => {
      eventClose.target.parentNode.remove();
    });
    return template;
  }

  crateItem(data) {
    const itemNode = document.createElement("div");
    itemNode.classList.add("search-module__item");
    itemNode.textContent = data.name;
    itemNode.dataset.obj = JSON.stringify({
      name: data.name,
      owner: data.owner.login,
      stars: data.stargazers_count
    });
    return itemNode;
  }

  display(inputSearch, containerItems, items) {
    containerItems.append(...items);
    inputSearch.parentNode.appendChild(containerItems);
  }

  clearAutocomplete() {
    document.querySelectorAll(".search-module__items").forEach(node => node.remove());
  }

  listenField(fn) {
    const serchInput = document.querySelector("." + this.rootField);
    serchInput.addEventListener("input", fn);
  }
}
