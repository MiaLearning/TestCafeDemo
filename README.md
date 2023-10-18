# TestCafeDemo

- Git commands
 - git pull origin main - Gets the latest version of the main branch (where "main" is the name of my main branch)
 - git checkout -b branchName - Create a new branch with name branchName and switch on that branch ( -b will create a branch / and "branchName" is what you decide to name the branch)
 - git add -A - Adds all modified files to commit
 - git status - Displays the status
 - git commit -m "name of my commit" - Creates the "name of my commit" commit with the previously added files
 - git push origin branchName - Pushes all commits to the branchName branch. Follow the link and create a pull request
 - git checkout main - Switched to main branch

- TestCafe docs: https://testcafe.io/documentation/402665/reference/test-api/testcontroller

- How to run tests: 'npm run test'
- After git push , BIG GREEN BUTTIN 
- User underscores for branch names

Good to know:

// Care e situatia acum? " pas de citit titlu, descriere, pret
//mereu sa ai un pct de comparatie. "
// sa adaugi passi de comparatie in teste. (pcte de referinta in test)
//pass cu pas - pui cimments la inceput de test 
//cum termini, stergi comments. 
//concentrezi la urm pas si unde esti acum. 
// Focus : a intelege lucrurile pe care le scrii si sa nu ma concentrez sa termin testul.
// Sa intelegi tot ce se intampla, acel randomIndex, sau cum ai putea sa-l scrii altfel, sau orice folosesti
// SA fi analitica si sa ma gandesc in mai multe directii.
// Sa incerci sa rezolvi un test in mai multe moduri.
// Sa retii cu ce lucrezi momentan. 
// cum sa construiesti si selectori mai complicati in testcafe: find / nth / withText/ withinText/ 
//pasi specifici in TC. 
//un extra pas: care e situatia acum?"
// In between branches (a new branch ): faci checkout main, pull main, si checkout New branch.
//FUNCTII MICI CARE FAC O CHESTIE> SI BINE DENUMITE .
// Best Practices:
// Using page objects to encapsulate page-specific functionality and selectors,making 
// the tests more readable and maintainable.
// Using the fixture and test functions provided by TestCafe to structure the tests into logical units, improving organization and readability.
// Using faker to generate random data for the test, avoiding hard-coded values that could make the test brittle.
// Using async/await to handle asynchronous code.