import React, { useContext, useEffect, useState } from 'react'

import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Cardcontext } from '../App'
const CardComponent = (args) => {
    const [modal, setModal] = useState(false);
    let [zoom, setzoom] = useState('')
    const toggle = () => setModal(!modal);
    let value = useContext(Cardcontext)
    const deletefunction = (id) => {
        value.array.splice(value.array.findIndex(x => x.id == id), 1)
        value.setarray([...value.array])
    }

    const editfunction = (id) => {
        value.seteditid(id)
        value.obj = value.array.find((x) => x.id == id)
        value.setobj({ ...value.obj })
    }
    const zoomimage = async (id) => {
        console.log((value.array.find(x => x.id == id)))
        // setzoom((value.array.find(x => x.id == id)).image)
        toggle()
    }
    return (
        <div className="container">
            <div className="row gy-3">
                {value.array?.map((x, i) => {
                    return (
                        <div className="col-4" key={i}>
                            <Card>
                                <img
                                    alt="Sample"
                                    src={x.image}
                                    height="250"
                                    onClick={() => zoomimage(i)}
                                />
                                <CardBody>
                                    <CardTitle tag="h5">
                                        {x.title}
                                    </CardTitle>
                                    <CardSubtitle
                                        className="mb-2 text-muted"
                                        tag="h6"
                                    >
                                        {x.subtitle}
                                    </CardSubtitle>
                                    <CardText>
                                        {x.information}
                                    </CardText>
                                    <Button className="me-2" onClick={() => editfunction(x.id)}>
                                        Edit
                                    </Button>
                                    <Button onClick={() => deletefunction(x.id)} >
                                        Delete
                                    </Button>
                                </CardBody>
                            </Card>
                        </div>
                    )
                })}
            </div>
            <div>
                <Modal isOpen={modal} toggle={toggle} {...args} className='bg-transparent'>
                    <ModalHeader toggle={toggle} className='bg-transparent'></ModalHeader>
                    <ModalBody>
                        <img src={zoom || ''} alt="" className='w-100 rounded-3' />
                    </ModalBody>
                </Modal>
            </div>
        </div >
    )
}

export default CardComponent
