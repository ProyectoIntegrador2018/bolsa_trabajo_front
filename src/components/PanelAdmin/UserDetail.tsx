import styled from '@emotion/styled';
import { Field, Formik, FormikErrors } from 'formik';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Container, Form, FormGroup, Input, Jumbotron, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

function UserDetails() {
    let params = useParams<{ userId?: string }>();
    const userId = params.userId;
    console.log(userId);

    const userInfo = {
        name: "Ricardo Lozano",
        dateApplied: new Date(Date.now() - 86400000), // that is: 24 * 60 * 60 * 1000
        age: 70,
        city: "Monterrey",
        address: "Calle 123, Colonia Tecnológico",
        phone: "812345678",
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
            <Container>
                <Row>
                    <Col>
                        <h2><b>{userInfo.name}</b></h2>
                    </Col>
                </Row>
                <Row>
                    <Col><b>Fecha de Aplicación:</b> {userInfo.dateApplied.toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Col>
                </Row>
            </Container>
            <Container className="mt-5">
                <Row >
                    <Col>
                        <h3>Información Personal</h3>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col xs="12">
                        <b>Edad:</b> {userInfo.age} años
                                </Col>
                    <Col xs="12">
                        <b>Dirección:</b> {userInfo.address}
                    </Col>
                    <Col xs="12">
                        <b>Municipio:</b> {userInfo.city}
                    </Col>
                    <Col xs="12">
                        <b>Número de Teléfono:</b> {userInfo.phone}
                    </Col>
                    <Col xs="12">
                        <b>Correo electrónico:</b> {userInfo.email}
                    </Col>
                </Row>
            </Container>
            <Container className="mt-5">
                <Row>
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

export default UserDetails;