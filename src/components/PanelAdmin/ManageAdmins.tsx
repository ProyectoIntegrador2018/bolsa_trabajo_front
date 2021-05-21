import React, { useContext, useState } from 'react';
import { Button, Col, Container, Jumbotron, Modal, ModalBody, ModalHeader, Row, Table, UncontrolledCollapse } from 'reactstrap';
import { isMinAdmin, isSuperAdmin } from '../../helpers/utils/utility';
import { Admin, AdminCreate, translateToAdminType } from '../../model/Admins';
import { UserContext } from '../Authentication/UserProvider';
import RegisterAdmins from './RegisterAdmins';



function ManageAdmins() {

    const admins: Admin[] = [
        {
            id: "1",
            username: "ricardo_lozano",
            email: 'ricardo@email.com',
            type: "admin",
            phoneNumber: "+528120005940",
            createdBy: "fko4ikmdor",
            state: "active"
        },
        {
            id: "2",
            username: "david _acevedo",
            email: 'david@email.com',
            type: "admin",
            phoneNumber: "+528120005940",
            createdBy: "fko4ikmdor",
            state: "active"
        },
        {
            id: "3",
            username: "aaron_garcia",
            email: 'aaron@email.com',
            type: "superadmin",
            phoneNumber: "+528120005940",
            createdBy: "fko4ikmdor",
            state: "active"
        },
    ]


    const { user } = useContext(UserContext);

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const emptyAdmin : Admin = {
        id: "",
        username: "",
        email: '',
        type: "",
        phoneNumber: "",
        createdBy: "",
        state: ""
    }
    const [adminEdit, setAdminEdit] = useState(emptyAdmin);

    return (
        <React.Fragment>
            <Jumbotron>
                <h1>Gestionar Administradores</h1>
            </Jumbotron>
            <Container fluid>
                <Row>
                    <Col md={{ size: 10, offset: 1 }} xs={{ size: 12 }}>
                        <Row>
                            <Col>
                                <h3>Administradores Registrados:</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Table bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Nombre</th>
                                            <th>Correo Electrónico</th>
                                            <th>Tipo de Administrador</th>
                                            {
                                                isSuperAdmin(user) && (
                                                    <th></th>
                                                )
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {admins.map((admin, index) => {
                                            return (


                                                <tr key={index}>
                                                    <td>{admin.id}</td>
                                                    <td>{admin.username}</td>
                                                    <td>{admin.email}</td>
                                                    <td>{admin.type}</td>
                                                    {
                                                        isSuperAdmin(user) && (
                                                            <td className="text-center">
                                                                <Button color="primary" onClick={() => { setAdminEdit(admin); toggle(); }}>Editar</Button>

                                                            </td>
                                                        )
                                                    }
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Modal isOpen={modal} toggle={toggle} >
                    <ModalHeader toggle={toggle}>Editar Administrador</ModalHeader>
                    <ModalBody>
                        <RegisterAdmins admin={adminEdit} isEdit onEdit={() => { setModal(false) }} />
                    </ModalBody>
                </Modal>
            </Container>
        </React.Fragment>
    )
}

export default ManageAdmins;