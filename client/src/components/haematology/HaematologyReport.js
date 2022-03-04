import React, { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'

const HaematologyReport = ({ haemReport, sethaemReport, hemoData, sethemoUpdateform }) => {

    const [report1, setreport1] = useState([{ _id: "" }])
    const Update = () => {
        sethaemReport(false)
        sethemoUpdateform(true)
    }

    // const [report1, setreport1] = useState()

    useEffect(() => {
        setreport1(hemoData)
    }, [hemoData])

    if (report1) {
        var ele = report1[0]
        // console.log("hemo:", ele);
    }



    return (

        <div>

            <div>
                <Modal size=""
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={haemReport}
                >
                    <Modal.Body>
                        <div className="d-flex justify-content-between mb-2">
                            <span> <b>Enter Thyroid Profile Data</b> </span>
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
                                            <th>haemoglobin</th>
                                            <th>{ele.haemoglobin}</th>
                                        </tr>

                                        <tr>
                                            <th>neutrophils</th>
                                            <th>{ele.neutrophils}</th>
                                        </tr>
                                        <tr>
                                            <th>eosinophiles</th>
                                            <th>{ele.eosinophiles}</th>
                                        </tr>
                                        <tr>
                                            <th>basophills</th>
                                            <th>{ele.basophills}</th>
                                        </tr>
                                        <tr>
                                            <th>pcv</th>
                                            <th>{ele.pcv}</th>
                                        </tr>
                                        <tr>
                                            <th>wbc</th>
                                            <th>{ele.wbc}</th>
                                        </tr>
                                        <tr>
                                            <th>lymphocytes</th>
                                            <th>{ele.lymphocytes}</th>
                                        </tr>
                                        <tr>
                                            <th>monocytes</th>
                                            <th>{ele.monocytes}</th>
                                        </tr>
                                        <tr>
                                            <th>rbc</th>
                                            <th>{ele.rbc}</th>
                                        </tr>
                                        <tr>
                                            <th>mcv</th>
                                            <th>{ele.mcv}</th>
                                        </tr>
                                    </>

                                }



                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => { sethaemReport(false) }} variant="danger">Close</Button>
                    </Modal.Footer>
                </Modal>

            </div>

        </div >
    )
}

export default HaematologyReport;




