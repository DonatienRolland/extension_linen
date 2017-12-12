document.addEventListener('DOMContentLoaded', function() {
  console.log("In DOMContentLoaded");

  window.setTimeout(function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {data: 'test'}, function(response) {

        function errorMessage(data) {
          const container = document.getElementById("container")
          container.insertAdjacentHTML("beforeend", impact_detail);
          const floating = document.getElementById("floating")
          container.insertAdjacentHTML("beforeend", floating);
          const main_desc = document.getElementById("main_desc")
          container.insertAdjacentHTML("beforeend", main_desc);
        }

        function insertHtml(data) {
          const container = document.getElementById("container")
          console.log("data is", data);
          const impact_detail = data.impact_detail_html;
          container.insertAdjacentHTML("beforeend", impact_detail);
          // const alternatives = data.alternative_html;
          // container.insertAdjacentHTML("beforeend", alternatives);

          const addToListBtn = document.getElementById("add-item-to-list")  ;
          console.log(addToListBtn)
          addToListBtn.addEventListener("click", addItemToList);

          const goToLinenListBtn = document.getElementById("go-to-list");
          goToLinenListBtn.addEventListener("click", redirectToLinenList);

          var slider = tns({
            container: '.my-slider',
            items: 1,
            slideBy: 'page',
            // autoplay: true,
            loop: false,
            nav: false,
            controls: false
          });

          const previousAlternative = document.getElementById("previous-arrow");
          previousAlternative.addEventListener("click", (event) => {
            console.log("hello prev");
            slider.goTo('prev')
          });

          const nextAlternative = document.getElementById("next-arrow");
          nextAlternative.addEventListener("click", (event) => {
            console.log("hello next");
            slider.goTo('next')
          });
        }

        console.log('===============');
        console.log(response);

        if (response) {
          const dataToSend = response.data;
          // Call GET item avec le product_code
          // ->SUCcESS = affiche des data du JSON reçu
          // ->INTROUVABLE = call POST itms avec le dataToSend ET affiche les data du JSPN reçu
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

  // activate the redirection to linen list
  const redirectToLinenList = (event) => {
    url = event.currentTarget.href;
    console.log("current link is", url);
    chrome.tabs.create({ url: url });
  }

  // const goToPreviousAlternative = function () {
  //   slider.goTo('prev');
  // };

  // const goToNextAlternative = function () {
  //   slider.goTo('next');
  // };

  }, 3000);
});


