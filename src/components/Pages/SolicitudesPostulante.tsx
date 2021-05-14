import React from 'react';
import { Table, Row, Col, Button } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import misSolicitudesActivas from '../../testing/misSolicitudesActivas.json';
import misSolicitudesCerradas from '../../testing/misSolicitudesCerradas.json';

function SolicitudesPostulante() {
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
                <td>{solicitud.date}</td>
                <td>{solicitud.company}</td>
                <td>{solicitud.position}</td>
                <td>{solicitud.status}</td>
                <td style={{ textAlign: "center" }}>
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
                <td>{solicitud.date}</td>
                <td>{solicitud.company}</td>
                <td>{solicitud.position}</td>
                <td>{solicitud.status}</td>
                <td style={{ textAlign: "center" }}>
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

export default SolicitudesPostulante;
