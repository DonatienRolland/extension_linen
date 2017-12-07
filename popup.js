
document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {data: 'test'}, function(response) {
      if (response) {
        const dataToSend = response.data;
        fetch("http://localhost:3000/api/v1/items",
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSend)
        })
        .then(function(res){
          console.log(res.statusText);
        })
        .catch(function(data){
          console.error( data )
        });
      } else {
        console.log("Not there, inject contentscript");
      }
    });
  });
});

/////////////////// Relation from Rails ///////////////
document.addEventListener('DOMContentLoaded', () => {
  getAlternatives();
  // getShow();
  const container = document.getElementById("container");
});

// test product_order : 1191283 or 1210864 or 1008623
function getShow(){
  url = 'http://localhost:3000/api/v1/items/1210864'
  fetch(url, { credentials: 'include' })
    .then(response => response.json())
    .then((data) => {
      const impact_detail = data.impact_detail_html
      container.insertAdjacentHTML("beforeend", impact_detail)
    });
};

function getAlternatives(){
  url = 'http://localhost:3000/api/v1/items/1210864'
  fetch(url, { credentials: 'include' })
    .then(response => response.json())
    .then((data) => {
      const alternatives = data.alternative_html
      container.insertAdjacentHTML("beforeend", alternatives)
    });
};

/////////////////////////////////////////////////////////
