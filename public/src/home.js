// - An array of book objects.
// It returns a _number_ that represents the number of 

const { partitionBooksByBorrowedStatus } = require("./books");

// book objects inside of the array.
function getTotalBooksCount(books) {
  return books.length;
}

// - An array of accounts.
// It returns a _number_ that represents the number of 
// account objects inside of the array.
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

//iterate through the array
//if .filter() already creates an array do i need to still use push?
// would i need to use .length in this function?
function getBooksBorrowedCount(books) {
  return books.filter((book)=> {
    const [recent] = book.borrows;
    // book.returned === false
    return !recent.returned;
  }).length;
}

// Helper function
function _sortObj(obj) {
  const keys = Object.keys(obj);
  return keys.sort((firstKey, secondKey) => {
    if(obj[firstKey] > obj[secondKey]) {
      return -1;
    } else if(obj[firstKey] < obj[secondKey]) {
      return 1;
    } else {
      return 0;
    }
  });
}

//map to change array 
//sort to order from most common to least common
//.pop or .slice?
function getMostCommonGenres(books) {
  // let result = books.map((book) => book.genres)
  const count = books.reduce((acc, { genre}) => {
    if (acc[genre]) {
      acc[genre] += 1;
    } else {
      acc[genre] = 1;
    }
    return acc;
  }, {});

  const sortedData = _sortObj(count);
  return sortedData.map((name)=> ({
    name, count: count[name]
  })).slice(0, 5);
}
//
function getMostPopularBooks(books) {
  const groupById = books.reduce((acc, { id, borrows }) => {
    acc[id] = borrows.length;
    return acc;
  }, {});

  const sortedData = _sortObj(groupById);
  return sortedData.map((id)=> {
    const { title: name } = books.find(({ id: bookId }) => bookId === id);

    return { name, count: groupById[id] };
  }).slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const count = books.reduce((acc, { authorId, borrows }) => {
    if (acc[authorId]) {
      acc[authorId].push(borrows.length);
    } else {
      acc[authorId] = [borrows.length];
    }

    return acc;
  }, {});

  for(let id in count) {
    const sumValues = count[id].reduce((first, second) => first + second);
    count[id] = sumValues;
  }

  const sortedData = _sortObj(count);

  return sortedData.map((authorId) => {
    const { 
      name: { first, last },
    } = authors.find(({ id }) => id === Number(authorId));

    const name = `${first} ${last}`;
    
    return { name, count: count[authorId] };
  }).slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
