const books = [
    {
        "ISBN" : "12345",
        "Name" : "Tesls",
        "PubDate" : "2021-05-12",
        "Language ": "en",
        "NumPages" : "250",
        "author" : [1,2],
        "Publication" : [1],
        "Category" : ["tech", "space", "education"]
    }
]

const author = [
    {
        id : 1,
        Name: "Kanishka",
        books: ["12345", "5031"]
    },
    {
        id : 2,
        Name: "Samarth",
        books: ["12345", "book2"]
    }, 
]

const Publication = [
    {
        id : 1,
        Name: "writex",
        books: ["12345"],
    },
    // {
    //     id : 2,
    //     Name: "writex2",
    //     books: [],
    // },
]

module.exports = {books, author, Publication};