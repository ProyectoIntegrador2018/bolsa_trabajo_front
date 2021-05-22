import React, {useContext, useState, useCallback, useEffect} from 'react';
import { UserContext } from '../Authentication/UserProvider';
import { Table, Row, Col, Button } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import misSolicitudesActivas from '../../testing/misSolicitudesActivas.json';
import misSolicitudesCerradas from '../../testing/misSolicitudesCerradas.json';
import { getMatches } from '../../services/matchesService';

function typeTextSwitch(param:any) {
  switch(param) {
    case 'pending':
      return 'Esperando respuesta';
    case 'active':
      return 'En proceso';
    case 'hired':
      return 'Oferta';
    case 'nohired':
      return 'Cerrada';
    case 'rejected':
      return 'Rechazada';
    default:
      return 'Rechazada';
  }
}

function typeColorSwitch(param:any) {
  switch(param) {
    case 'pending':
      return 'primary'
    case 'active':
      return 'warning';
    case 'hired':
      return 'success';
    case 'nohired':
      return 'danger';
    case 'rejected':
      return 'secondary';
    default:
      return 'secondary';
  }
}

function SolicitudesEmpresa() {

    const { user } = useContext(UserContext);

    const [activeMatches, setActiveMatches] = useState<any | null>(null);
    const [pastMatches, setPastMatches] = useState<any | null>(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
      if (user) {
        getMatches().then((data:any) => {
          if (data) {
            let _matches = data.matches;
            _matches.sort((a:any, b:any) => {
              return b.matchMetadata.createdAt - a.matchMetadata.createdAt;
            });
            setActiveMatches(_matches.filter((s:any) => s.state=== 'pending' || s.state === 'active'));
            setPastMatches(_matches.filter((s:any) => s.state=== 'hired' || s.state === 'nohired' || s.state === 'rejected'));
            setLoading(false);
          }
        });
      }
    }, [user]);

    if (isLoading) {
      return (
        <React.Fragment>
          <Row className="mx-auto">
            <Col style={{ textAlign: "center" }} md={{size: 12}} sm={{size: 12}}>
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </Col>
          </Row>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Row className="mx-auto">
          <Col md={{size: 10, offset: 1}} sm={{size: 12}}>
            <h1>Solicitudes activas</h1>
            <Table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Postulante</th>
                  {/*<th>Puesto</th>*/}
                  <th>Estatus</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              { activeMatches && activeMatches.map((solicitud:any, index:number) => {
                let urlDetalle = "/oferta/" + solicitud.id;
                let myClassName = 'alert alert-' + typeColorSwitch(solicitud.state) +' text-center mb-0';
                let date = new Date(solicitud.matchMetadata.createdAt * 1000);
                let formattedDate = (date.getDate()) + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

                return (
                <tr>
                  <td className="align-middle" style={{ width: "20%" }}>{formattedDate}</td>
                  <td className="align-middle" style={{ width: "30%" }}>{solicitud.employeeName}</td>
                  {/*<td className="align-middle" style={{ width: "30%" }}>{solicitud.position}</td>*/}
                  <td className="align-middle" style={{ width: "25%" }}>
                    <div className={myClassName} role="alert">{typeTextSwitch(solicitud.state)}</div>
                  </td>
                  <td className="align-middle" style={{ width: "25%" }}>
                    <Button color="primary" style={{width: "100%"}} className="">Ver detalle</Button>
                  </td>
                </tr>
                )
              })}
              </tbody>
            </Table>
            <h1>Solicitudes pasadas</h1>
            <Table>
              <thead>
              <tr>
                <th>Fecha</th>
                <th>Postulante</th>
                {/*<th>Puesto</th>*/}
                <th>Estatus</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              { pastMatches && pastMatches.map((solicitud:any, index:number) => {
                let urlDetalle = "/oferta/" + solicitud.id;
                let myClassName = 'alert alert-' + typeColorSwitch(solicitud.state) +' text-center mb-0';
                let date = new Date(solicitud.matchMetadata.createdAt * 1000);
                let formattedDate = (date.getDate()) + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
                return (
                <tr>
                  <td className="align-middle" style={{ width: "20%" }}>{formattedDate}</td>
                  <td className="align-middle" style={{ width: "30%" }}>{solicitud.employeeName}</td>
                  {/*<td className="align-middle" style={{ width: "30%" }}>{solicitud.position}</td>*/}
                  <td className="align-middle" style={{ width: "25%" }}>
                    <div className={myClassName} role="alert">{typeTextSwitch(solicitud.state)}</div>
                  </td>
                  <td className="align-middle" style={{ width: "25%" }}>
                    <Button color="primary" style={{width: "100%"}} className="">Ver detalle</Button>
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
