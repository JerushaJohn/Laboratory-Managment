import axios from 'axios'
import { useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

const GlucometryUpdate = ({ id, glycoUpdateform, setglycoUpdateform, glucData }) => {


    const [glycuUpdateDate, setglycuUpdateDate] = useState({})


    console.log(glucData, id, "-------------glucData");


    if (glucData) {
        var data = glucData[0]
    }



    const fbs = useRef()
    const ppbs = useRef()
    const gh = useRef()
    const calcium = useRef()

    const onHide = () => {
        setglycuUpdateDate({
            fbs: fbs.current.value,
            ppbs: ppbs.current.value,
            gh: gh.current.value,
            calcium: calcium.current.value,
        })
        formdata();
    }

    const formdata = async () => {
        console.log(glycuUpdateDate);
        const { fbs, ppbs, gh, calcium } = glycuUpdateDate
        console.log(fbs, ppbs, gh, calcium);
        if (!fbs || !ppbs || !gh || !calcium) {
            console.log('empth');
        } else {
            try {
                console.log('try');
                const data = await axios.post('http://localhost:4400/glucometry', { fbs, ppbs, gh, calcium, id })
                console.log(data);
                if (data.data.error === false) {
                    console.log(data.data.error, " ---------------set false");
                }
                setglycoUpdateform(false);
            } catch (err) {
                console.log("err", err);
            }

        }
    }
    return (
        <div>
            <Modal size=""
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={glycoUpdateform}
            >
                <Modal.Body>
                    <h4> Update Glucomtery Report </h4>
                    {data &&
                        <Form>

                            <Form.Group className="mb-3" >
                                <Form.Control type="text" placeholder=" Fasting Blood Suger" ref={fbs} defaultValue={data.fbs} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Control type="text" placeholder=" Post Prandual Blood Suger" ref={ppbs} defaultValue={data.ppbs} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Control type="text" placeholder=" Glycosylated Haemoglobin (HbA1C)" ref={gh} defaultValue={data.gh} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Control type="text" placeholder=" Calcium" ref={calcium} defaultValue={data.calcium} />
                            </Form.Group>


                        </Form>
                    }
                </Modal.Body>
                <Modal.Footer>

                    <Button onClick={() => setglycoUpdateform(false)} variant="danger">Close</Button>
                    <Button onClick={onHide}>submit</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )

}

export default GlucometryUpdate