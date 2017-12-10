document.addEventListener('DOMContentLoaded', function() {

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {data: 'test'}, function(response) {

      function insertHtml(data) {
        console.log("data is", data);
        const container = document.getElementById("container");
        const impact_detail = data.impact_detail_html;
        container.insertAdjacentHTML("beforeend", impact_detail);
        const alternatives = data.alternative_html;
        container.insertAdjacentHTML("beforeend", alternatives);
      }

      console.log('===============');
      console.log(response);

      if (response) {
        const dataToSend = response.data;
        // Call GET item avec le product_code
        // ->SUCcESS = affiche des data du JSON reçu
        // ->INTROUVABLE = call POST itms avec le dataToSend ET affiche les data du JSPN reçu

        url = 'http://www.linenapp.eu/api/v1/items/'+dataToSend['product_code']
        fetch(url, { credentials: 'include' })
          .then((response) => {
            console.log("response was", response);
            if(response.ok) {
              console.log("response was ok");
              response.json().then(insertHtml);
            } else {
              fetch("http://www.linenapp.eu/api/v1/items",
              {
                method: "POST",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
              })
              .then(response => response.json())
              .then(insertHtml)
            }
          })
          // .catch(function(data){
          //   console.error( data );
          // });
      } else {
        console.log("Not there, inject contentscript");
      }
    });
  });
});


// activate the btn to add and item to linen list
const addItemToList = (event) => {
  fetch("http://localhost:3000/selections", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query: event.currentTarget.value })
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data.hits); // Look at local_names.default
    });
}

const addToListBtn = document.getElementById("add-item-to-list");
addToListBtn.addEventListener("click", addItemToList);

// activate the redirection to linen list
const redirectToLinenList = (event) => {
  fetch("http://localhost:3000/selections")
}

const goToLinenListBtn = document.getElementById("Go-to-list");
goToLinenListBtn.addEventListener("click", redirectToLinenList);
