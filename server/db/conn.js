const mongoose = require('mongoose');
require('dotenv').config();


// const dburl = 'mongodb+srv://devilfighterzz:Pinaya6667@cluster1.xzeft.mongodb.net/userdatas?retryWrites=true&w=majority'

const dburl="mongodb+srv://jerusha:jerusha2022@cluster0.cr56h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


// const dburl = process.env.DATABASEURL

mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) {
        console.log("DataBase connection FAILED", err);
    }
    else {
        console.log(" DB Connected ");
    }
}

)
