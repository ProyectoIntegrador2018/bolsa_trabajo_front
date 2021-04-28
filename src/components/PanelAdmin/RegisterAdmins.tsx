import React, { useState } from 'react';
import { Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Jumbotron, Label, Row } from 'reactstrap';
import { Field, Formik, FormikErrors } from 'formik'
import styled from '@emotion/styled';

const StyledErrorMessage = styled.div`
  color: red;
`;

interface AdminInfo {
    name: string;
    email: string;
    adminType: string;
    password: string;
}

const validateEmail = (value: string) => {
    let error;

    if (!value) {
        error = 'Campo requerido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Dirección de correo inválida';
    }

    return error;
}

const validateName = (value: string) => {
    let error;

    if (!value) {
        error = 'Campo requerido';
    } else if (!/^[A-ZÁÉÍÓÚ ]+$/i.test(value)) {
        error = 'Formato del nombre incorrecto';
    }

    return error;
}

const validateAdminType = (value: string) => {
    let error;

    if (!value) {
        error = 'Campo requerido';
    } else if (value !== "admin" && value !== "superadmin") {
        error = 'El tipo debe ser admin o superadmin';
    }

    return error;
}

const validatePassword = (value: string) => {
    let error;

    if (!value) {
        error = 'Campo requerido';
    } else if (value.length < 5) {
        error = 'La contraseña debe contener al menos 5 caracteres';
    }

    return error;
}



function RegisterAdmins(props?: AdminInfo) {

    let initialValues;

    if (props) {
        initialValues = props;
    }
    else {
        initialValues = {
            name: '',
            email: '',
            adminType: 'admin',
            password: ''
        }
    }

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const [adminType, setAdminType] = useState('admin');

    return (
        <React.Fragment>
            <Jumbotron>
                <h1>Registrar un nuevo administrador</h1>
            </Jumbotron>
            <Row>
                <Col md={{ size: 4, offset: 4 }} sm={{ size: 12 }}>
                    <Formik
                        initialValues={initialValues}

                        validate={values => {
                            let errors: FormikErrors<AdminInfo> = {};

                            const name = validateName(values.name)
                            if (name) {
                                errors.name = name;
                            }

                            const email = validateEmail(values.email)
                            if (email) {
                                errors.email = email;
                            }

                            const adminType = validateAdminType(values.adminType)
                            if (adminType) {
                                errors.adminType = adminType;
                            }

                            const pwd = validatePassword(values.password)
                            if (pwd) {
                                errors.password = pwd;
                            }

                            console.log(errors)
                            return errors;
                        }}

                        validateOnBlur={true}

                        onSubmit={(values, { setSubmitting }) => {

                            setSubmitting(false);
                            values.name = values.name.trim();
                            values.email = values.email.trim();

                            console.log(values)

                            console.log("hello")

                        }}
                    >
                        {({ values, errors, touched, handleChange, handleSubmit }) =>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup >
                                    <Label htmlFor="name">Nombre</Label>
                                    <Input id="name" name="name" tag={Field} type="text" onChange={handleChange} value={values.name} placeholder="Ejemplo: Juan Pérez" invalid={(typeof errors.name !== 'undefined') && touched.name}></Input>
                                    {touched.name && errors.name && <StyledErrorMessage>{errors.name}</StyledErrorMessage>}
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="email">Correo Electrónico</Label>
                                    <Input id="email" name="email" type="email" tag={Field} onChange={handleChange} value={values.email} placeholder="Ejemplo: admin@email.com" invalid={(typeof errors.email !== 'undefined') && touched.email}></Input>
                                    {touched.email && errors.email && <StyledErrorMessage>{errors.email}</StyledErrorMessage>}
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="adminType">Tipo de Administrador</Label>
                                    <Dropdown id="adminType" isOpen={dropdownOpen} toggle={toggle}>
                                        <DropdownToggle caret>
                                            {adminType === "admin" ? "Administrador" : "Super Administrador"}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={() => {setAdminType("admin")}}>Administrador</DropdownItem>
                                            <DropdownItem onClick={() => {setAdminType("superadmin")}}>Super Administrador</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="password">Contraseña</Label>
                                    <Input id="password" name="password" type="password" tag={Field} onChange={handleChange} value={values.password} invalid={(typeof errors.password !== 'undefined') && touched.password}></Input>
                                    {touched.password && errors.password && <StyledErrorMessage>{errors.password}</StyledErrorMessage>}
                                </FormGroup>
                                <FormGroup>
                                    <Button type="submit" color="primary" className="mr-4">Registrar Administrador</Button>
                                </FormGroup>
                            </Form>}
                    </Formik>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default RegisterAdmins;