const fs = require('fs');
const csv = require('csv-parser');

const path = 'D:/Node js Projects/BookZone/uploads/temp.csv'

module.exports = {
    readCSV: (path) => {
        const results = [];
        return new Promise((resolve, reject) => {
            fs.createReadStream(path)
                .pipe(csv())
                .on('data', (row) => {
                    const book = {
                        image : row.image,
                        name : row.name,
                        author : row.author,
                        format : row.format,
                        book_depository_stars : row.book_depository_stars,
                        price : Math.round(Number(row.price) * 82.27),
                        category : row.category
                    }
                    results.push(book);
                })
                .on('end', () => {
                    resolve(results);
                    fs.unlink(path,(err) => {
                        if(err){
                            reject(err);
                        }
                        console.log('file deleted');
                    })
                });
            });
        },

    remove(){
       
    }
}