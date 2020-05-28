export default class Model {
  getRepositories(str) {
    return fetch(`https://api.github.com/search/repositories?q=${str} in:name&sort=stars`).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("Ошибка HTTP: " + response.status);
      }
    });
  }
}
