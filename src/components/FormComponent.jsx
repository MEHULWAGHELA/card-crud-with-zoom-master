import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from "react-icons/bs";
import validationdata from '../JSON/validation.json'
import { Cardcontext } from '../App'
const FormComponent = () => {
    let value = useContext(Cardcontext)
    const fileref = useRef()
    let [errorobj, seterrorobj] = useState({})
    let [formposition, setformposition] = useState(true)
    const getBase64 = (file) => new Promise(function (resolve, reject) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject('Error: ', error);
    })
    const changedata = async (e) => {
        if (e.target.name == "image") {
            value.obj[e.target.name] = await getBase64(e.target.files[0])
        }
        else {
            value.obj[e.target.name] = e.target.value
        }
        value.setobj({ ...value.obj })
        validate(e.target.name)
    }

    const save = (e) => {
        for (let x of Object.keys(value.obj)) {
            validate(x)
        }
        e.preventDefault()
        if (value.editid == 0) {
            value.count = value.count + 1
            value.obj.id = value.count
            value.array = [...value.array, value.obj]
            console.log(value.obj.id)
        }
        else {
            value.editid = 0;
            value.array.splice(value.array.findIndex(x => x.id == value.editid), 1, value.obj)
            value.seteditid(value.editid)
        }
        value.setobj({ ...value.obj })
        value.setarray([...value.array])
        value.setcount(value.count)
        value.setobj({})
        fileref.current.value = ""
    }

    const validate = (name) => {
        let validationobj = validationdata.find((x) => x.name == name)
        let validationerror = validationobj.conditions.find((x) => eval(x.condition))
        if (validationerror) {
                if (validationobj) {
                errorobj[name] = validationerror.error
            }
            else {
                delete errorobj[name]
            }
        }
        seterrorobj({ ...errorobj })
        console.log(errorobj)
    }

    const openform = () => {
        setformposition(false)
    }

    const closeform = () => {
        setformposition(true)
    }

    return (
        <div>
            <div className="container text-bg-dark rounded-3 py-2 px-5 w-50 my-3">
                <div>
                    <h1 className='text-center py-3'>Form
                        {formposition ? <BsFillArrowDownCircleFill onClick={openform} className='mx-2' /> : <BsFillArrowUpCircleFill onClick={closeform} className='mx-2' />}
                    </h1>
                </div>
                <Form className='px-3' style={{ height: formposition ? "0px" : "auto", overflow: "hidden" }}>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="title" className='fs-5'>
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={value.obj.title || ''}
                                    placeholder='Add Title'
                                    onChange={changedata}
                                />
                                <span>{errorobj.title}</span>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="subtitle" className='fs-5'>
                                    SubTitle
                                </Label>
                                <Input
                                    id="subtitle"
                                    name="subtitle"
                                    type="text"
                                    value={value.obj.subtitle || ''}
                                    placeholder="Sub Title"
                                    onChange={changedata}
                                />
                                <span>{errorobj.subtitle}</span>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="image" className='fs-5'>
                                    Image
                                </Label>
                                <input
                                    id="image"
                                    name="image"
                                    type="file"
                                    placeholder='File'
                                    onChange={changedata}
                                    ref={fileref}
                                    className='form-control'
                                />
                                <span>{errorobj.image}</span>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="information" className='fs-5'>
                                    Information
                                </Label>
                                <Input
                                    id="information"
                                    name="information"
                                    placeholder="Enter Description"
                                    type='textarea'
                                    value={value.obj.information || ""}
                                    onChange={changedata}
                                />
                            </FormGroup>
                            <span>{errorobj.information}</span>
                        </Col>
                    </Row>
                    <div className='text-center my-2'>
                        <Button className='text-bg-info' onClick={save}>
                            Create Card
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default FormComponent
