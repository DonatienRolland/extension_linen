document.addEventListener('DOMContentLoaded', () => {
  getShow();
  getAlternatives();
  const container = document.getElementById("container");
});

function getShow(){
  url = 'http://localhost:3000/api/v1/items/1210863'
  fetch(url, { credentials: 'include' })
    .then(response => response.json())
    .then((data) => {
      const impact_detail = data.impact_detail_html
      container.insertAdjacentHTML("beforeend", impact_detail)
    });
};

function getAlternatives(){
  url = 'http://localhost:3000/api/v1/items/1210863'
  fetch(url, { credentials: 'include' })
    .then(response => response.json())
    .then((data) => {
      const alternatives = data.alternative_html
      container.insertAdjacentHTML("beforeend", alternatives)
    });
};

