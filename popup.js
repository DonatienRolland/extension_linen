
// function getLinenApp(){
//   const body = document.querySelector('body');
//   fetch("https://")
//   .then(response => response.text());
//   .then((html) => {
//     const item = element.querySelector('');
//     body.insertAdjacentHTML("beforeend", item);
//   });
// };

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
