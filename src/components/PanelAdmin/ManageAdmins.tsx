import React from 'react';
import { Button, Col, Jumbotron, Row, Table } from 'reactstrap';

type AdminInfo = {
    id: number;
    name: string;
    email: string;
    adminType: string;
}

function ManageAdmins() {

    const admins: AdminInfo[] = [
        {
            id: 1,
            name: "Ricardo Lozano",
            email: 'ricardo@email.com',
            adminType: "admin"
        },
        {
            id: 2,
            name: "David Acevedo",
            email: 'david@email.com',
            adminType: "admin"
        },
        {
            id: 3,
            name: "Aarón García",
            email: 'aaron@email.com',
            adminType: "superadmin"
        },
    ]

    return (
        <React.Fragment>
            <Jumbotron>
                <h1>Gestionar administradores</h1>
            </Jumbotron>
            <Row>
                <Col>
                    <h3>Administradores registrados:</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Correo Electrónico</th>
                                <th>Tipo de Administrador</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {admins.map((admin, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{admin.id}</td>
                                        <td>{admin.name}</td>
                                        <td>{admin.email}</td>
                                        <td>{admin.adminType}</td>
                                        <td>
                                            <Button color="primary">Editar</Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default ManageAdmins;