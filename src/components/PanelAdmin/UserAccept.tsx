import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Button, Col, Jumbotron, Row, Table } from 'reactstrap';

function UserAccept() {

    const users = [
        {
            id: 1,
            name: "Ricardo Lozano",
            dateApplied: new Date(Date.now() - 86400000), // that is: 24 * 60 * 60 * 1000
            age: 70,
            city: "Monterrey"
        },
        {
            id: 2,
            name: "Luis Felipe Miranda",
            dateApplied: new Date(Date.now() - (86400000 * 2)), // that is: 24 * 60 * 60 * 1000
            age: 70,
            city: "Santiago"
        },
        {
            id: 3,
            name: "David Acevedo",
            dateApplied: new Date(Date.now() - (86400000 * 3)), // that is: 24 * 60 * 60 * 1000
            age: 70,
            city: "Mina"
        },
    ]

    let match = useRouteMatch();

    return (
        <React.Fragment>
            <Jumbotron>
                <h1>Autorización de Usuarios</h1>
            </Jumbotron>
            <Row>
                <Col>
                    <h3>Usuarios esperando autorización:</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Edad</th>
                                <th>Municipio</th>
                                <th>Fecha de Aplicación</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {users.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{user.name}</td>
                                        <td>{user.age}</td>
                                        <td>{user.city}</td>
                                        <td>{user.dateApplied.toDateString()}</td>
                                        <td>
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
        </React.Fragment >
    );
};

export default UserAccept;