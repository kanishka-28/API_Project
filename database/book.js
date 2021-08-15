const mongoose = require("mongoose");

//create book schema
// schema is a key value pair , but it a is blueprint so it can't contain the actual data , hence it contains key and the datatype .
const BookSchema = mongoose.Schema(
    {
        ISBN :String,
        Name : String,
        PubDate : String,
        Language : String,
        NumPages : Number,
        author : [Number],
        Publication : [Number],
        Category : [String]
    }
);

// we can't directly use the schema so we made a model 
const BookModel = mongoose.model("books",BookSchema);

module.exports = BookModel;