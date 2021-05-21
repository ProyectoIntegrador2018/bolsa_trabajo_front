import React from 'react';
import { Table, Row, Col, Button } from 'reactstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import listaPostulantes from '../../testing/detallesPostulantes.json'

function DetallePostulante() {

  const { id } = useParams<{ id: any }>();

  const postulante = listaPostulantes.find(p => p.userId == id);
  if (!postulante) {
    return (
      <React.Fragment>
        <h1>404. Not found.</h1>
      </React.Fragment>
    )
  }
  const enrollmentForm = postulante.enrollmentForm;
  return (
    <React.Fragment>
      <Row className="mx-auto">
        <Col md={{size: 1, offset: 1}} sm={{size: 12}}>
          <Link to={"/postulantes"}>
            <div className="backbtn mt-0 mt-sm-4 mt-md-4"></div>
          </Link>
        </Col>
        <Col md={{size: 4, offset: -1}} sm={{size: 12}}>
          <h3 className="mb-2 mt-4 mt-sm-4 mt-md-0 text-muted">Detalle de:</h3>
          <h1 className="display-4">{enrollmentForm.nombre}</h1>
        </Col>
        <Col md={{size: 4, offset: 1}} sm={{size: 12}}>
          <br/>
          <Button>Extender oferta</Button>
        </Col>
      </Row>
      <Row className="mx-auto">
        <Col md={{size: 9, offset: 2}} sm={{size: 12}}>
          <hr></hr>
          <h4 className="mb-3">Información General</h4>
          <dl className="row">

            <dt className="col-sm-4">Dirección actual:</dt>
            <dd className="col-sm-8">{enrollmentForm.calle + ", " + enrollmentForm.municipio + ", " + enrollmentForm.codigo_postal}</dd>

            <dt className="col-sm-4">Fecha de nacimiento:</dt>
            <dd className="col-sm-8">{enrollmentForm.fecha_de_nacimiento}</dd>

            <dt className="col-sm-4">Lugar de nacimiento:</dt>
            <dd className="col-sm-8">{enrollmentForm.lugar_de_nacimiento}</dd>

            <dt className="col-sm-4">Telefono casa:</dt>
            <dd className="col-sm-8">{enrollmentForm.telefono_casa}</dd>

            <dt className="col-sm-4">Telefono celular:</dt>
            <dd className="col-sm-8">{enrollmentForm.telefono_celular}</dd>
          </dl>

          <hr></hr>
          <h4 className="mb-3">Último Empleo o Actividad</h4>
          <dl className="row">

            <dt className="col-sm-4">Ultimo Periodo:</dt>
            <dd className="col-sm-8">{enrollmentForm.secciones!.ultimo_ejemplo_o_actividad!.ultimo_periodo}</dd>

            <dt className="col-sm-4">Empresa:</dt>
            <dd className="col-sm-8">{enrollmentForm.secciones!.ultimo_ejemplo_o_actividad!.empresa}</dd>

            <dt className="col-sm-4">Puesto:</dt>
            <dd className="col-sm-8">{enrollmentForm.secciones!.ultimo_ejemplo_o_actividad!.puesto}</dd>

            <dt className="col-sm-4">Responsabilidad:</dt>
            <dd className="col-sm-8">{enrollmentForm.secciones!.ultimo_ejemplo_o_actividad!.responsabilidad}</dd>
          </dl>

          <hr></hr>
          <h4 className="mb-3">Actividad Deseada</h4>
          <dl className="row">

            <dt className="col-sm-4">Jornada de trabajo:</dt>
            <dd className="col-sm-8">{enrollmentForm.secciones!.actividad_deseada!.jornada_de_trabajo}</dd>

            <dt className="col-sm-4">Función:</dt>
            <dd className="col-sm-8">{enrollmentForm.secciones!.actividad_deseada!.funcion}</dd>

            <dt className="col-sm-4">Capacitación o entrenamiento:</dt>
            <dd className="col-sm-8">{enrollmentForm.secciones!.actividad_deseada!.capacitacion_o_entrenamiento}</dd>

            <dt className="col-sm-4">Consultoría:</dt>
            <dd className="col-sm-8">{enrollmentForm.secciones!.actividad_deseada!.consultoria}</dd>

            <dt className="col-sm-4">Coaching:</dt>
            <dd className="col-sm-8">{enrollmentForm.secciones!.actividad_deseada!.coaching}</dd>
          </dl>

          <hr></hr>
          <h4 className="mb-3">Nivel de estudios</h4>
          <dl className="row">
            <dt className="col-sm-4">Nivel Escolar:</dt>
            <dd className="col-sm-8">{enrollmentForm.secciones!.nivel_de_estudios!.nivel_escolar}</dd>
            <dt className="col-sm-4">Institución:</dt>
            <dd className="col-sm-8">{enrollmentForm.secciones!.nivel_de_estudios!.nombre_institucion}</dd>
            <dt className="col-sm-4">Fecha de Inicio:</dt>
            <dd className="col-sm-8">{enrollmentForm.secciones!.nivel_de_estudios!.fecha_inicio}</dd>
            <dt className="col-sm-4">Fecha de Fin:</dt>
            <dd className="col-sm-8">{enrollmentForm.secciones!.nivel_de_estudios!.fecha_fin}</dd>
          </dl>

          <hr></hr>
          <h4 className="mb-3">Habilidades</h4>
          <ul>
          {enrollmentForm.secciones!.tus_habilidades_son!.habilidades.map((habilidad, index) => {
            return <li>{habilidad}</li>;
          })}
          </ul>
          <hr></hr>
          <h4 className="mb-3">Comentarios</h4>
          <dl className="row">

            <dt className="col-sm-4">¿Por qué quieres trabajo?</dt>
            <dd className="col-sm-8">{enrollmentForm.secciones!.comentarios!.porque_quieres_trabajo}</dd>
          </dl>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default DetallePostulante;
