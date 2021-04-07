import React from 'react';
import { Form, Row, Col, Button, Input, Jumbotron, Label, FormGroup } from "reactstrap";
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

  return (
    <React.Fragment>
          <Jumbotron color="primary">
            <h1>Bienvenido a la bolsa de trabajo del Instituto del Adulto Mayor</h1>
          </Jumbotron>
          <Row className="mx-auto">
            <Col md={{size: 4, offset: 4}} sm={{size: 12}}>
              <Form onSubmit={createUserWithEmailAndPasswordHandler}>
              <FormGroup>
                  <Label htmlFor="name" >Nombre</Label>
                  <Input type="text" id="name" name="name"></Input>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="email" >Email</Label>
                  <Input type="text" id="email" name="email"></Input>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password" >Contraseña</Label>
                  <Input type="password" id="password" name="password"></Input>
                </FormGroup>
                <FormGroup>
                    <Button type="submit" value="submit" color="primary" className="mr-4">Crear Usuario</Button>
                    <Link to="/">
                      <Button color="light" className="mr-4">Iniciar Sesión</Button>
                    </Link>
                </FormGroup>
              </Form>
            </Col>
          </Row>
      </React.Fragment>
  );
};
export default SignUp;
