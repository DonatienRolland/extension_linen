document.addEventListener('DOMContentLoaded', function() {

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {data: 'test'}, function(response) {


      function insertHtml(data) {
        const container = document.getElementById("container")
        console.log("data is", data);
        const container = document.getElementById("container");
        const impact_detail = data.impact_detail_html;
        container.insertAdjacentHTML("beforeend", impact_detail);
        const alternatives = data.alternative_html;
        container.insertAdjacentHTML("beforeend", alternatives);
      }

      if (response) {
        const dataToSend = response.data;
        // Call GET item avec le product_code
        // ->SUCcESS = affiche des data du JSON reçu
        // ->INTROUVZBLE = call POST itms avec le dataToSend ET affiche les data du JSPN reçu

        url = 'http://localhost:3000/api/v1/items/'+dataToSend['product_code']
        fetch(url, { credentials: 'include' })
          .then((response) => {
            console.log("response was", response);
            if(response.ok) {
              console.log("response was ok");
              response.json().then(insertHtml);
            } else {
              fetch("http://localhost:3000/api/v1/items",
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
