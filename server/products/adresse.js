﻿/* eslint-disable no-console, no-process-exit */
const adresse = require('../sources/adresse');

async function sandbox (eshop = 'https://adresse.paris/630-toute-la-collection') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = [];
    let newProducts = [];

    let nbNewProducts = -1;
    let page = 1; 

    while (nbNewProducts != 0){
        const scrapedProducts = await adresse.scrape(eshop + `?p=${page}`);

        if (page === 1){
            // if we are on the first page, we take all the products
            newProducts = scrapedProducts;
        } else {
            // if we are not on the first page, we take only the product which name are not already in the products' list
            newProducts = scrapedProducts.filter(product => {
            return products.map(p => p.name).includes(product.name) === false;
            })
        }

        // Add a new property brand to each object in the list
        newProducts.forEach(product => {
          product.brand = 'adresseparis'
        });
        // Count number of new product
        nbNewProducts = newProducts.length;

        console.log(`Page ${page} processed with ${nbNewProducts} new products`);
        if (nbNewProducts != 0){
            products.push(...newProducts);
            // console.log('New products:');
            // console.log(newProducts);
            page++;
        }
    }

    console.log(`Adresseparis has been scrapped with ${products.length} products`);
    //console.log('All products: ');
    //console.log(products);
    
    return products;

    //process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;
//sandbox(eshop);

module.exports.getProducts = sandbox();