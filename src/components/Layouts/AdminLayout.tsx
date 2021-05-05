import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import styled from '@emotion/styled';


function AdminLayout({ children }: any) {

    const StyledLink = styled.div`
        color: black;
    `

    return (
        <React.Fragment>
            <Row>
                <Col xs="12" md="2">
                    <Row className="mt-3">
                        <Col>
                            <h4>Administradores</h4>
                            <hr></hr>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4" md="12" className="my-3">
                            <Link to="/admin/accept-users">
                                <StyledLink>Usuarios Por Aceptar</StyledLink>
                            </Link>
                        </Col>
                        <Col xs="4" md="12" className="my-3">
                            <Link to="/admin/register-admins">
                            <StyledLink>Registrar Administrador</StyledLink>
                            </Link>
                        </Col>
                        <Col xs="4" md="12" className="my-3">
                            <Link to="/admin/manage-admins">
                            <StyledLink>Gestionar Administradores</StyledLink>
                            </Link>
                        </Col>
                    </Row>
                </Col>
                <Col xs="12" md="10">
                    {children}
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default AdminLayout;