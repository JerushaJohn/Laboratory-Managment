import axios from 'axios';
import React, {  useRef, useState } from 'react'
import { Button, Card, FloatingLabel, Form } from 'react-bootstrap'
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useHistory } from 'react-router-dom';
import Navigationbar from './Navigationbar';

const Loginpage = (props) => {



  const email = useRef()
  const password = useRef()
  const history = useHistory()


  const [loginuser, setloginuser] = useState({
    email: "",
    password: ""
  })

  const UserLogin = () => {
    setloginuser({
      email: email.current.value,
      password: password.current.value
    })
    console.log(loginuser);
    login();
  }

  const login = async () => {
    const { email, password } = loginuser

    if (!email && !password) {
      // alert('1');
    } else {

      try {

        const data = await axios.post("/login", { email, password });
        console.log("data>>", data);
        console.log(data.data.error);
        if (data.data.error) {
          console.log(data.data.message);
          alert(data.data.message)
        } else {
          alert(data.data.message);
          console.log(data.data.message);
          console.log(data.data.token);

          localStorage.setItem("isAuthenticated", data.data.token);
          localStorage.setItem("role", data.data.role);
          history.push('/samples');
        }
      } catch (err) { }
    }
  }


  return (
    <div>
      <Navigationbar />

      <Card className='formcard p-5'>
        <Form method="POST">
          <h3>Please Login</h3>
          <Card.Body>
            <FloatingLabel controlId="floatingInput" label={<FaEnvelope />} className="mt-5 mb-4" >
              <Form.Control type="email" placeholder="enter email" ref={email} />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput" label={<FaLock />} className="mb-4" >
              <Form.Control type="password" placeholder="enter password" ref={password} />
            </FloatingLabel>


            <div className="d-flex justify-content-center">
              <Button title='loginBtn' variant="dark" className="mt-2" onClick={() => UserLogin()} >
                {" "}
                Login {" "}
              </Button>
            </div>
          </Card.Body>
        </Form>
      </Card>
    </div>
  )
}

export default Loginpage