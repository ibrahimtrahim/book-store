import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    author: {
        type: String,
        require: true,
    },
    publishYear: {
        type: Number,
        require: true,
    },
},
{
    timesTamps: true,
}
)

export const Book = mongoose.model('Book', bookSchema);