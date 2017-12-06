


const brand_name = document.querySelector('.product-description a:nth-of-type(2) strong').innerText
const product_code = document.querySelector('.product-code span').innerText
const category = document.querySelector('.product-description a:nth-of-type(1) strong').innerText
const percent = document.querySelector('.about-me').innerText.split(" : ")[1].split("%")[0]
const material = document.querySelector('.about-me').innerText.split("%")[1].split(".")[0]
const price = document.querySelector('.current-price').innerText.split(" €")[0]
const image = document.querySelectorAll(".fullImageContainer img")[1].src
  // const image = document.querySelector('div.fullImageContainer img').src
const title = document.querySelector('.product-hero > h1').innerText.split(" - ")[1]

  // const url = 'https://www.linenapp.eu/items'
  // const formatedUrl = url + '?title=' + title.replace(/ /g,"-") + '?product_code=' + product_code.replace(/ /g,"-") + '?category=' + category.replace(/ /g,"-") + '?brand=' + brand_name.replace(/ /g,"-") + '?material_name=' + material_name.replace(/./g, "" ) + ?assembling=' + assembling + '?price=' + price + '?image=' + image
  // return formatedUrl

  const formatedData = {
    brandName: brand_name,
    productCode: product_code,
    category: category,
    assemblings: [
    {
      percent: percent,
      material: { name: name, }
    }],
    price: price,
    image: image,
    title: title
  }

    console.log(JSON.stringify(formatedData))
// How to generate file.json ?
