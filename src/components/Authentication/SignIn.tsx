import React from 'react';
import { Form, Row, Col, Button, Input, Jumbotron, Label, FormGroup } from "reactstrap";
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

  return (/*
    <div>
      <Form
        
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Enter a valid email' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Enter a valid password' }]}
        >
          <Input.Password />
        </Form.Item>

          <Link to="/register">
            <Button type="primary">
              Register 
            </Button>
          </Link>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Iniciar sesión
            </Button>
          </Form.Item>
      </Form>*/
      <React.Fragment>
          <Jumbotron color="primary">
            <h1>Bienvenido a la bolsa de trabajo del Instituto del Adulto Mayor</h1>
          </Jumbotron>
          <Row className="mx-auto">
            <Col md={{size: 4, offset: 4}} sm={{size: 12}}>
              <Form onSubmit={signInWithEmailAndPasswordHandler}>
                <FormGroup>
                  <Label htmlFor="email" >Email</Label>
                  <Input type="text" id="email" name="email"></Input>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password" >Contraseña</Label>
                  <Input type="password" id="password" name="password"></Input>
                </FormGroup>
                <FormGroup>
                    <Button type="submit" value="submit" color="primary" className="mr-4">Iniciar Sesion</Button>
                    <Link to="/register">
                      <Button color="light" className="mr-4">Registrarse</Button>
                    </Link>
                </FormGroup>
              </Form>
            </Col>
          </Row>
      </React.Fragment>
  );
};

export default SignIn;