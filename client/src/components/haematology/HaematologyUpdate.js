import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

const HaematologyUpdate = ({ id, sethemoUpdateform, hemoUpdateform, hemoData }) => {

    const [Updatehemodata, setUpdatehemodata] = useState()

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

    // console.log(id, hemoData, "-------------update id , data")

    const onHide = () => {
        setUpdatehemodata({
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

        update()
    }

    useEffect(() => {
        if (Updatehemodata) {
            update();
            console.log(Updatehemodata, "--------------Updatehemodata");
        }
    }, [])



    if (hemoData) {
        var data = hemoData[0]
        console.log(data, "---------------old value");
    }

    const update = async () => {
        console.log(Updatehemodata, "---------------updated value");
        const { haemoglobin, neutrophils, eosinophiles, basophills, pcv, wbc, lymphocytes, monocytes, rbc, mcv } = Updatehemodata
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
                sethemoUpdateform(false);
                console.log(data.data.error);
            } catch (err) {
                console.log("err", err);
            }
        }



        // sethemoUpdateform(false)
    }


    return (
        <div>
            {id}
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={hemoUpdateform} >
                <Modal.Body>
                    <h4>Enter Haematology Reports update</h4>


                    {data &&

                        <Form>
                            <Row className='my-4'>
                                <Col><Form.Control placeholder="haemoglobin" ref={haemoglobin} defaultValue={data.haemoglobin} /></Col>
                                <Col><Form.Control placeholder="neutrophils" ref={neutrophils} defaultValue={data.neutrophils} /></Col>
                            </Row>
                            <Row className='my-4'>
                                <Col><Form.Control placeholder="eosinophiles" ref={eosinophiles} defaultValue={data.eosinophiles} /></Col>
                                <Col><Form.Control placeholder="basophills" ref={basophills} defaultValue={data.basophills} /></Col>
                            </Row>
                            <Row className='my-4'>
                                <Col><Form.Control placeholder="pcv" ref={pcv} defaultValue={data.pcv} /></Col>
                                <Col><Form.Control placeholder="wbc" ref={wbc} defaultValue={data.wbc} /></Col>
                            </Row>
                            <Row className='my-4'>
                                <Col><Form.Control placeholder="lymphocytes" ref={lymphocytes} defaultValue={data.lymphocytes} /></Col>
                                <Col><Form.Control placeholder="monocytes" ref={monocytes} defaultValue={data.monocytes} /></Col>
                            </Row>
                            <Row className='my-4'>
                                <Col><Form.Control placeholder="rbc" ref={rbc} defaultValue={data.rbc} /></Col>
                                <Col><Form.Control placeholder="mcv" ref={mcv} defaultValue={data.mcv} /></Col>
                            </Row>
                        </Form>
                    }


                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { sethemoUpdateform(false) }} variant="danger">Close</Button>
                    <Button onClick={onHide}>submit</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default HaematologyUpdate