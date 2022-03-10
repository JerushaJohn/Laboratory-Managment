import axios from 'axios'
import { useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

const GlucometryForm = ({ GlucomForm, setGlucomForm, id,reload }) => {

    const [glucData, setglucData] = useState()

    const fbs = useRef()
    const ppbs = useRef()
    const gh = useRef()
    const calcium = useRef()

    const onHide = () => {
        setglucData({
            fbs: fbs.current.value,
            ppbs: ppbs.current.value,
            gh: gh.current.value,
            calcium: calcium.current.value,
        })
        formdata();
    }

    const formdata = async () => {
        debugger
        console.log(glucData);
        const { fbs, ppbs, gh, calcium } = glucData
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
                reload();
                setGlucomForm(false);
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
                show={GlucomForm}
            >
                <Modal.Body>
                    ID- {id}
                    <h4>Enter Add Glucomtery Report </h4>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Control type="text" placeholder=" Fasting Blood Suger" ref={fbs} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Control type="text" placeholder=" Post Prandual Blood Suger" ref={ppbs} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Control type="text" placeholder=" Glycosylated Haemoglobin (HbA1C)" ref={gh} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Control type="text" placeholder=" Calcium" ref={calcium} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>

                    <Button onClick={() => setGlucomForm(false)} variant="danger">Close</Button>
                    <Button onClick={onHide}>submit</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default GlucometryForm