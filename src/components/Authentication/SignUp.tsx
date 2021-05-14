import React from 'react';
import { Form, Row, Col, Button, Input, Jumbotron, Label, FormGroup } from "reactstrap";
import { useFormik } from "formik";
import { Link, useHistory } from 'react-router-dom';
import { authenticationService, RegisterData } from '../../services/authentication';
import { UserType } from '../../model/Users';

const SignUp = () => {

  const history = useHistory();

  const createUserWithEmailAndPasswordHandler = async ({ name, email, password, phoneNumber}: any) => {
    const type: UserType = {type: 'employee'};
    const data: RegisterData = {name, email, password, type, phoneNumber};
      try {
        await authenticationService.register(data);
        history.push('/'); // redirect to login
      } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
      type: ''
    },
    onSubmit: values => {
      createUserWithEmailAndPasswordHandler(values);
    },
  });

  return (
    <React.Fragment>
          <Jumbotron className="main-jumbotron">
            <Row className="justify-content-center">
              <img src="logoIEPAM_Blanco.png" height="110" width="180"/>
            </Row>
          </Jumbotron>
          <Row className="mx-auto">
            <Col md={{size: 4, offset: 4}} sm={{size: 12}}>
              <Form onSubmit={formik.handleSubmit}>
                <FormGroup>
                  <Label htmlFor="name" >Nombre</Label>
                  <Input type="text" id="name" name="name" onChange={formik.handleChange} value={formik.values.name}></Input>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="email" >Email</Label>
                  <Input type="text" id="email" name="email" onChange={formik.handleChange} value={formik.values.email}></Input>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password" >Contraseña</Label>
                  <Input type="password" id="password" name="password" onChange={formik.handleChange} value={formik.values.password}></Input>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="phoneNumber" >Télefono</Label>
                  <Input type="text" id="phoneNumber" name="phoneNumber" onChange={formik.handleChange} value={formik.values.phoneNumber}></Input>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="type" >Tipo de cuenta: </Label>
                  <br/>
                  <select id="type" name="type" onChange={formik.handleChange} value={formik.values.type}>
                    <option value="employee">Empleado</option>
                    <option value="company">Organizacion</option>
                  </select>
                </FormGroup>
                <FormGroup>
                    <Button type="submit" value="submit" color="primary" className="mr-4">Crear Usuario</Button>
                </FormGroup>
                <FormGroup>
                    ¿Ya te registraste? <Link to="/">Inicia sesión</Link>
                </FormGroup>
              </Form>
            </Col>
          </Row>
      </React.Fragment>
  );
};
export default SignUp;
