const mongoose = require("mongoose");

//create Publication schema
const PublicationSchema = mongoose.Schema(
    {
        id : Number,
        Name: String,
        books: [String],  
    }
);

const PublicationModel = mongoose.model("Publications",PublicationSchema);

module.exports = PublicationModel;