require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');  // to parse/read our entire body into a json format
const database = require('./database/database');

const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");
const { findOne, findOneAndUpdate } = require("./database/book");

const booky = express();

booky.use(bodyParser.urlencoded({extended: true}));  // the url can contain any kindof object or string or anytype
booky.use(bodyParser.json());
// booky.use(express.urlencoded({extended: true}));
// booky.use(express.json());


//mongoose acts as intermediate b/w us and mongoDB ,if converts json code to understandable lang for mongoDB
mongoose.connect(process.env.MONGO_URL,  // connecting mongoose to mongoDb 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}
).then(()=> console.log("Connection Established")); //once our connection has been established the console log this 


//All books.....................................

// route         :   /
//  description  :   get all books
//  access       :   PUBLIC
// Parameter     :   none
// methods used  :   get 

// booky.get("/", (req, res) =>{
//     return res.json({books : database.books});
// });

booky.get("/", async(req,res)=>{
    const getAllBooks = await BookModel.find();
    return res.json((getAllBooks));
});


// Books with particular ISBN number...............................

// route         :   /is/
//  description  :   get the book with ISBN
//  access       :   PUBLIC
// Parameter     :   ISBN
// methods used  :   get 

// booky.get("/is/:isbn", (req, res) =>{
//     const getSpecificBook = database.books.filter(
//         (book) => book.ISBN === req.params.isbn
//     );
//     if(getSpecificBook.length === 0){
//         return res.json({error: `No book found for the ISBN : ${req.params.isbn}`})
//     }; 
//     return res.json({book: getSpecificBook});
// });

booky.get("/is/:isbn",async (req, res) =>{
    const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn}); // find the one which has ISBN same as req.params.isbn

    if(!getSpecificBook){  // if getSpecificBook is not true
        return res.json({error: `No book found for the ISBN : ${req.params.isbn}`})
    }; 
    return res.json({book: getSpecificBook});
});



// Books with particular category...............................

// route         :   /c/
// description   :   get all books with particular category
// access        :   PUBLIC
// Parameter     :   category
// methods used  :   get 

// booky.get("/c/:category", (req, res) =>{
//     const getSpecificBook = database.books.filter(
//         (book) => book.Category.includes(req.params.category)
//     );
//     if(getSpecificBook.length === 0){
//         return res.json({error: `No book found for the Category : ${req.params.category}`})
//     }; 
//     return res.json({book: getSpecificBook}); 
// });

booky.get("/c/:category",async (req, res) =>{
    const getSpecificBook = await BookModel.findOne({Category: req.params.category});
    if(!getSpecificBook){
        return res.json({error: `No book found for the language : ${req.params.category}`})
    }; 
    return res.json({book: getSpecificBook});
});



// Books with particular language...............................

// route         :   /lan/
// description   :   get all books with particular language
// access        :   PUBLIC
// Parameter     :   language
// methods used  :   get 

// booky.get("/lan/:language", (req, res) =>{
//     const getSpecificBook = database.books.filter(
//         (book) => book.category.includes(req.params.category)
//     );
//     if(getSpecificBook.length === 0){
//         return res.json({error: `No book found for the Category : ${req.params.category}`})
//     }; 
//     return res.json({book: getSpecificBook});
// });

booky.get("/lan/:language", async (req, res)=>{
    const getSpecificBook = await BookModel.findOne({Language: req.params.language});
    if(!getSpecificBook){
        return res.json({error: `No book found for the Category : ${req.params.language}`})
    }; 
    return res.json({book: getSpecificBook});
});

// All Authors...............................

// route         :   /author
// description   :   get all data of author
// access        :   PUBLIC
// Parameter     :   none
// methods used  :   get 

// booky.get("/author", (req, res)=>{
//     return res.json({Authors: database.authors});
// })

booky.get('/author',async (req, res)=>{
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
});


// Authors with particular id...............................

// route         :   /author/is
// description   :   get author with particular id 
// access        :   PUBLIC
// Parameter     :   id
// methods used  :   get 

// booky.get('/author/is/:id',(req,res)=>{
//     const id=req.params.id;
//     const getAuthor = database.authors.filter((author)=>author.id===parseInt(id));
//     if(getAuthor.length===0){
//         return res.json({Error:`No author found for the given book ID ${id}`})
//     }
//     return res.json({Author: getAuthor});
// });

booky.get('/author/is/:id',async (req,res)=>{
    const getSpecificAuthor = await AuthorModel.findOne({id: req.params.id});
    if(!getSpecificAuthor){
        return res.json({error: `No author found with id : ${req.params.is}`});
    }
    return res.json(getSpecificAuthor);
});

// Author with particular book...............................

// route         :   /author/book
// description   :   get authors with particular book 
// access        :   PUBLIC
// Parameter     :   ISBN
// methods used  :   get 

booky.get('/author/book/:ISBN',(req,res)=>{
    const id = req.params.ISBN;
    const getAuthor=(database.authors.filter((author)=>author.books.includes(id)));
    if(getAuthor.length===0){
        return res.json({error: `No author found for the given book ISBN ${id}`});
    }
    return res.json({authors: getAuthor});
});

// booky.get("/author/book/:isbn", async (req,res)=>{    
//     const getSpecificAuthor = await AuthorModel.findOne({})

// });

// All Publications...............................

// route         :   /publications
// description   :   get all publications
// access        :   PUBLIC
// Parameter     :   none
// methods used  :   get 

// booky.get('/publications',(req,res)=>{
//     return res.json({Publications:database.Publications});
// });

booky.get('/publications',async (req, res)=>{
    const getAllPublications = await PublicationModel.find();
    return res.json(getAllPublications);
});


// Publication with particular id...............................

// route         :   /publications/identity/
// description   :   get data of specific publication using id 
// access        :   PUBLIC
// Parameter     :   id
// methods used  :   get 

booky.get('/publications/identity/:id',(req,res)=>{
    const id = req.params.id;
    const getPublic = database.Publications.filter((pub)=>pub.id===parseInt(id));
    if(getPublic.length === 0){
        return res.json({publications:`no publication found for provided id ${id}`});
    }
    return res.json({publications:getPublic});
})


// Publication with particular book...............................

// route         :   /publications/book
// description   :   get data of specific publication using book ISBN 
// access        :   PUBLIC
// Parameter     :   ISBN
// methods used  :   get 

booky.get('/publications/book/:ISBN',(req,res)=>{
    const id = req.params.ISBN;
    const getPublic = database.publication.filter((pub)=>pub.books.includes(id));
    if(getPublic.length === 0){
        return res.json({publications:`no publication found for provided book ISBN ${id}`});
    }
    return res.json({publications:getPublic});
})


//-------------------------------------POST-----------------------------------------


// route         :   /book/new
// description   :   adding a new book to our database 
// access        :   PUBLIC
// Parameter     :   none
// methods used  :   post 

// booky.post("/book/new", (req, res)=>{
    //     const newBook = req.body; // we are storing body of our request 
    //     database.books.push(newBook);
    //     return res.json({updatedBooks: database.books});
    // });
booky.post("/book/new", async(req,res)=>{
    const { newBook } = req.body;
    const addNewBook = BookModel.create(newBook);
    return res.json(
        {
            book: addNewBook,
            message: "Book was added :')"
        }
        )
    });


// route         :   /author/new
// description   :   adding a new author to our database 
// access        :   PUBLIC
// Parameter     :   none
// methods used  :   post 
        
// booky.post('/author/new',(req,res)=>{
//     const newAuthor=req.body;
//     database.authors.push(newAuthor);
//     res.json({updatedAuthor: database.authors});
// });

booky.post('/author/new', async (req,res)=>{
    const newAuthor = req.body;
    const addNewAuthor = AuthorModel.create(newAuthor);
    return res.json(
        {
            book: addNewAuthor,
            message: "Author was added :')"
        }
        );
});

// route         :   /pub/new
// description   :   adding a new publication to our database 
// access        :   PUBLIC
// Parameter     :   none
// methods used  :   post 

booky.post('/pub/new', async (req,res)=>{
    const newPub = req.body;
    const addNewPub = PublicationModel.create(newPub);
    return res.json(
        {
            book: addNewPub,
            message: "Publication was added :')"
        }
        );
});

// Task  (if else condition)
// booky.post("/pub/new", (req, res) =>{
//     const newPub = req.body;
//     database.Publications.forEach((pub)=>{
//         if(newPub.id === pub.id){
//             pub.books = newPub.books;
//             return res.json({Publication: database.Publications});
//         }
//     })
//         database.Publications.push(newPub);
//         return res.json({Publication: database.Publications});

// });



// ------------------------------------PUT-------------------------------------------


// route         :   /pub/update/book
// description   :   updating/add new publication
// access        :   PUBLIC
// Parameter     :   isbn
// methods used  :   put 

booky.put("/pub/update/book/:isbn", (req,res) => {
    database.Publication.forEach((pub) => {
        if(pub.id === req.body.pubId){
            return pub.books.push(req.params.isbn);
        }
    });
    database.books.forEach((book) =>{
        if(book.ISBN === req.params.isbn){
            book.Publication = req.body.pubId;
            return;
        }
    });
    
    return res.json(
        {
            books: database.books,
            publication: database.Publication,
            message: "Successfully updated Publication"
        });
    });

    
// route         :   update/book
// description   :   updating/add a new book on isbn
// access        :   PUBLIC
// Parameter     :   isbn
// methods used  :   put 

booky.put("update/book/:isbn", async (req,res)=>{
    console.log('step-1 running');
    const updateBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            Name: req.body.title
        },
        {
            new: true
        }
    )
    return res.json({newBooks: updateBook})
});


// route         :   book/author/update
// description   :   updating/add a new author
// access        :   PUBLIC
// Parameter     :   isbn
// methods used  :   put 

booky.put("book/author/update/:isbn", async (req,res)=>{
    const updateBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            $addToSet: {
                author: req.body.author
            }
        },
        {
            new: true
        }
    )
    const updateAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: req.body.author
        },
        {
            $addToSet: {
                books: req.params.isbn
            }
        },
        {
            new: true
        }
    )
    return res.json(
        {
            newAuthorList: updateAuthor, newBookList: updateBook,
            "message" : "added"
        }
    )
});
// ------------------------------------DELETE-------------------------------------------


// route         :   /book/delete
// description   :   deleting a book 
// access        :   PUBLIC
// Parameter     :   isbn
// methods used  :   delete 
 
booky.delete("/book/delete/:isbn",async (req, res)=>{
    const updateBookDatabase = await BookModel.findOneAndDelete({ISBN: req.params.isbn})
    return res.json({books : updateBookDatabase});
});

// booky.delete("/book/delete/:isbn", (req, res)=>{
//     const updateBookDatabase = database.books.filter(
//         (book) => book.ISBN !== req.params.isbn
//     )
//     database.books = updateBookDatabase;
//     return res.json({books : database.books});
// });


//TASK---------
// route         :   /book/author/delete/
//  description  :   Delete an author from a book
//  access       :   PUBLIC
// Parameter     :   authorID
// methods used  :   DELETE 

booky.delete("/book/author/delete/:isbn/:authorId", (req, res)=>{
    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
            const newAuthorList = book.author.filter(
                (eachAuthor) => eachAuthor!== parseInt(req.params.authorId)
            );
            book.author = newAuthorList;
            return;
        }
    });
    return res.json(
        {
            book: database.books,
            author : database.authors,
            message: "Author was deleted !"
        }
    )
})


// route         :   /book/delete/author/
//  description  :   Delete an author from a book and vise versa
//  access       :   PUBLIC
// Parameter     :   ISBN , authorID
// methods used  :   DELETE 

booky.delete("/book/delete/author/:isbn/:authorId", (req, res) => {
    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
            const newAuthorList = book.author.filter(
                (eachAuthor) => eachAuthor!== parseInt(req.params.authorId)
            );
            book.author = newAuthorList;
            return;
        }
    });

    database.authors.forEach((eachauthor) =>{
        if(eachauthor.id === parseInt(req.params.authorId)){
            const newBookList = eachauthor.books.filter((book) => book !== req.params.isbn);
            eachauthor.books = newBookList;
            return;
        }
    });
    return res.json(
        {
            book: database.books,
            author : database.authors,
            message: "Author was deleted !"
        }
    )
});



booky.listen(3000,()=>{
    console.log('server is up and running at port 3000.');
})