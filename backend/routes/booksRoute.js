import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router()


// Route for save anew book
router.post('/', async(req, res)=> {
    try {
      if (
        !req.body.title ||
        !req.body.author ||
        !req.body.publishYear
      ){
        return res.status(400).send({
          message: 'Send all required fields: title, author, publishYear',
        });
      }
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      };
  
      const book = await Book.create(newBook);
      return res.status(201).send(book);
  
    } catch (error) {
      console.log(error)
      res.status(500).send({message: error.message})
    }
  });
  
  // Route for get all book from db
  router.get('/', async (req, res) => {
    try {
      const books = await Book.find({});
      return res.status(200).json({
        count: books.length,
        data: books
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({message: error.message})
    }
  })
  
  // Route for get one book from db by ID
  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findById(id);
      return res.status(200).json(book)
    } catch (error) {
      console.log(error)
      res.status(500).send({message: error.message})
    }
  })
  
  // Route to update a book by ID
  router.put('/:id', async (req, res) => {
    try {
      if (
        !req.body.title ||
        !req.body.author ||
        !req.body.publishYear
      ){
        return res.status(400).send({
          message: 'Send all required fields: title, author, publishYear',
        });
      }
      
      const { id } = req.params;
      const updatedData = req.body;
  
      // Find the book by ID and update it with the new data
      const updatedBook = await Book.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!updatedBook) {
        return res.status(404).send({ message: 'Book not found' });
      }
  
      return res.status(200).send({message: 'Book update successfully'});
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  });
  
  // Route to delete a book by ID
  router.delete('/:id', async (req, res) => {
    try {
      
      const { id } = req.params;
  
      // Find the book by ID and update it with the new data
      const deletedBook = await Book.findByIdAndDelete(id);
  
      if (!deletedBook) {
        return res.status(404).send({ message: 'Book not found' });
      }
  
      return res.status(200).send({message: 'Book deleted successfully'});
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  });

  export default router;