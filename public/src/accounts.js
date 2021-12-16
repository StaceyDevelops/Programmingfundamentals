
// - An array of account objects.
// - A string ID of a single account object.
// It returns the account object that has the matching ID.
function findAccountById(accounts, id) {
  // looking into the accounts to see which id matches
  return accounts.find(account => account.id === id);
}

// - An array of account objects.
// It returns a sorted array of the provided account 
// objects. The objects are sorted alphabetically by last name.

// .sort [11,2,22,1].sort((a, b) => a - b)
  // Sorts an array in place. This method mutates the array and 
  // returns a reference to the same array.
function sortAccountsByLastName(accounts) {

  // iterate/loop over accounts to look at names
    // create two variables to use when iterating/looping
  return accounts.sort((account1, account2) => {

    // grab the name "last" from the account variables created & lowercase
    // store the above pseudocode as variables ex: let last1 / last2 = account1.name.last.toLowerCase(); 
    let last1 = account1.name.last.toLowerCase();
    let last2 = account2.name.last.toLowerCase();

    // comparing our above varialbe to the direction we're wanted sorted -1, 0, 1
    return last1 > last2 ? 1 : -1;
  })
}

// - An account object.
// - An array of all book objects.

// It returns a _number_ that represents the number of times 
// the account's ID appears in any book's `borrows` array.
function getTotalNumberOfBorrows(account, books) {
  // iterate/loop over our books objects
  return books.reduce((acc, book) => { // 0, 1, 2, 3
    // create variable to use "count" when a book is borrowed
    let count = book.borrows.reduce((borrowAcc, borrow) => {
      // look at the id of the borrows and compare to account.id, add if borrowed, 
      // else return 0 bc it's not borrowed.
      return borrow.id === account.id ? borrowAcc + 1 : borrowAcc;
    }, 0);
    console.log("count on line 47", count);

    // return the acc value + count value
    return acc + count;
  }, 0)
}

// - An account object.
// - An array of all book objects.
// - An array of all author objects.

// It returns an array of book objects, including author information, 
// that represents all books _currently checked out_ by the given account. 
// _Look carefully at the object below,_ as it's not just the book object; the author object is nested inside of it.
function getBooksPossessedByAccount(account, books, authors) {
  return books
    .filter((book) => {
      let recent = book.borrows[0];
      return !recent.returned && recent.id === account.id;
    })
    .map((book) => {
      let author = authors.find(author => author.id === book.authorId);
      return { ...book, author };
    });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
