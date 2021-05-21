import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Button, Col, Container, Jumbotron, Row, Table } from 'reactstrap';
import { translateToUserType, User, UserTypeEnum } from '../../model/Users';

function UserAccept() {

    const users: User[] = [
        {
            id: "1",
            username: "ricardo_lozano",
            createdBy: "fjjfkejf",
            type: "employee",
            state: "active",
            email: "rick@email.com"
        },
        {
            id: "2",
            username: "david_acevedo",
            createdBy: "fjjfkejf",
            type: "employee",
            state: "inactive",
            email: "david@email.com"
        },
        {
            id: "3",
            username: "aaron_garcia",
            createdBy: "fjjfkejf",
            type: "company",
            state: "inactive",
            email: "user@email.com"
        },
        {
            id: "4",
            username: "luis_felipe",
            createdBy: "fjjfkejf",
            type: "company",
            state: "active",
            email: "luis@email.com"
        },
    ]

    let inactiveUsers: User[] = [];
    let activeUsers: User[] = [];

    users.forEach(user => {
        if (user.state === "active") {
            activeUsers.push(user);
        }
        else {
            inactiveUsers.push(user)
        }
    })

    let match = useRouteMatch();

    return (
        <React.Fragment>
            <Jumbotron>
                <h1>Autorización de Usuarios</h1>
            </Jumbotron>
            <Container fluid>
                <Row>
                    <Col md={{ size: 10, offset: 1 }} xs={{ size: 12 }} >
                        <Row>
                            <Col>
                                <h3>Usuarios esperando autorización:</h3>
                            </Col>
                        </Row>
                        {
                            inactiveUsers.length > 0 ? (

                                <Row>
                                    <Col>
                                        <Table bordered hover responsive>
                                            <thead>
                                                <tr>
                                                    <th>Nombre de Usuario</th>
                                                    <th>Tipo de Usuario</th>
                                                    <th>Email</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {inactiveUsers.map((user, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{user.username}</td>
                                                            <td>{translateToUserType(user.type) == UserTypeEnum.employee ? "Empleado" : "Organización"}</td>
                                                            <td>{user.email}</td>
                                                            <td className="text-center">
                                                                <Link to={`${match.url}/${user.id}`}>
                                                                    <Button color="primary">Ver Usuario</Button>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            ) :
                                (
                                    <Row>
                                        <Col><p>No hay usuarios esperando autorización</p></Col>
                                    </Row>
                                )
                        }
                    </Col>
                </Row>
            </Container>
            <Container fluid className="mt-5">
                <Row>
                    <Col md={{ size: 10, offset: 1 }} xs={{ size: 12 }} >
                        <Row>
                            <Col>
                                <h3>Usuarios activos:</h3>
                            </Col>
                        </Row>
                        {
                            activeUsers.length > 0 ? (

                                <Row>
                                    <Col>
                                        <Table bordered hover responsive>
                                            <thead>
                                                <tr>
                                                    <th>Nombre de Usuario</th>
                                                    <th>Tipo de Usuario</th>
                                                    <th>Email</th>

                                                </tr>
                                            </thead>
                                            <tbody>

                                                {activeUsers.map((user, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{user.username}</td>
                                                            <td>{translateToUserType(user.type) == UserTypeEnum.employee ? "Empleado" : "Organización"}</td>
                                                            <td>{user.email}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            ) :
                                (
                                    <Row>
                                        <Col><p>No hay usuarios activos</p></Col>
                                    </Row>
                                )
                        }
                    </Col>
                </Row>
            </Container>
        </React.Fragment >
    );
};

export default UserAccept;