const app = require('./app.js')

const port = 4400
app.listen(port, () => {
    console.log(`SERVER hosted at localhost:${port}`);
})