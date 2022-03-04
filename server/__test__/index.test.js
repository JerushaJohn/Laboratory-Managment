
const request = require('supertest')

const app = require('../app.js')

describe("POST /login",()=>{
    test("OK, Login succesfful", async ()=>{
        const res = await request(app)
                        .post('/login')
                        .send({
                            "email":"jerusha@gmail.com",
                            "password":"jerusha"
                        })
                    // console.log(res._body.token);
                    expect(res.statusCode).toEqual(200)
    },20000)
})



describe("GET /register",()=>{
    test("OK, Login succesfful", async ()=>{
    const res=await request(app)
        
          .post('/register')
          .send({
              "name":"Chethan",
              "email":"chethan@gmail.com",
              "password":"chethan@gmail.com",
              "role":"admin",
              "test":true
          })
        //   console.log(res);
          expect(res.statusCode).toEqual(200)
},10000)
})
    

describe('GET /sample',()=>{
    var token=null;

    beforeEach((done)=>{
    const res =    request(app)
          .post('login')
          .send({
            "email":"jerusha@gmail.com",
            "password":"jerusha"
          })
          .end((err,res)=>{
              console.log();
          })
        console.log(res._body.token);
    })

    test("OK, Samples getting",async ()=>{
        const res = await request(app)
                        .get('sample')
                        .set("Authorization", 'Bearer ' + token)
                    console.log(res);
                    expect(res.statusCode).toEqual(200)

    })
})


