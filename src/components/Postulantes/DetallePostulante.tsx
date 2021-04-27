import React from 'react';
import { Table, Row, Col, Button } from 'reactstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import listaPostulantes from '../../testing/detallesPostulantes.json'
/*
{
  "secciones": {
    "comentarios": {
      "porque_quieres_trabajo": "Para trabajar"
    }
  }
}
*/
function ExplorarPostulantes() {

  const { id } = useParams<{ id: any }>();
  //console.log(params);
  //let id = 1;

  const postulante = listaPostulantes.find(p => p.id == id);
  if (!postulante) {
    return (
      <React.Fragment>
        <h1>404. Not found.</h1>
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      <br/>
      <Row className="mx-auto">
        <Col md={{size: 4, offset: 2}} sm={{size: 12}}>
          <h3 className="mb-2 text-muted">Detalle de:</h3>
          <h1 className="display-4">{postulante.nombre}</h1>
        </Col>
        <Col md={{size: 5, offset: 1}} sm={{size: 12}}>
          <br/>
          <Button>Extender oferta</Button>
        </Col>
      </Row>
      <br/>
      <Row className="mx-auto">
        <Col md={{size: 9, offset: 2}} sm={{size: 12}}>
          <h4>Información General</h4>
          <dl className="row">

            <dt className="col-sm-4">Dirección actual:</dt>
            <dd className="col-sm-8">{postulante.direccion_actual}</dd>

            <dt className="col-sm-4">Fecha de nacimiento:</dt>
            <dd className="col-sm-8">{postulante.fecha_de_nacimiento}</dd>

            <dt className="col-sm-4">Lugar de nacimiento:</dt>
            <dd className="col-sm-8">{postulante.lugar_de_nacimiento}</dd>

            <dt className="col-sm-4">Telefono casa:</dt>
            <dd className="col-sm-8">{postulante.telefono_casa}</dd>

            <dt className="col-sm-4">Telefono celular:</dt>
            <dd className="col-sm-8">{postulante.telefono_celular}</dd>
          </dl>
          <h4>Último Empleo o Actividad</h4>
          <dl className="row">

            <dt className="col-sm-4">Empresa:</dt>
            <dd className="col-sm-8">{postulante.secciones!.ultimo_empleo_o_actividad.empresa}</dd>

            <dt className="col-sm-4">Puesto:</dt>
            <dd className="col-sm-8">{postulante.secciones!.ultimo_empleo_o_actividad.puesto}</dd>

            <dt className="col-sm-4">Responsabilidad:</dt>
            <dd className="col-sm-8">{postulante.secciones!.ultimo_empleo_o_actividad.responsabilidad}</dd>

            <dt className="col-sm-4">Último año:</dt>
            <dd className="col-sm-8">{postulante.secciones!.ultimo_empleo_o_actividad.ultimo_anio}</dd>

            <dt className="col-sm-4">Últimos tres años:</dt>
            <dd className="col-sm-8">{postulante.secciones!.ultimo_empleo_o_actividad.ultimos_tres_anios}</dd>
          </dl>

          <h4>Actividad Deseada</h4>
          <dl className="row">

            <dt className="col-sm-4">Jornada de trabajo:</dt>
            <dd className="col-sm-8">{postulante.secciones!.actividad_deseada.jornada_de_trabajo}</dd>

            <dt className="col-sm-4">Función:</dt>
            <dd className="col-sm-8">{postulante.secciones!.actividad_deseada.funcion}</dd>

            <dt className="col-sm-4">Capacitación o entrenamiento:</dt>
            <dd className="col-sm-8">{postulante.secciones!.actividad_deseada.capacitación_o_entrenamiento}</dd>

            <dt className="col-sm-4">Consultoría:</dt>
            <dd className="col-sm-8">{postulante.secciones!.actividad_deseada.consultoria}</dd>

            <dt className="col-sm-4">Coaching:</dt>
            <dd className="col-sm-8">{postulante.secciones!.actividad_deseada.coaching}</dd>
          </dl>
          {/*ToDo: handle null values with '-'*/}
          <h4>Nivel de estudios</h4>
          <dl className="row">

          <dt className="col-sm-4"></dt>
          <dd className="col-sm-8">
            <dl className="row">
              <dt className="col-sm-6">Institución</dt>
              <dt className="col-sm-6">Fechas</dt>
            </dl>
          </dd>

            <dt className="col-sm-4">Primaria:</dt>
            <dd className="col-sm-8">
              <dl className="row">
                <dd className="col-sm-6">{postulante.secciones!.nivel_de_estudios.primaria.institucion}</dd>
                <dd className="col-sm-6">{postulante.secciones!.nivel_de_estudios.primaria.fechas}</dd>
              </dl>
            </dd>

            <dt className="col-sm-4">Secundaria:</dt>
            <dd className="col-sm-8">
              <dl className="row">
                <dd className="col-sm-6">{postulante.secciones!.nivel_de_estudios.secundaria.institucion}</dd>
                <dd className="col-sm-6">{postulante.secciones!.nivel_de_estudios.secundaria.fechas}</dd>
              </dl>
            </dd>

            <dt className="col-sm-4">Técnica o Bachillerato:</dt>
            <dd className="col-sm-8">
              <dl className="row">
                <dd className="col-sm-6">{postulante.secciones!.nivel_de_estudios.tecnica_o_bachillerato.institucion}</dd>
                <dd className="col-sm-6">{postulante.secciones!.nivel_de_estudios.tecnica_o_bachillerato.fechas}</dd>
              </dl>
            </dd>

            <dt className="col-sm-4">Profesional:</dt>
            <dd className="col-sm-8">
              <dl className="row">
                <dd className="col-sm-6">{postulante.secciones!.nivel_de_estudios.profesional.institucion}</dd>
                <dd className="col-sm-6">{postulante.secciones!.nivel_de_estudios.profesional.fechas}</dd>
              </dl>
            </dd>

            <dt className="col-sm-4">Maestría o Doctorado:</dt>
            <dd className="col-sm-8">
              <dl className="row">
                <dd className="col-sm-6">{postulante.secciones!.nivel_de_estudios.maestria_o_doctorado.institucion}</dd>
                <dd className="col-sm-6">{postulante.secciones!.nivel_de_estudios.maestria_o_doctorado.fechas}</dd>
              </dl>
            </dd>
          </dl>
          <h4>Habilidades</h4>
          <p>
          {postulante.secciones!.tus_habilidades_son.map((habilidad, index) => {
            if (index == 0) {
              return habilidad;
            } else {
              return ", " + habilidad;
            }
          })}
          </p>
          <br/>
          <h4>Comentarios</h4>
          <dl className="row">

            <dt className="col-sm-4">¿Por qué quieres trabajo?</dt>
            <dd className="col-sm-8">{postulante.secciones!.comentarios.porque_quieres_trabajo}</dd>
          </dl>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default ExplorarPostulantes;
