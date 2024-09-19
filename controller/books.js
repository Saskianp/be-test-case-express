const Book = require("../models/books");

exports.postBooks = async (req, res) => {
    try {
        const { code, title, author, stock } = req.body;
        const book = await Book.create({ code, title, author, stock });
        res.status(200).json({
          status: 200,
          message: "success",
          data: book,
      });
    } catch (error) {
        res.status(500).json({ message: "Error creating book", error });
    }   
}
exports.getBooks = async(req, res) => {
    try {
        const books = await Book.findAll();
        res.status(200).json({
          status: 200,
          message: "success",
          data: books,
      });
    } catch {
        res.status(500).json({ message: "Error fetching books", error })
    }
}
exports.getBooksByCode = async (req, res) => {
  try {
    const { code } = req.params;

    const books = await Book.findOne({ where: { code } });

    if (!books) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      status: 200,
      message: "success",
      data: books,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching book", error });
  }
};
  exports.putBook = async (req, res) => {
    try {
        const { code, title, author, stock } = req.body;
        const book = await Book.findByPk(req.params.id);
        if (!book) {
          return res.status(404).json({ message: "Book not found" });
        }
    
        book.code = code;
        book.title = title;
        book.author = author;
        book.stock = stock;
        await book.save();
        res.status(200).json({
          status: 200,
          message: "success",
          data: book,
      });
      } catch (error) {
        res.status(500).json({ message: "Error updating book", error });
      }
    };
    
  exports.deleteBooks = async (req, res) => {
    try {
      const book = await Book.findByPk(req.params.id);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
  
      await book.destroy();
      res.json({ message: "Book deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting book", error });
    }
  };
  