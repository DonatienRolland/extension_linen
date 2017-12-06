function getProductInfos() {
  const brand_name = document.querySelector('.a:nth-of-type(2) strong').innerText
  const product_code = document.querySelector('.product-code span').innerText
  const category = document.querySelector('.product-description a:nth-of-type(1) strong').innerText
  const assembling = document.querySelector('.about-me').innerText.split(" : ")[1].split("%")[0]
  const material_name = document.querySelector('.about-me').innerText.split("%")[1]
  const price = document.querySelector('.current-price').innerText
  const image = document.querySelector('.amp-page amp-spin').innerText
  const title = document.querySelector('.product-hero > h1').innerText.split(" - ")[1]

  const url = 'https://www.linenapp.eu/products'
  const formatedUrl = url + '?title=' + title.replace(/ /g,"-") + '?product_code=' + product_code.replace(/ /g,"-") + '?category=' + category.replace(/ /g,"-") + '?brand=' + brand_name.replace(/ /g,"-") + ?material_name=' + material_name.replace(/ /g,"-") + ?assembling=' + assembling.replace(/ /g,"-") + '?price=' + price.replace(/ /g,"-") + '?image=' + image.replace(/ /g,"-")
  return formatedUrl
};
// link formateUrl to ajax
// save to database
