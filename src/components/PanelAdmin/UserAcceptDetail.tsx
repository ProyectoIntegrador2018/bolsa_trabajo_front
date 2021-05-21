import styled from '@emotion/styled';
import { Field, Formik, FormikErrors } from 'formik';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Container, Form, FormGroup, Input, Jumbotron, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { translateToUserType, User, UserType } from '../../model/Users';
import UserDetail from './UserDetail';

function UserAcceptDetails() {
    let params = useParams<{ userId: string }>();
    const userId = params.userId;
    console.log(userId);

    const userInfo: User = {
        id: "kgrkxfi",
        username: "ricardo_lozano",
        createdBy: "fjjfkejf",
        type: userId === "3" ? "company" : "employee", //TODO: this is hardcode for tests, change after demo
        state: "inactive",
        email: "user@email.com"
    }

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const StyledErrorMessage = styled.div`
        color: red;
    `;

    return (
        <React.Fragment>
            <Jumbotron>
                <h1>Detalle de Usuario</h1>
            </Jumbotron>
            <UserDetail userId={userId} userType={translateToUserType(userInfo.type)}></UserDetail>
            <Container className="mt-5" fluid>
                <Row className="text-center">
                    <Col xs="6" sm="4">
                        <Button color="secondary">Aceptar</Button>
                    </Col>
                    <Col xs="6" sm="4">
                        <Button color="danger" onClick={toggle}>Rechazar</Button>
                    </Col>
                </Row>
            </Container>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Razón de Rechazo</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>Describa por qué ha decidido rechazar al usuario, como retroalimentación para este:</Col>
                    </Row>
                    <Row>
                        <Col>
                            <Formik
                                initialValues={{ feedback: '' }}
                                validate={values => {
                                    let errors: FormikErrors<{ feedback: string }> = {};

                                    if (!values.feedback || values.feedback.length < 1) {
                                        errors.feedback = "Es necesario escribir algo de retroalimentación"
                                    }

                                    return errors;
                                }}

                                validateOnBlur={true}
                                onSubmit={(values, { setSubmitting }) => {

                                    setSubmitting(false);

                                    // TODO
                                }}
                            >
                                {({ values, errors, touched, handleChange, handleSubmit }) =>
                                    <Form onSubmit={handleSubmit}>
                                        <Input id="feedback" name="feedback" tag={Field} type="textarea" onChange={handleChange} value={values.feedback} placeholder="Ejemplo: La dirección no existe" invalid={(typeof errors.feedback !== 'undefined') && touched.feedback}></Input>
                                        {touched.feedback && errors.feedback && <StyledErrorMessage>{errors.feedback}</StyledErrorMessage>}
                                        <FormGroup className="mt-4">
                                            <Button type="submit" color="danger" className="mr-4">Enviar</Button>
                                            <Button onClick={toggle} className="mr-4">Cancelar</Button>
                                        </FormGroup>
                                    </Form>}

                            </Formik>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </React.Fragment>
    )
}

export default UserAcceptDetails;