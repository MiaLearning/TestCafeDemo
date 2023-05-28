import loginPage from "../Pages/loginPage.js";
import productsPage from "../Pages/productsPage.js";
import { validUser } from "../Pages/users.js";
const baseUrl = 'https://www.saucedemo.com/';


fixture`Verify sorting options`
    .page(baseUrl)

    
test(`Sort products by Name (A to Z)`, async (t) => {
  await loginPage.signIn(validUser);

  const initialTitles = await productsPage.getProductTitles(); 
  const copyTitles = [...initialTitles].sort();

  await productsPage.openSortDrop();
  await productsPage.sortByAscending();

  const ascendingTitles = await productsPage.getProductTitles();

  await t.expect(copyTitles).eql(ascendingTitles);
});


test(`Sort products by Name (Z to A)`, async t => { 
    await loginPage.signIn(validUser);
  
    const myInitialTitles = await productsPage.getProductTitles();
    const sortedInitial = myInitialTitles.sort().reverse();

    await productsPage.openSortDrop();
    await productsPage.sortByDescending();

    const myDesTitles = await productsPage.getProductTitles();
    
    await t.expect(sortedInitial).eql(myDesTitles);
  }); 


test(`Sort products by Price (Low to High)`, async t => {
  await loginPage.signIn(validUser);

  const pricesList = await productsPage.getProductPrices();
  const sortedPricesList = [...pricesList].map(price => parseFloat(price.slice(1))).sort((a, b) => a - b); 

  await productsPage.openSortDrop();
  await productsPage.sortLowPrice();

  const LowHPricesList = await productsPage.getProductPrices();

  await t.expect(LowHPricesList).eql(sortedPricesList.map(price => `$${price.toFixed(2)}`));
});


test(`Sort products by Price (High to Low)`, async t => {
  await loginPage.signIn(validUser);

  const pricesList = await productsPage.getProductPrices();
  const sortedPricesList = [...pricesList].map(price => parseFloat(price.slice(1))).sort((a, b) => b - a);
  
  await productsPage.openSortDrop();
  await productsPage.sortHighPrice();

  const HighLPricesList = await productsPage.getProductPrices();

  await t.expect(HighLPricesList).eql(sortedPricesList.map(price => `$${price.toFixed(2)}`));
});