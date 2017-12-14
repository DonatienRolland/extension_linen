document.addEventListener('DOMContentLoaded', function() {
  console.log("In DOMContentLoaded");

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {data: 'test'}, function(response) {

      function insertHtml(data) {
        const container = document.getElementById("container")
        console.log("data is", data);
        const impact_detail = data.impact_detail_html;
        container.insertAdjacentHTML("beforeend", impact_detail);

        const addToListBtn = document.getElementById("add-item-to-list")  ;
        console.log(addToListBtn)
        if (addToListBtn) {
          addToListBtn.addEventListener("click", function(e) {
            e.preventDefault();
            addItemToList(e);
          });
        }

        const goToLinenListBtn = document.getElementById("go-to-list");
        if (goToLinenListBtn) {
          goToLinenListBtn.addEventListener("click", redirectToLinenList);
        }

        const goToALternativeBtn = document.querySelector(".alternative-link");
        if (goToALternativeBtn) {
          goToALternativeBtn.addEventListener("click", redirectToAlternative);
        }
        const goToALternativeBtn2 = document.getElementById("btn-alternative-link");
        if (goToALternativeBtn2) {
          goToALternativeBtn2.addEventListener("click", redirectToAlternative);
        }

        var slider = tns({
          container: '.my-slider',
          items: 1,
          slideBy: 'page',
          // autoplay: true,
          loop: false,
          nav: false,
          controls: true,
          controlsText: ['<', '>'],
          loop: true,
          arrowKeys: true
        });
      }

      console.log('===============');
      console.log(response);

      if (response) {
        const dataToSend = response.data;
        // Call GET item avec le product_code
        // ->SUCcESS = affiche des data du JSON reçu
        // ->INTROUVABLE = call POST itms avec le dataToSend ET affiche les data du JSPN reçu
        // http://localhost:3000/api/v1/items/
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
          .then(insertHtml)
      } else {
        console.log("Not there, inject contentscript");
        const containerError = document.getElementById("container-error")
        containerError.style.display = 'block'
        const goToList = document.getElementById("go-to-list")
        goToList.addEventListener("click", redirectToLinenList);
        goToList.style.display = 'block'
      }
    });
  });

  // activate the btn to add and item to linen list
  const addItemToList = (event) => {
    console.log(event)
    fetch("http://localhost:3000/selections", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ item_id: event.target.dataset.value })
    })
      .then((response) => {
        console.log("update btn");
        const changeBtn = document.querySelector("#add-item-to-list")
        .outerHTML = "<p class='added' ><em>Added to your selection !</em></p>"
     })
      .then((data) => {
        console.log(data.hits); // Look at local_names.default
      });
  }

  // activate the redirection to linen list
  const redirectToLinenList = (event) => {
    url = event.currentTarget.href;
    console.log("current link is", url);
    chrome.tabs.create({ url: url });
  }
  // activate the redirection to linen list
  const redirectToAlternative = (event) => {
    url = event.currentTarget.href;
    console.log("current link is", url);
    chrome.tabs.create({ url: url });
  }
});
