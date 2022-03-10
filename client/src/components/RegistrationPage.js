import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Navigationbar from "./Navigationbar";

const RegistrationPage = () => {
  const [register, setregister] = useState({});

  const history = useHistory();

  const name = useRef();
  const email = useRef();
  const password = useRef();
  const role = useRef();

  const sampleAdd = () => {
    setregister({
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
      role: role.current.value,
      test: false,
    });

    console.log(register);

    registeruser();
  };
  const [error, setError] = useState("");

  const [reg, setReg] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    let copy = { ...reg, [name]: value };
    setReg(copy);
  };

  const handleSubmit = (e) => {
    setError(validate(reg));
    sampleAdd();
    console.log(register, "----------");
  };

  const validate = (values) => {
    let err = {};

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      err.username = "Username is required!";
    }
    if (!values.email) {
      err.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      err.email = "This is not a valid email format!";
    }
    if (!values.password) {
      err.password = "Password is required";
    } else if (values.password.length < 4) {
      err.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      err.password = "Password cannot exceed more than 10 characters";
    }
    return err;
  };

  const registeruser = async () => {
    try {
      const { name, email, password, role, test } = register;
     
      const data = await axios.post("/register", {
        name,
        email,
        password,
        role,
        test,
      });

      console.log(data,"------data");

      console.log("res", data.data);
      if (data.error) {
        console.log(data.data.message);
        // alert(data.message)
      } else {
        alert(data.data.message);
        history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(register);
    registeruser();
  }, [register]);

  return (
    <div>
      <Navigationbar />

      <Card className="formcard p-5">
        <Form method='"POST'>
          <h4>Registration form</h4>
          <Card.Body>
            <FloatingLabel
              controlId="floatingInput"
              label="Enter name"
              className="mt-3 mb-4"
            >
              <Form.Control
                type="text"
                placeholder="enter name"
                ref={name}
                name="name"
                onChange={handleChange}
              />
              <span style={{ color: "red" }}>{error.name}</span>
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Enter email"
              className=" mb-4"
            >
              <Form.Control
                type="email"
                placeholder="enter email"
                ref={email}
                name="email"
                onChange={handleChange}
              />
              <span>{error.email}</span>
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingInput"
              label="Enter password"
              className="mb-4"
            >
              <Form.Control
                type="password"
                placeholder="enter password"
                ref={password}
                name="password"
                onChange={handleChange}
              />
              <span>{error.password}</span>
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingSelect"
              label=" selects role"
              className="mb-4"
            >
              <Form.Select
                aria-label="Floating label select example"
                ref={role}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </FloatingLabel>
            <div className="d-flex justify-content-center">
              <Button
                variant="outline-success"
                className="mt-2"
                onClick={handleSubmit}
              >
                {" "}
                Register{" "}
              </Button>
            </div>
          </Card.Body>
        </Form>
      </Card>
    </div>
  );
};

export default RegistrationPage;
