import React from 'react';
import { Form, Row, Col, Button, Input, Jumbotron, Label, FormGroup } from "reactstrap";
import { useFormik } from "formik";
import Swal from 'sweetalert2';
import { Link, useHistory } from 'react-router-dom';
import { createErrorOptions } from '../../helpers/utils/utility';
import { authenticationService } from '../../services/authentication';


function SignIn() {
  const history = useHistory();
  const signInWithEmailAndPasswordHandler = async ({ email, password }: any) => {
    try {
      await authenticationService.login({email, password});
      history.push('/');
    } catch (error) {
      Swal.fire(createErrorOptions(error));
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: values => {
      signInWithEmailAndPasswordHandler(values);
    },
  });

  return (
      <React.Fragment>
          <Jumbotron color="primary">
            <h1>Bienvenido a la bolsa de trabajo del Instituto del Adulto Mayor</h1>
          </Jumbotron>
          <Row className="mx-auto">
            <Col md={{size: 4, offset: 4}} sm={{size: 12}}>
              <Form gionSubmit={formik.handleSubmit}>
                <FormGroup>
                  <Label htmlFor="email" >Email</Label>
                  <Input type="text" id="email" name="email" onChange={formik.handleChange} value={formik.values.email}></Input>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password" >Contraseña</Label>
                  <Input type="password" id="password" name="password" onChange={formik.handleChange} value={formik.values.password}></Input>
                </FormGroup>
                <FormGroup>
                    <Button type="submit" value="submit" color="primary" className="mr-4">Iniciar Sesion</Button>
                </FormGroup>
                <FormGroup>
                    <Link to="/register">Registrarse</Link>
                </FormGroup>
              </Form>
            </Col>
          </Row>
      </React.Fragment>
  );
};

export default SignIn;
