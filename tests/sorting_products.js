import loginPage from "../Pages/loginPage.js";
import productsPage from "../Pages/productsPage.js";
import { validUser } from "../Pages/users.js";
const baseUrl = 'https://www.saucedemo.com/';


fixture`Verify sorting options`
    .page(baseUrl)

    
test(`Sort products by Name (A to Z)`, async (t) => {
  await loginPage.signIn(validUser);

  const initialTitles = await productsPage.getProductTitles(); 

  await productsPage.openSortDrop();
  await productsPage.sortByAscending();

  const copyTitles = [...initialTitles];
  const ascendingTitles = copyTitles.sort();

  await t.expect(initialTitles).eql(ascendingTitles);
});


test(`Sort products by Name (Z to A)`, async t => { 
    await loginPage.signIn(validUser);
  
    const myInitialTitles = await productsPage.getProductTitles();
    const sortedInitial = myInitialTitles.sort();
    const reversed = sortedInitial.reverse();

    await productsPage.openSortDrop();
    await productsPage.sortByDescending();

    const myDesTitles = await productsPage.getProductTitles();
    
    await t.expect(reversed).eql(myDesTitles);
  }); 

  //Next: price sorting. 
  //citeste atributel la selector. nu trebuie sa folosesti await inainte de this. 
  //cand ceri atribute atunci aceleas sunt functii asincron si trebuie sa folosesti await 
  //sa intelegi cu ce date lucrezi. Nu poti folosi find pe un nr,
  // mai fa niste edabit 