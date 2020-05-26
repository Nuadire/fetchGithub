import {
  debounce
} from "./debounce";

function autocomplite(evt) {
  clearAutocomplete();
  if (evt.target.value.length === 0) return;
  const inputSearch = evt.target;
  getGitHubRepo(inputSearch.value).then(data => {
    if (!data) return;
    if (data.items.length === 0) return;
    const containerItems = document.createElement("div");
    containerItems.classList.add("search-module__items");
    containerItems.addEventListener("click", (event) => {
      // add repo
      inputSearch.value = "";
      clearAutocomplete();
      const data = JSON.parse(event.target.dataset.obj);
      document.querySelector(".search-module__container").append(createRepo(data));
    });
    data.items.some((item, ind) => {
      if (ind === 5) return true;
      // add item
      containerItems.appendChild(crateItem(item));
    });
    inputSearch.parentNode.appendChild(containerItems);
  }).catch(err => {
    console.error(err);
  });

  function clearAutocomplete(params) {
    document.querySelectorAll(".search-module__items").forEach(node => node.remove());
  }

  function createRepo(data) {
    const template = document.querySelector(".repo-template").content.cloneNode(true);
    template.querySelector(".repo__text--name").textContent = `Name: ${data.name}`;
    template.querySelector(".repo__text--owner").textContent = `Owner: ${data.owner}`;
    template.querySelector(".repo__text--stars").textContent = `Stars: ${data.stars}`;
    template.querySelector(".close-button").addEventListener("click", (eventClose) => {
      eventClose.target.parentNode.remove();
    });
    return template;
  }

  function crateItem(data) {
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
}

function getGitHubRepo(str) {
  return fetch(
    `https://api.github.com/search/repositories?q=${str} in:name&sort=stars`, {
      //   mode: "no-cors"
      //   credentials: 'include'
    }
  ).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      console.error("Ошибка HTTP: " + response.status);
    }
  });
}

export const autocompliteDebounce = debounce(autocomplite, 400);