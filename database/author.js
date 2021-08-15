const mongoose = require("mongoose");

//create book schema
const AuthorSchema = mongoose.Schema(
    {
        id : Number,
        Name: String,
        books: [String]
    },
    {
        id : Number,
        Name: String,
        books: [String]
    }, 
);

const AuthorModel = mongoose.model("authors",AuthorSchema);

module.exports = AuthorModel; 