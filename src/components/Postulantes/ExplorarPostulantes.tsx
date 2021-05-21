import React from 'react';
import { Table, Row, Col, Button } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import listaPostulantes from '../../testing/explorarPostulantes.json'

function ExplorarPostulantes() {

  return (
    <React.Fragment>
      <Row className="mx-auto">
        <Col md={{size: 10, offset: 1}} sm={{size: 12}}>
          <h1>Explorar Postulantes</h1>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th style={{ textAlign: "center" }}>Ver detalle</th>
              </tr>
            </thead>
            <tbody>
            <tr>
              <th scope="row">{0}</th>
              <td>Employee Test</td>
              <td style={{ textAlign: "center" }}>
                <Link to={"/postulantes/pZmKDehcEdWE6xR3cU4cdgk7ynp1"}>
                  <Button color="primary" className="mr-4">
                    Ver detalle
                  </Button>
                </Link>
              </td>
            </tr>
            { listaPostulantes.map((postulante, index) => {
              let urlDetalle = "/postulantes/" + postulante.id;
              return (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{postulante.name}</td>
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

export default ExplorarPostulantes;
