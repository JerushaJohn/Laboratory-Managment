const express = require('express')
const app = express();
const port = 4400;
const cookieparser = require('cookie-parser')
const cors = require('cors')

app.use(cors())


const Authenticate = require('./middleware/Authenticate');


//    import database connection part
require("./db/conn");


app.use(express.json());

app.use(cookieparser());

const database = require('./model/dataSchema');

app.post('/', function (req, res) {
    res.send(req.body)
})


app.post('/login', async (req, res) => {
    // console.log('login', req.body);
    const { email, password } = req.body

    if (!email || !password) {
        res.json({
            error: true,
            message: "fill details",
            data: null
        })
    } else {

        try {
            const data = await database.findOne({ email: email, password: password });

            if (!data) {
                res.json({
                    error: true,
                    message: "invalid credential...!",
                    data: null
                })
            } else {
                token = await data.genarateToken();
                res.json({
                    error: false,
                    message: "login succesfull...!",
                    role: data.role,
                    token: token
                })
            }

        } catch (err) {
            console.log('err');
            res.json({
                error: true,
                message: "connection failed",
                data: null
            })
        }
    }



});


app.post('/register', async (req, res) => {

    // console.log(req.body);
    const { name, email, password, role, test } = req.body

    if (!name || !email || !password || !role) {
        res.status(401).json({
            error: true,
            message: "Fill the form properly",
            data: null
        })

    } else {

        try {
            const data = await database.findOne({ email: email }).lean();
            console.log(data);
            const status = { hemo: false, thyr: false, glu: false }

            if (!data) {
                const newUser = new database({ name, email, password, role, test, status });
                newUser.save().then(async () => {
                    res.status(200).json({
                        error: false,
                        message: "Registration Successfull",
                        data: null
                    })
                })
            } else {
                res.status(200).json({
                    error: true,
                    message: "user already Exist",
                    data: null
                })
            }


        } catch (err) {
            res.status(401).json({
                error: true,
                message: "Registrated failed",
                data: null
            })
        }
    }

})




app.get('/sample', Authenticate, async (req, res) => {
    console.log(req.body)
    res.send(req.token);
});




app.get('/entersample', Authenticate, async (req, res) => {
    // console.log('1111', req.body);
    res.send(req.token);
})

app.post('/entersample', async (req, res) => {


    const { user, hemo, thyr, glu } = req.body
    console.log(user, hemo, thyr, glu);

    const status = { hemo, thyr, glu }
    await database.updateOne({ _id: user }, { $set: { test: true } })
    await database.updateOne({ _id: user }, { $set: { status: status } })
    res.json({
        error: false,
        message: "sample created",
        data: null
    })
});

app.post('/heamatology', async (req, res) => {

    console.log(req.body)
    const { id, haemoglobin, neutrophils, eosinophiles, basophills, pcv, wbc, lymphocytes, monocytes, rbc, mcv } = req.body

    const heamatology = { haemoglobin, neutrophils, eosinophiles, basophills, pcv, wbc, lymphocytes, monocytes, rbc, mcv }
    await database.updateOne({ _id: id }, { $set: { heamatology: heamatology, test: true } });

    res.status(200).send({
        error: false,
        massage: " data saved",
        data: null
    });


})

app.post('/thyroid', async (req, res) => {

    console.log(req.body, "--------check");
    const { id, tri, thyroxine, tsh } = req.body
    const thyroid = { tri, thyroxine, tsh }
    console.log(tri, tsh, thyroxine, id, "--------check2")

    await database.updateOne({ _id: id }, { $set: { thyroid: thyroid, test: true } })

    res.status(200).send({
        error: false,
        massage: " data saved",
        data: null
    });
})

app.post('/glucometry', async (req, res) => {

    console.log(req.body);
    const { id, fbs, ppbs, gh, calcium } = req.body
    const glucometry = { fbs, ppbs, gh, calcium }
    await database.updateOne({ _id: id }, { $set: { glucometry: glucometry, test: true } })

    res.status(200).send({
        error: false,
        massage: " data saved",
        data: null
    });

})


module.exports = app