import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

const Haematology = ({ haemForm, sethaemForm, id,reload }) => {

    const [haemoData, sethaemoData] = useState({})

    const haemoglobin = useRef()
    const neutrophils = useRef()
    const eosinophiles = useRef()
    const basophills = useRef()
    const pcv = useRef()
    const wbc = useRef()
    const lymphocytes = useRef()
    const monocytes = useRef()
    const rbc = useRef()
    const mcv = useRef()


    const onHide = () => {
        sethaemoData({
            haemoglobin: haemoglobin.current.value,
            neutrophils: neutrophils.current.value,
            eosinophiles: eosinophiles.current.value,
            basophills: basophills.current.value,
            pcv: pcv.current.value,
            wbc: wbc.current.value,
            lymphocytes: lymphocytes.current.value,
            monocytes: monocytes.current.value,
            rbc: rbc.current.value,
            mcv: mcv.current.value,
        })
        haemData();
    }







    const haemData = async () => {
        // console.log(haemoData);
        // console.log("ID", id)
        const { haemoglobin, neutrophils, eosinophiles, basophills, pcv, wbc, lymphocytes, monocytes, rbc, mcv } = haemoData
        console.log(haemoglobin, neutrophils, eosinophiles, basophills, pcv, wbc, lymphocytes, monocytes, rbc, mcv);
        if (!haemoglobin || !neutrophils || !eosinophiles || !basophills || !pcv || !wbc || !lymphocytes || !monocytes || !rbc || !mcv) {
            alert(" confirm for submit")
        } else {

            try {
                console.log('try');

                const data = await axios.post('http://localhost:4400/heamatology', { haemoglobin, neutrophils, eosinophiles, basophills, pcv, wbc, lymphocytes, monocytes, rbc, mcv, id })

                console.log(data, "=======hemoform")

                if (data.data.error === false) {
                    console.log(data.data.error, " ---------------set false");
                }
                reload()
                sethaemForm(false);

                // const data = await res.json();
                console.log(data.data.error);

            } catch (err) {
                console.log("err", err);
            }

        }



    }

    return (
        <>
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={haemForm} >
                <Modal.Body>
                    <h4>Enter Haematology Reports </h4>
                    <Form>
                        <Row className='my-4'>
                            <Col><Form.Control placeholder="haemoglobin" ref={haemoglobin} required={true} /></Col>
                            <Col><Form.Control placeholder="neutrophils" ref={neutrophils} required={true} /></Col>
                        </Row>
                        <Row className='my-4'>
                            <Col><Form.Control placeholder="eosinophiles" ref={eosinophiles} required={true} /></Col>
                            <Col><Form.Control placeholder="basophills" ref={basophills} required={true} /></Col>
                        </Row>
                        <Row className='my-4'>
                            <Col><Form.Control placeholder="pcv" ref={pcv} required={true} /></Col>
                            <Col><Form.Control placeholder="wbc" ref={wbc} required={true} /></Col>
                        </Row>
                        <Row className='my-4'>
                            <Col><Form.Control placeholder="lymphocytes" ref={lymphocytes} required={true} /></Col>
                            <Col><Form.Control placeholder="monocytes" ref={monocytes} required={true} /></Col>
                        </Row>
                        <Row className='my-4'>
                            <Col><Form.Control placeholder="rbc" ref={rbc} required={true} /></Col>
                            <Col><Form.Control placeholder="mcv" ref={mcv} required={true} /></Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { sethaemForm(false) }} variant="danger">Close</Button>
                    <Button onClick={onHide}>submit</Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default Haematology