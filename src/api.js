const router = require('express').Router()
const { reduce } = require('./book_dumb')
let booksdirectory = require('./book_dumb')


router.get('/books', (req,res)=>{
    res.send(booksdirectory)
})


router.get('/books/:id', (req,res)=>
{
    const {id} = req.params;
    const book = booksdirectory.find(b => b.isbn === id);
    
    if(!book)
    {
       
        return res.status(404).send('Book doesnt exist');
    }
    else{ 
        return res.send(book);

    }

   
})

router.post('/Add_books', (req,res)=>{

    const {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        category
    } = req.body;

    const bookexist = booksdirectory.find(b => b.isbn === isbn)
    if(bookexist) return res.send("book alredy exist")

    // else{
    //     const book = {
    //         title,
    //         isbn,
    //         pageCount,
    //         publishedDate,
    //         thumbnailUrl,
    //         shortDescription,
    //         longDescription,
    //         status,
    //         authors,
    //         category
    //      }

    //      booksdirectory.push(book)
    //      res.send(book)
    // }
    const bookindex = booksdirectory.find
    
})


router.put('/books/:id', (req,res)=>{
    const {id} = req.params
    const {
        title,
        
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    } = req.body;

    const book = booksdirectory.find(b => b.isbn === id)
    if(!book) return res.send("Book doesn't Exist")

    const updateField = (val,prev) => !val ?prev :val;  //this is a function to update the string in the DB

    const updatedBook = {
        ...book,
        title: updateField(title, book.title),
        
        pageCount: updateField(pageCount, book.pageCount),
        publishedDate: updateField(publishedDate, book.publishedDate),
        thumbnailUrl: updateField(thumbnailUrl, book.thumbnailUrl),
        shortDescription: updateField(shortDescription, book.shortDescription),
        longDescription: updateField(longDescription, book.longDescription),
        status: updateField(status, book.status),
        authors: updateField(authors, book.authors),
        categories: updateField(categories, book.categories),
    };    

    const bookindex = booksdirectory.findIndex(b => b.isbn === id);   //this line add the updated book to DB 
    booksdirectory.splice(bookindex,1,updatedBook);  //this line also do same as above 

    res.send(updatedBook)
        
})

router.delete('/books/:id', (req,res)=>{

    const { id } = req.params;

    let book = booksdirectory.find(b => b.isbn === id);
    if (!book) return res.status(404).send('Book does not exist');

    booksdirectory = booksdirectory.filter(b => b.isbn !== id);
    
    res.send('Success');

})

module.exports = router