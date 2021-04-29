import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Button, Col, Jumbotron, Row } from 'reactstrap';

function AdminHome() {

    let match = useRouteMatch();

    return (
        <React.Fragment>
            <Jumbotron>
                <h1>Panel de Administradores</h1>
            </Jumbotron>
            <Row>
                <Col xs="12" md="4">
                    <Link to={`${match.url}/accept-users`}>
                        <Button>Usuarios Por Aceptar</Button>
                    </Link>
                </Col>
                <Col xs="12" md="4">
                    <Link to={`${match.url}/register-admins`}>
                        <Button>Registrar Administrador</Button>
                    </Link>
                </Col>
                <Col xs="12" md="4">
                    <Link to={`${match.url}/manage-admins`}>
                        <Button>Gestionar Administradores</Button>
                    </Link>
                </Col>
            </Row>
        </React.Fragment>);
}

export default AdminHome;