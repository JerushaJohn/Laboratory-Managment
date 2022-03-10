import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { NavLink } from 'react-router-dom'


const Navigationbar = (props) => {


    const token = localStorage.getItem("isAuthenticated")
    const role = localStorage.getItem("role")

    const history = useHistory()



    const logout = () => {
        console.log("logged out");
        localStorage.clear();
        history.push("/");
    }




    return (
        <div>
            <Navbar bg="dark" expand="lg" >
                <Container >
                    <Navbar.Brand className='navtags'><h3>Laboratory</h3></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">

                        {token &&
                            <Nav className="me-auto my-2 my-lg-0" navbarScroll >
                                <NavLink to="/samples" className="navtags">{role === "admin" ? "Samples" : "Dashboard"}</NavLink>
                                <NavLink to="/entersample" className="navtags">{role === "admin" && "Enter Samples"}</NavLink>
                            </Nav>
                        }

                        <Nav className="d-flex">
                            {token && role === "admin" && <NavLink to="/registrationPage" className="navtags">Register</NavLink>}
                            {!token && <NavLink to="/" className="navtags">login</NavLink>}
                        </Nav>
                        {token && <Button className="navtags"  variant="outlined-primary" onClick={logout} >logout</Button>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>


        </div>
    )
}

export default Navigationbar