import React, { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'

const ThyroidReport = ({ setthyrUpdateform, thyroidReport, setThyroidReport, setThyroidForm, thyrData }) => {





    const [report1, setreport1] = useState([{ _id: "" }])

    const Update = () => {
        setThyroidReport(false)
        setthyrUpdateform(true)
    }


    // const [report1, setreport1] = useState()

    useEffect(() => {
        setreport1(thyrData)
    }, [thyrData])

    if (report1) {
        var ele = report1[0]
        console.log("thye:", ele);
    }




    return (
        <div>
            <Modal size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={thyroidReport}
            >
                <Modal.Body>
                    <div className="d-flex justify-content-between mb-2">
                        <span> <b>Thyroi Profile Data </b> </span>
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
                                        <th>tri</th>
                                        <th>{ele.tri}</th>
                                    </tr>

                                    <tr>
                                        <th>thyroxine</th>
                                        <th>{ele.thyroxine}</th>
                                    </tr>
                                    <tr>
                                        <th>tsh</th>
                                        <th>{ele.tsh}</th>
                                    </tr>


                                </>

                            }
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { setThyroidReport(false) }} variant="danger">Close</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default ThyroidReport