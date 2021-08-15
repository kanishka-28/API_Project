require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const database = require('./database/database');

const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

const booky = express();

booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());
// booky.use(express.urlencoded({extended: true}));
// booky.use(express.json());

mongoose.connect(process.env.MONGO_URL,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}
).then(()=> console.log("Connection Established"));

// booky.get("/", (req, res) =>{
//     return res.json({books : database.books});
// });
booky.get("/", async(req,res)=>{
    const getAllBooks = await BookModel.find();
    return res.json((getAllBooks));
});

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
    const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn});
    if(!getSpecificBook){
        return res.json({error: `No book found for the ISBN : ${req.params.isbn}`})
    }; 
    return res.json({book: getSpecificBook});
});


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
    const getSpecificBook = await BookModel.findOne({category: req.params.category});
    if(!getSpecificBook){
        return res.json({error: `No book found for the Category : ${req.params.category}`})
    }; 
    return res.json({book: getSpecificBook});
});

// booky.get("/lan/:language", (req, res) =>{
//     const getSpecificBook = database.books.filter(
//         (book) => book.category.includes(req.params.category)
//     );
//     if(getSpecificBook.length === 0){
//         return res.json({error: `No book found for the Category : ${req.params.category}`})
//     }; 
//     return res.json({book: getSpecificBook});
// });

// booky.listen(3000, () => {
//     console.log("server is up and running .");
// });

//.........................................................................................................................................................
// const express=require('express');

// //database
// const database=require('./database');

// // console.log(database.books);

// //initialize express
// const booky=express();


//----------------------------------------------------------------------------
//----------------------------------------------------------------------------





// route
//  description:   get all the books
//  access:    PUBLIC
// Parameter :    none
// methods used : get method



// booky.get('/',(req,res)=>{
//     return res.json({
//         books:database.books,
//     })
// })

//----------------------------------------------------------------------------

// route
//  description:   get specific book based on ISBN
//  access:    PUBLIC
// Parameter :    ISBN
// methods used : get 

// booky.get('/is/:ISBN',(req,res)=>{
//     const id=req.params.ISBN;
//     console.log(id);
//     const arr=(database.books.filter((e)=>e.ISBN===id));
//     if(arr.length===0){
//         return res.json({error: `No book found for the ISBN of ${id}`});
//     }
//     return res.json({book:arr});
// })


//----------------------------------------------------------------------------


// route
//  description:   get specific book based on category
//  access:    PUBLIC
// Parameter :    category
// methods used : get 

// booky.get('/c/:cat',(req,res)=>{
//     const id=req.params.cat;
//     console.log(id);
//     const arr=(database.books.filter((e)=>e.Category.includes(id)));
//     if(arr.length===0){
//         return res.json({error: `No book found for the category with ${id}`});
//     }
//     return res.json({book:arr});
// })


//----------------------------------------------------------------------------

// route
//  description:   get specific book based on language
//  access:    PUBLIC
// Parameter :    language
// methods used : get 

booky.get('/ln/:lang',(req,res)=>{
    const id=req.params.lang;
    console.log(id);
    const arr=(database.books.filter((e)=>e.language===id));
    if(arr.length===0){
        return res.json({error: `No book found for the language ${id}`});
    }
    return res.json({book:arr});
})

//----------------------------------------------------------------------------

// route            /author
//  description:   get data of all authors
//  access:    PUBLIC
// Parameter :    none
// methods used : get 

// booky.get('/author',(req,res)=>{
//     // const id=req.params.lang;
//     // console.log(id);
//     // const arr=(database.books.filter((e)=>e.language===id));
//     // if(arr.length===0){
//     //     return res.json({error: `No book found for the language ${id}`});
//     // }
//     return res.json({authors:database.author});
// })
booky.get('/author',async (req, res)=>{
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
});


//----------------------------------------------------------------------
// route            /author/id
//  description:   get data of authors based on id
//  access:    PUBLIC
// Parameter :    Id
// methods used : get 
booky.get('/author/:id',(req,res)=>{
    const id=req.params.id;
    const arr = database.author.filter((e)=>e.id===parseInt(id));
    if(arr.length===0){
        return res.json({author:`No author found for the given book ID ${id}`})
    }
    return res.json({author:arr});
})
//-----------------------------------------------------------------------


// route            /author/book
//  description:   get data of authors based on books
//  access:    PUBLIC
// Parameter :    ISBN
// methods used : get 


booky.get('/author/book/:ISBN',(req,res)=>{
    const id=req.params.ISBN;
    console.log(id);
    const arr=(database.author.filter((e)=>e.books.includes(id)));
    if(arr.length===0){
        return res.json({error: `No author found for the given book ISBN ${id}`});
    }
    return res.json({authors:arr});
})
//-------------------------------------------------------------------------
// route            /publications
//  description:   get data of all publications
//  access:    PUBLIC
// Parameter :    none
// methods used : get 

// booky.get('/publications',(req,res)=>{
//     return res.json({Publications:database.Publication});
// });
booky.get('/publications',async (req, res)=>{
    const getAllPublications = await PublicationModel.find();
    return res.json(getAllPublications);
});


//-------------------------------------------------------------------------
// route            /publications/id
//  description:   get data of specific publication using id
//  access:    PUBLIC
// Parameter :    id
// methods used : get 

booky.get('/publications/identity/:id',(req,res)=>{
    const id=req.params.id;
    const arr=database.publication.filter((e)=>e.id===parseInt(id));
    if(arr.length===0){
        return res.json({publications:`no publication found for provided id ${id}`});
    }
    return res.json({publications:arr});
})
//-------------------------------------------------------------------------
// route            /publications/book
//  description:   get data of specific publication using book ISBN
//  access:    PUBLIC
// Parameter :    ISBN
// methods used : get 

booky.get('/publications/book/:ISBN',(req,res)=>{
    const id=req.params.ISBN;
    const arr=database.publication.filter((e)=>e.books.includes(id));
    if(arr.length===0){
        return res.json({publications:`no publication found for provided book ISBN ${id}`});
    }
    return res.json({publications:arr});
})


// booky.post("/author/new", (req, res) => {
//     const newAuthor = req.body;
//     database.author.push(newAuthor);
//     res.json({author: database.author});
// })
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

booky.post('/author/new',(req,res)=>{
    const newAuthor=req.body;
    database.author.push(newAuthor);
    console.log(newAuthor);
    res.json({updatedAuthor: database.author});
})

booky.post("/pub/new", (req, res) =>{
    const newPub = req.body;
    database.Publication.push(newPub);
    return res.json({Publication: database.Publication});
});

// route            /pub/update/book
//  description:  Update the publication
//  access:    PUBLIC
// Parameter :    ISBN
// methods used : PUT 

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

// route            /book/delete/
//  description:  Delete the book with given isbn
//  access:    PUBLIC
// Parameter :    ISBN
// methods used : DELETE 

booky.delete("/book/delete/:isbn", (req, res)=>{
    const updateBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
    )
    database.books = updateBookDatabase;
    return res.json({books : database.books});
});

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

    database.author.forEach((eachauthor) =>{
        if(eachauthor.id === parseInt(req.params.authorId)){
            const newBookList = eachauthor.books.filter((book) => book !== req.params.isbn);
            eachauthor.books = newBookList;
            return;
        }
    });
    return res.json(
        {
            book: database.books,
            author : database.author,
            message: "Author was deleted !"
        }
    )
});



booky.listen(3000,()=>{
    console.log('server is up and running at port 3000.');
})