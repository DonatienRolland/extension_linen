chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  console.log("DOM fully loaded and parsed");

  console.log("my formated data:");

  const title = document.querySelector('.product-hero > h1').innerText.split(" - ")[1]
  const category = document.querySelector('.product-description a:nth-of-type(1) strong').innerText
  const product_code = document.querySelector('.product-code span').innerText
  const price = document.querySelector('.current-price').innerText.split(" €")[0]
  const url = window.location.href
  const image = document.querySelectorAll('.fullImageContainer img')[1].src
  const brand_name = document.querySelector('.product-description a:nth-of-type(2) strong').innerText
  const gender = document.querySelector('#bc2').innerText
  // const name = document.querySelector('.about-me').innerText.split("%")[1].split(".")[0].replace(/^\s+/g, '')
  // const percent = document.querySelector('.about-me').innerText.split(" : ")[1].split("%")[0]

  console.log("YOOOOOO");
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
    // assemblings: [{
    //   percent: percent,
    //   material: { name: name },
    // }],
    assemblings: assemblings
  }

  // console.log(JSON.stringify(formatedData));
  sendResponse({data: formatedData});
});
// const url = 'https://www.linenapp.eu/items'
// const formatedUrl = url + '?title=' + title.replace(/ /g,"-") + '?product_code=' + product_code.replace(/ /g,"-") + '?category=' + category.replace(/ /g,"-") + '?brand=' + brand_name.replace(/ /g,"-") + '?material_name=' + material_name.replace(/./g, "" ) + ?assembling=' + assembling + '?price=' + price + '?image=' + image
// return formatedUrl
