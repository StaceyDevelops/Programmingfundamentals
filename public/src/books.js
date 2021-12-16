function findAuthorById(authors, id) {
  return authors.find(author => author.id === id)
}

function findBookById(books, id) {
  return books.find(book => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  return books.reduce((acc, book) => {
    const [borrowed, returned] = acc;
    const recent = book.borrows[0];

    if(recent.returned) {
      returned.push(book)
    } else {
      borrowed.push(book)
    }

    return acc;
  }, [[], []])
}

function getBorrowersForBook(book, accounts) {
  let result = book.borrows.map((borrows) => 
  { let account = accounts.find((account) => account.id === borrows.id); 
    return { ...borrows, ...account }; }); 
    return result.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
