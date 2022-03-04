import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, FloatingLabel, Form } from 'react-bootstrap'
import { FaEnvelope, FaLock } from "react-icons/fa";
// import { BsFillPersonFill ,BsFillPersonPlusFill} from "react-icons/bs";
import { useHistory } from 'react-router-dom';

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

    try {
      const data = await axios.post("/login", { email, password });

      console.log("data>>", data);
      const role = data.role;
      console.log(role);
      localStorage.setItem("role", role);
      if (data.data.error) {
        console.log(data.data.message);
        // alert(data.data.message);
      } else {
        alert(data.data.message);
        localStorage.setItem("login", true)
        props.setisLogin(true);
        history.push('/samples');
      }
    } catch (err) {

    }

  }



  useEffect(() => {
    console.log(loginuser);
    login();
  }, [])


  
  return (
    <div>
      <Card className='formcard p-5'>
        <Form method="POST">
          <h4>Please Login!</h4>
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