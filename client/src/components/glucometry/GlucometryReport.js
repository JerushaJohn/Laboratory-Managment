import React, { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'

const GlucometryReport = ({ GlucomReport, setGlucomReport, glucData, setglycoUpdateform, setGlucomForm }) => {



    const [report1, setreport1] = useState([{ _id: "" }])

    const Update = () => {
        setGlucomReport(false)
        setglycoUpdateform(true)
    }


    useEffect(() => {
        setreport1(glucData)
    }, [glucData])

    if (report1) {
        var ele = report1[0]
    }


    return (
        <div>
            <Modal size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={GlucomReport}
            >
                <Modal.Body>
                    <div className="d-flex justify-content-between mb-2">
                        <span> <b>GlucometryReport</b> </span>
                        <Button variant='success' onClick={() => { Update() }}>Update</Button>

                    </div>
                    <Table bordered >
                        <thead>

                            <tr>
                                <th>Test Name</th>
                                <th> Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {report1 &&


                                <>
                                     <tr>
                                        <th>Fasting body Suger</th>
                                        <th>{ele.fbs}</th>
                                    </tr>
                                   
                                    <tr>
                                        <th>post Prand Sugerial</th>
                                        <th>{ele.ppbs}</th>
                                    </tr>
                                    <tr>
                                        <th>HbA1c</th>
                                        <th>{ele.gh}</th>
                                    </tr>
                                    <tr>
                                        <th>calcium</th>
                                        <th>{ele.calcium}</th>
                                    </tr>
                                   


                                </>

                            }
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { setGlucomReport(false) }} variant="danger">Close</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default GlucometryReport