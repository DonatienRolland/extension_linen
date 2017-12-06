
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

// function getCurrentTabUrl(callback) {
//   var queryInfo = {
//     active: true,
//     currentWindow: true
//   };

//   chrome.tabs.query(queryInfo, (tabs) => {
//     var tab = tabs[0];
//     var url = tab.url;

//     console.assert(typeof url == 'string', 'tab.url should be a string');
//     callback(url);
//   });

// }


// function changeBackgroundColor(color) {
//   var script = 'document.body.style.backgroundColor="' + color + '";';
//   chrome.tabs.executeScript({
//     code: script
//   });
// }

// function getSavedBackgroundColor(url, callback) {
//   chrome.storage.sync.get(url, (items) => {
//     callback(chrome.runtime.lastError ? null : items[url]);
//   });
// }


// function saveBackgroundColor(url, color) {
//   var items = {};
//   items[url] = color;

//   chrome.storage.sync.set(items);
// }

document.addEventListener('DOMContentLoaded', () => {
  getAlternatives();
  const container = document.getElementById("container");
});

// function getShow(){
//   url = 'http://localhost:3000/api/v1/items/1210863'
//   fetch(url, { credentials: 'include' })
//     .then(response => response.json())
//     .then((data) => {
//       const alternatives = data.alternative_html
//       container.insertAdjacentHTML("beforeend", alternatives)
//     });
// };

function getAlternatives(){
  url = 'http://localhost:3000/api/v1/items/1210863'
  fetch(url, { credentials: 'include' })
    .then(response => response.json())
    .then((data) => {
      const alternatives = data.alternative_html
      container.insertAdjacentHTML("beforeend", alternatives)
    });
};


// document
//   getAlternatives();
