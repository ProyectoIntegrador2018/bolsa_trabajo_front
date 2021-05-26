import styled from '@emotion/styled';
import { Field, Formik, FormikErrors } from 'formik';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Col, Container, Form, FormGroup, Input, Jumbotron, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { translateToUserType, User, UserType } from '../../model/Users';
import { updateUser } from '../../services/usersService';
import UserDetail from './UserDetail';

function UserAcceptDetails(props: any) {
    let params = useParams<{ userId: string }>();
    const userId = params.userId;
    console.log(userId);

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    let userInfo = {
        id: "",
        username: "",
        createdBy: "",
        type: "employee", //TODO: this is hardcode for tests, change after demo
        state: "inactive",
        email: ""
    };

    if (props.location.state.user) {
        userInfo = props.location.state.user;
        console.log(userInfo)
    }

    let history = useHistory();
    const acceptUser = async() => {
       await updateUser(userInfo.id, {state: "active"});
       alert("El usuario ha sido aceptado");
       
       history.push("/admin/accept-users")
    }

    const StyledErrorMessage = styled.div`
        color: red;
    `;

    return (
        <React.Fragment>
            <Jumbotron>
                <h1>Detalle de Usuario</h1>
            </Jumbotron>
            <UserDetail userId={userId} userType={translateToUserType(userInfo.type)}>
                <Container className="mt-5" fluid>
                    <Row>
                        <Col xs="12" md={{ size: 8, offset: 2 }}>
                            <Button className="mr-3" onClick={acceptUser} color="success" size="lg">Aceptar</Button>
                            <Button color="danger" onClick={toggle} size="lg">Rechazar</Button>
                        </Col>

                    </Row>
                </Container>
            </UserDetail>
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