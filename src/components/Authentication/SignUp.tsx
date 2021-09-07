import React, { useState } from 'react';
import { Form, Row, Col, Button, Input, Jumbotron, Label, FormGroup, CustomInput, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Formik } from "formik";
import { Link, useHistory } from 'react-router-dom';
import { authenticationService, RegisterData } from '../../services/authentication';
import { UserType } from '../../model/Users';
import * as Yup from 'yup';

const signUpSchema = Yup.object().shape({
  name: Yup.string().required('Requerido'),
  email: Yup.string().required('Requerido').email(),
  password: Yup.string().required('Requerido'),
  phoneNumber: Yup.string().matches(/[0-9]+/, "El número de teléfono solo puede contener números").length(10, "El número de teléfono debe consistir de 10 dígitos").required('Requerido'),
  type: Yup.string().matches(/(employee|company)/, "El valor solo puede ser Empleado u Organización").required('Requerido')
})

const SignUp = () => {

  const history = useHistory();

  const [userType, setUserType] = useState<"employee"|"company">('employee');

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const createUserWithEmailAndPasswordHandler = async ({ name, email, password, phoneNumber }: any) => {
    phoneNumber = phoneNumber[0] == '+' ? phoneNumber : "+52" + phoneNumber
    const type:UserType = {type: userType};
    const data: RegisterData = { name, email, password, type, phoneNumber };
    try {
      await authenticationService.register(data);
      history.push('/'); // redirect to login
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <Jumbotron className="main-jumbotron">
        <Row className="justify-content-center">
          <img src="logoIEPAM_Blanco.png" height="110" width="180" />
        </Row>
      </Jumbotron>
      <Row className="mx-auto">
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            phoneNumber: '',
            type: 'employee'
          }}
          validationSchema={signUpSchema}
          onSubmit={createUserWithEmailAndPasswordHandler}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Col md={{ size: 4, offset: 4 }} sm={{ size: 12 }}>
              <Form onSubmit={handleSubmit}>
                <h2>Registro</h2>
                <hr></hr>
                <FormGroup>
                  <Label htmlFor="name" >Nombre</Label>
                  <Input type="text" id="name" name="name" onChange={handleChange} value={values.name}></Input>
                  {errors.name && touched.name ? (
                    <div className="errorMessage">{errors.name}</div>) : null}
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="email" >Email</Label>
                  <Input type="text" id="email" name="email" onChange={handleChange} value={values.email}></Input>
                  {errors.email && touched.email ? (
                    <div className="errorMessage">{errors.email}</div>) : null}
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password" >Contraseña</Label>
                  <Input type="password" id="password" name="password" onChange={handleChange} value={values.password}></Input>
                  {errors.password && touched.password ? (
                    <div className="errorMessage">{errors.password}</div>) : null}
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="phoneNumber" >Teléfono</Label>
                  <Input type="text" id="phoneNumber" name="phoneNumber" onChange={handleChange} value={values.phoneNumber}></Input>
                  {errors.phoneNumber && touched.phoneNumber ? (
                    <div className="errorMessage">{errors.phoneNumber}</div>) : null}
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="type" >Tipo de cuenta</Label>
                  <Dropdown id="type" isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>
                      {userType === 'employee' ? "Empleado" : "Organización"}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => { setUserType('employee');}}>Empleado</DropdownItem>
                      <DropdownItem onClick={() => { setUserType('company');}}>Organización</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  {errors.type && touched.type ? (
                    <div className="errorMessage">{errors.type}</div>) : null}
                </FormGroup>
                <FormGroup>
                  <Button type="submit" value="submit" color="primary" className="mr-4 signbtn">Crear Usuario</Button>
                </FormGroup>
                <div className="text-center">
                  <p>¿Ya te registraste? <Link to="/">Inicia sesión</Link></p>
                </div>
              </Form>
            </Col>
          )}
        </Formik>
      </Row>
    </React.Fragment>
  );
};
export default SignUp;
