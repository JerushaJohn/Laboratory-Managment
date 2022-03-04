// import { Button } from 'bootstrap'
import React, { useEffect } from 'react'
import { Container, Nav, Navbar} from 'react-bootstrap'
// import { NavLink } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import EnterSample from './EnterSample'
import RegistrationPage from './RegistrationPage'
import Samples from './Samples'


const Navigationbar = (props) => {

    // const [set, setset] = useState()
    // var role;

    useEffect(() => {
        console.log('in nav');
        var role = localStorage.getItem('role');  
        console.log(role);
        // role === 'admin' ? setset(true) : setset(false);
    }, [])

    const Logout = () => {
        localStorage.removeItem('role');
        console.log("cleared");
    }

    useEffect(() => {
        Logout()
    }, [])



    return (<Router>
        <div>
            <Navbar bg="dark" expand="lg" >
                <Container >
                    <Navbar.Brand to="/samples" className='navtags'><h3>Laboratory</h3></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">

                        <Nav className="me-auto my-2 my-lg-0" navbarScroll >
                            {/* {!role ? set ? <NavLink to="/Samples" className="navtags">Samples</NavLink> : <NavLink to="/Samples" className="navtags">dashboard</NavLink> : ""} */}
                             <Link to="/samples" className="navtags">Samples</Link> 
                             {/* <NavLink to="/Samples" className="navtags">dashboard</NavLink>   */}
                            {/* {!role ? set ? <NavLink to="/EnterSample" className="navtags">Enter Samples</NavLink> : " " : " "} */}
                             <Link to="/entersample" className="navtags">Enter Samples</Link> 
                             
                        </Nav>



                        <Nav className="d-flex">
                            {/* {set ? <NavLink to="/RegistrationPage" className="navtags">Register</NavLink> : ""} */}
                            <Link to="/registrationPage" className="navtags">Register</Link> 
                            {/* <Link to="/logout" className='navtags' onClick={props.setisLogin(false)}>Logout</Link> */}
                            {/* {role ? !set ? <NavLink to="/Loginpage" className="navtags">login</NavLink> : <Button onClick={Logout}>Logout</Button> : ""} */}
                            <Link to="/logout" className="navtags" onClick={()=>{props.setisLogin(false)
                            localStorage.clear()}}>logout</Link>  
                             {/* <Button onClick={Logout}>Logout</Button>  */}
                        </Nav>

                      
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div>
            <Route path='/samples' component={Samples} />
          <Route path='/entersample' component={EnterSample} />
        {/* <Route path='/Loginpage' component={Loginpag} /> */}
          <Route path='/registrationPage' component={RegistrationPage} />
            </div>
        </div>
        </Router>
    )
}

export default Navigationbar