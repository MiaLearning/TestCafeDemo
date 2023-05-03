import loginPage from "../Pages/loginPage.js";
import productsPage from "../Pages/productsPage.js";
const validUserName = 'standard_user';
const validPassword = 'secret_sauce';
const baseUrl = 'https://www.saucedemo.com/';


fixture`Verify sorting options`
    .page(baseUrl)

  //MAKES SENSE: (A TO Z, Z to A, si preturi) sort simplu, click pe optin, luat lista, comparat liste.
    
test(`Sort products by Name (A to Z)`, async t => { 
    await loginPage.typeUserName(validUserName);
    await loginPage.typePassword(validPassword);
    await loginPage.clickOnLoginBttn();
  
    const productTitleElements = await productsPage.productTitle;
    const productTitles = [];
  
    for (let i = 0; i < await productTitleElements.count; i++) {
      const title = await productTitleElements.nth(i).innerText;
      console.log(`Title ${i}: ${title}`);
      productTitles.push(title);
    }
  
    console.log('Product titles: ', productTitles);

    await productsPage.openSortDrop();
    await productsPage.sortByDescending();
    await productsPage.openSortDrop();
    await productsPage.sortByAscending();
    
    const sortedProductTitleElements = await productsPage.productTitle;
    const sortedTitles = [];
    
    for (let i = 0; i < await sortedProductTitleElements.count; i++) {
      const title = await sortedProductTitleElements.nth(i).innerText;
      console.log(`Sorted Title ${i}: ${title}`);
      sortedTitles.push(title);
    }
    
    await t.expect(productTitles).eql(sortedTitles);
    console.log('Sorted product titles:', sortedTitles);
  });

test(`Sort products by Name (Z to A)`, async t => { 
    await loginPage.typeUserName(validUserName);
    await loginPage.typePassword(validPassword);
    await loginPage.clickOnLoginBttn();
  
    const productTitleElem = await productsPage.productTitle;
    const productTitleDef = [];
  
    for (let i = 0; i < await productTitleElem.count; i++) {
      const titles = await productTitleElem.nth(i).innerText;
      console.log(`Title ${i}: ${titles}`);
      productTitleDef.push(titles);
    }
    console.log('Product titles: ', productTitleDef);

    await productsPage.openSortDrop();
    await productsPage.sortByDescending();
    
    const descendingTitles = await productsPage.productTitle;
    const sortedDescTitles = [];
    
    for (let i = 0; i < await descendingTitles.count; i++) {
      const titleDescList = await descendingTitles.nth(i).innerText;
      console.log(`Sorted Title ${i}: ${titleDescList}`);
      sortedDescTitles.push(titleDescList);
    }
    
    await t.expect(productTitleDef).notEql(sortedDescTitles);
    console.log('Sorted product titles:', sortedDescTitles);
  });