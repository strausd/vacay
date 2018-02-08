const mongoose = require('mongoose');

const test = mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`);

test.then((a) => {
    console.log('Inside promise');
    console.log(a);
}).catch((e) => {
    console.log('Error');
    console.log(e);
});

console.log('Done.');

console.log(process.env.DB_USER);