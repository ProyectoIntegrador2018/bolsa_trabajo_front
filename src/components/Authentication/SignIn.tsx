import React from 'react';
import { Form, Row, Col, Button, Input, Jumbotron, Label, FormGroup } from "reactstrap";
import Swal from 'sweetalert2';
import { Link, useHistory } from 'react-router-dom';
import { createErrorOptions } from '../../helpers/utils/utility';
import { authenticationService } from '../../services/authentication';


function SignIn() {
  const history = useHistory();

  const signInWithEmailAndPasswordHandler = async (e: any) => {
    // TODO check this, workaround for getting inputs is kind of sketchy
    // Check binding in Form onSubmit call to this function on how
    // to send the inputs in a better way.
    try {
      e.preventDefault();
      let email = e.target[0].value;
      let password = e.target[1].value;
      await authenticationService.login({email, password});
      history.push('/');
    } catch (error) {
      Swal.fire(createErrorOptions(error));
    }
  };

  return (
      <React.Fragment>
          <Jumbotron color="primary">
            <h1>Bienvenido a la bolsa de trabajo del Instituto del Adulto Mayor</h1>
          </Jumbotron>
          <Row className="mx-auto">
            <Col md={{size: 4, offset: 4}} sm={{size: 12}}>
              <Form onSubmit={(e) => signInWithEmailAndPasswordHandler(e)}>
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
