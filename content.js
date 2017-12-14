chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

  const title = document.querySelector('.product-hero > h1').innerText.split(" - ")[1]
  const category = document.querySelector('.product-description a:nth-of-type(1) strong').innerText
  const product_code = document.querySelector('.product-code span').innerText
  const price = document.querySelector('.current-price').innerText.split(" €")[0]
  const url = window.location.href
  const image = document.querySelectorAll('.fullImageContainer img')[1].src
  const brand_name = document.querySelector('.product-description a:nth-of-type(2) strong').innerText
  const womanCategory = document.querySelector("[data-reactid='31']");
  let gender;
  if (womanCategory.classList.contains("_2O3Pt9j")) {
    gender = "woman"
  } else {
    gender = "man"
  }

  let assemblings = [];
  document.querySelector('.about-me').innerText.split(":")[1].split(",").forEach(function(assembling){
    assemblings.push({
      percent: assembling.split("%")[0].trim(),
      material: { name: assembling.split("%")[1].trim().replace(/\.$/, "") }
    })
  });

  const formatedData = {
    title: title,
    category: category,
    price: price,
    product_code: product_code,
    gender: gender,
    photo: image,
    url: url,
    brand: { name: brand_name },
    assemblings: assemblings
  }

  console.log("I am in content.js BLAH")
  sendResponse({data: formatedData});
});
