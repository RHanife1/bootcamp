const port = 5000;
const app = require('./app');
const bodyParser = require('body-parser');
//const router = express.Router();
const { response } = require('./app');

let library = [];
let sortByTitleLibrary = [];

let bookCount = 0;

app.listen(port, () => {
  console.log(`Server is running, listening on port ${port}`);

  

  app.use(bodyParser.json({ extended: true }));

  app.post('/api/books', (req, res) => {
    /*call function to add book*/
    console.log(req.body);
    const response = addBook(req.body);
    
    // res.setHeader('Content-Type', 'application/json');

    console.log(response);
    res.sendStatus(201).json(response);
  
  });
  
  app.get('/api/books', (req, res) => {
    sortByTitleLibrary = retrieveAllBooks();
    res.sendStatus(200).json(sortByTitleLibrary);
  });

  app.delete('/api/books', (req, res) => {
    deleteAllBooks();
    res.sendStatus(204);
    console.log("All books deleted");
  });
  
});

//HTTP POST
function addBook(book) {
  
  let bookWithID;

  bookCount = bookCount + 1;
  bookWithID = book;

  bookWithID.id = bookCount;
  library.push(bookWithID);

  return bookWithID;
}

//HTTP GET
function retrieveAllBooks() {
  
  //based on ID retrieve array element
  function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
  } 

  return library.sort(GetSortOrder("title"));

}

//HTTP DELETE
function deleteAllBooks() {
  library = [];
  bookCount = 0;
  return;
}