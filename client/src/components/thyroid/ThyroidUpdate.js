import React, { useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

const ThyroidUpdate = ({ setthyrUpdateform, thyrUpdateform, thyrData, id,reload }) => {

    const [thyroidData, setthyroidData] = useState({})

    if(thyrData){
        var data=thyrData[0]
    }

    const tri = useRef()
    const thyroxine = useRef()
    const tsh = useRef()



    const onHide = () => {
        setthyroidData({
            tri: tri.current.value,
            thyroxine: thyroxine.current.value,
            tsh: tsh.current.value
        })
        formdata();
    }



    const formdata = async () => {
        console.log(thyroidData);
        const { tri, tsh, thyroxine } = thyroidData
        console.log(tri, tsh, thyroxine);
        if (!tri || !tsh || !thyroxine) {
            console.log('empty');
        } else {
            try {
                console.log('try');
                const res = await fetch('/thyroid', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ tri, tsh, thyroxine, id })
                });
                reload();
                setthyrUpdateform(false);


                const data = await res.json();
                console.log(res, data);

            } catch (err) {
                console.log("err", err);
            }

        }


    

    }

    return (
        <div>
            <Modal size="SM" aria-labelledby="contained-modal-title-vcenter" centered show={thyrUpdateform} >
                <Modal.Body>
                    <h4>Update Thyroid Profile Data </h4>

                    {data &&

                        <Form>

                            <Form.Group className="mb-3" >
                                <Form.Control type="text" placeholder=" TRI IODO Thyronine - T3 Total*" ref={tri} defaultValue={data.tri} />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Control type="text" placeholder=" Thyroxine -T4*" ref={thyroxine} defaultValue={data.thyroxine} />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Control type="text" placeholder=" Thyroid Stimulating Harmone (TSH)*" ref={tsh} defaultValue={data.tsh} />
                            </Form.Group>

                        </Form>

                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setthyrUpdateform(false)} variant="danger">Close</Button>
                    <Button onClick={onHide}>submit</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default ThyroidUpdate