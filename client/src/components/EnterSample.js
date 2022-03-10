import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Navigationbar from './Navigationbar'




const EnterSample = () => {


  const history = useHistory();


  const [samples, setsamples] = useState([])

  const [sendDate, setsendDate] = useState({})

  const [hemo, setHemo] = useState(false)
  const [thyr, setThyr] = useState(false)
  const [glu, setglu] = useState(false)


  useEffect(() => {
    getdata();
  }, [])


  const getdata = async () => {
    // console.log(samples);
    try {
      const res = await fetch('/Entersample', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      })
      const data = await res.json()
      console.log(data);
      setsamples(data)
    } catch (err) {
      console.log(err);
    }
  }

  const user = useRef()


  const radio = (e) => {
    const val = e.target.value
    const id = e.target.id
    console.log(val, id);
    id === "1" ? setHemo(true) : id === "2" ? setThyr(true) : setglu(true)
  }

  const CollectData = () => {


    setsendDate({
      user: user.current.value,
      hemo: hemo,
      thyr: thyr,
      glu: glu,
    })
    postDate();
  }



  const postDate = async () => {




    try {

      const { user, hemo, thyr, glu } = sendDate
      console.log(user, hemo, thyr, glu);

      if (user || hemo || thyr || glu) {
        var send = await axios.post('/entersample', { user, hemo, thyr, glu })
        console.log(send.data.error)
        if (send.data.error === false) {
          history.push('/samples');
        } else {
          history.push('/entersample')
        }


      } else {
        console.log('empty')


      }

    } catch (err) {

      console.log('empty')

    }


  }


  return (
    <>
      <Navigationbar />

      <Modal.Dialog>
        <Modal.Header >
          <Modal.Title>Creat Test </Modal.Title>
        </Modal.Header>


        <div className='container mt-3'>
          <FloatingLabel controlId="floatingSelect" label=" selects Patient" className="mb-4" >
            <Form.Select aria-label="Floating label select example" ref={user}  >

              {samples.map((val, inx) => {
                return <option value={val._id} key={inx}>{val.name}</option>
              })}
            </Form.Select>
          </FloatingLabel>
        </div>


        <Modal.Body>
          <Form.Check type="checkbox" name="radio 1" id='1' label="Haemotology" onChange={radio} />
          <br />
          <Form.Check type="checkbox" name="radio 1" id='2' label=" Thyroid Profile" onChange={radio} />
          <br />
          <Form.Check type="checkbox" name="radio 1" id='3' label="Glucometry" onChange={radio} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={CollectData}>Submit</Button>
        </Modal.Footer>

      </Modal.Dialog>


    </>
  )
}

export default EnterSample