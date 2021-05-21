import React, {useState, useCallback, useEffect} from 'react';
import { Table, Row, Col, Button } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import misSolicitudesActivas from '../../testing/misSolicitudesActivas.json';
import misSolicitudesCerradas from '../../testing/misSolicitudesCerradas.json';
import { UserContext } from '../Authentication/UserProvider';
import { auth} from '../../firebase';

interface User {
  enrollmentFormId?: string;
};

function SolicitudesPostulante() {

  //const user = localStorage.getItem(user);// ? JSON.parse(localStorage.user) : null;

  const [user, setUser] = useState<any | null>(null);
  const getUser = useCallback(() => {
    const userData = localStorage.user ? JSON.parse(localStorage.user) : null;
    return userData;
  }, []);

  useEffect(() => {
    const _user = getUser();
    if (_user) {
      setUser(_user);
    }
  }, [localStorage.user]);

  if (!user) {
    return <h1>Loading...</h1>;
  } else {
    if (!user.enrollmentFormId) {
      return (
        <React.Fragment>
          <Row className="mx-auto">
            <Col md={{size: 10, offset: 1}} sm={{size: 12}} style={{ textAlign: "center" }}>
              <h1>Antes de utilizar los servicios de la bolsa de trabajo debes llenar tus datos en el apartado:</h1>
              <br/>
              <Link to="/form-employee">
                <Button color="primary">
                  <h2>Mi Información</h2>
                </Button>
              </Link>
            </Col>
          </Row>
        </React.Fragment>
      )
    }

    if (!user) {//.state == 'inactive') {
      return (
        <React.Fragment>
          <Row className="mx-auto">
            <Col md={{size: 10, offset: 1}} sm={{size: 12}} style={{ textAlign: "center" }}>
              <h1>Gracias por llenar tu información. Un administrador del IEPAM revisará tus datos y en breve te dará acceso al uso completo de la plataforma.</h1>
            </Col>
          </Row>
        </React.Fragment>
      )
    }

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
                </tr>
              </thead>
              <tbody>
              { misSolicitudesActivas.map((solicitud, index) => {
                let urlDetalle = "/oferta/" + solicitud.id;
                return (
                <tr>
                  <td className="align-middle" style={{ width: "20%" }}>{solicitud.date}</td>
                  <td className="align-middle" style={{ width: "25%" }}>{solicitud.company}</td>
                  <td className="align-middle" style={{ width: "30%" }}>{solicitud.position}</td>
                  <td className="align-middle" style={{ width: "25%" }}>
                    <div className="alert alert-warning text-center mb-0" role="alert">
                      {solicitud.status}
                    </div>
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
              </tr>
              </thead>
              <tbody>
              { misSolicitudesCerradas.map((solicitud, index) => {
                let urlDetalle = "/oferta/" + solicitud.id;
                return (
                <tr>
                  <td className="align-middle" style={{ width: "20%" }}>{solicitud.date}</td>
                  <td className="align-middle" style={{ width: "25%" }}>{solicitud.company}</td>
                  <td className="align-middle" style={{ width: "30%" }}>{solicitud.position}</td>
                  <td className="align-middle" style={{ width: "25%" }}>
                    <div className="alert alert-primary text-center mb-0" role="alert">
                      {solicitud.status}
                    </div>
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
}

export default SolicitudesPostulante;
