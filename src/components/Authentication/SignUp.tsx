import React from 'react';
import { Form, Row, Col, Button, Input, Jumbotron, Label, FormGroup } from "reactstrap";
import { useFormik } from "formik";
import { Link, useHistory } from 'react-router-dom';
import { authenticationService, RegisterData } from '../../services/authentication';
import { UserType } from '../../model/Users';

const SignUp = () => {

  const history = useHistory();

  const createUserWithEmailAndPasswordHandler = async ({ name, email, password}: any) => {
    const type: UserType = {type: 'employee'};
    const data: RegisterData = {name, email, password, type};
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
      password: ''
    },
    onSubmit: values => {
      createUserWithEmailAndPasswordHandler(values);
    },
  });

  return (
    <React.Fragment>
          <Jumbotron color="primary">
            <h1>Bienvenido a la bolsa de trabajo del Instituto del Adulto Mayor</h1>
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
                    <Button type="submit" value="submit" color="primary" className="mr-4">Crear Usuario</Button>
                </FormGroup>
                <FormGroup>
                    <Link to="/">Iniciar Sesión</Link>
                </FormGroup>
              </Form>
            </Col>
          </Row>
      </React.Fragment>
  );
};
export default SignUp;
