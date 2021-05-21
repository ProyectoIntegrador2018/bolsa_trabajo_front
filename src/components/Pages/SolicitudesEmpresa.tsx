import React from 'react';
import { UserContext } from '../Authentication/UserProvider';
import { Table, Row, Col, Button } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import misSolicitudesActivas from '../../testing/misSolicitudesActivas.json';
import misSolicitudesCerradas from '../../testing/misSolicitudesCerradas.json';

function SolicitudesEmpresa() {
  return (
    <React.Fragment>
      <Row className="mx-auto">
        <Col md={{size: 10, offset: 1}} sm={{size: 12}}>
          <h1>Mis solicitudes activas</h1>
          <Table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Empresa</th>
                <th>Puesto</th>
                <th>Estatus</th>
                <th style={{ textAlign: "center" }}>Ver detalle</th>
              </tr>
            </thead>
            <tbody>
            { misSolicitudesActivas.map((solicitud, index) => {
              let urlDetalle = "/oferta/" + solicitud.id;
              return (
              <tr>
                <td className="align-middle" style={{ width: "20%" }}>{solicitud.date}</td>
                <td className="align-middle" style={{ width: "20%" }}>{solicitud.company}</td>
                <td className="align-middle" style={{ width: "20%" }}>{solicitud.position}</td>
                <td className="align-middle" style={{ width: "20%" }}>
                  <div className="alert alert-warning text-center mb-0" role="alert">
                    {solicitud.status}
                  </div>
                </td>
                <td style={{ textAlign: "center", width: "20%"}}>
                  <Link to={urlDetalle}>
                    <Button color="primary" className="mr-4">
                      Ver detalle
                    </Button>
                  </Link>
                </td>
              </tr>
              )
            })}
            </tbody>
          </Table>
          <h1>Mis solicitudes pasadas</h1>
          <Table>
            <thead>
            <tr>
              <th>Fecha</th>
              <th>Empresa</th>
              <th>Puesto</th>
              <th>Estatus</th>
              <th style={{ textAlign: "center" }}>Ver detalle</th>
            </tr>
            </thead>
            <tbody>
            { misSolicitudesCerradas.map((solicitud, index) => {
              let urlDetalle = "/oferta/" + solicitud.id;
              return (
              <tr>
                <td className="align-middle" style={{ width: "20%" }}>{solicitud.date}</td>
                <td className="align-middle" style={{ width: "20%" }}>{solicitud.company}</td>
                <td className="align-middle" style={{ width: "20%" }}>{solicitud.position}</td>
                <td className="align-middle" style={{ width: "20%" }}>
                  <div className="alert alert-primary text-center mb-0" role="alert">
                    {solicitud.status}
                  </div>
                </td>
                <td style={{ textAlign: "center", width: "20%" }}>
                  <Link to={urlDetalle}>
                    <Button color="primary" className="mr-4">
                      Ver detalle
                    </Button>
                  </Link>
                </td>
              </tr>
              )
            })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default SolicitudesEmpresa;
