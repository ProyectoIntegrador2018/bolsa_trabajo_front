import React, {useContext, useState, useCallback, useEffect} from 'react';
import { Table, Row, Col, Button } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import municipios from "../../shared/municipios";
import { getEmployeesFiltered } from '../../services/employeeService';
import { useFormik, Formik, Field, useFormikContext } from "formik";
import { Form, Input, Jumbotron, Label, FormGroup, CustomInput } from "reactstrap";
import { UserContext } from '../Authentication/UserProvider';

function ExplorarPostulantes() {

  const { user } = useContext(UserContext);

  const [isLoading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<any | null>(null);

  useEffect(() => {
    if (user) {
      getEmployeesFiltered({field: "municipio", operator: "==", target: "Monterrey"}).then((data:any) => {
        if (data) {
          setEmployees(data);
          setLoading(false);
        }
      });
    }
  }, [user]);

  const myHandleChange = (e:any) => {
    const selectedField = e.target.value;
    console.log(selectedField);
  }



  const formik = useFormik({
    initialValues: {
      field: 'municipio',
      operator: '==',
      target: 'Monterrey'
    },
    onSubmit: async (values) => {
      const result = await getEmployeesFiltered(values);
      setEmployees(result);
    },
  });

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
  // console.log("Working: ", employees);
  return (
    <React.Fragment>
      <Row className="mx-auto">
        <Col md={{size: 10, offset: 1}} sm={{size: 12}}>
          <h1>Explorar Postulantes</h1>
          <Form onSubmit={formik.handleSubmit}>
          <Row className="mx-auto">
            <Col md={{size: 4}} sm={{size: 4}}>
              <Label htmlFor="field" >Filtrar por:</Label>
            </Col>
            <Col md={{size: 4}} sm={{size: 4}}>
            </Col>
            <Col md={{size: 4}} sm={{size: 4}}>
            </Col>
          </Row>
          <Row className="mx-auto">
            <Col md={{size: 4}} sm={{size: 4}}>
            <FormGroup>
              <CustomInput type="select" id="field" name="field" onChange={formik.handleChange} value={formik.values.field}>
                <option value="municipio">Municipio</option>
                <option value="secciones.actividad_deseada.jornada_de_trabajo">Jornada de trabajo</option>
                <option value="secciones.clasificacion_puesto.clasificacion">Puesto deseado</option>
                <option value="secciones.nivel_de_estudios.nivel_escolar">Nivel de estudios</option>
              </CustomInput>
            </FormGroup>
            </Col>
            <Col md={{size: 4}} sm={{size: 4}}>
            <FormGroup>
              <CustomInput type="select" id="target" name="target" onChange={formik.handleChange} value={formik.values.field}>
                {municipios.map((municipio) => {
                  return <option value={municipio}>{municipio}</option>;
                })}
              </CustomInput>
            </FormGroup>
            </Col>
            <Col md={{size: 4}} sm={{size: 4}}>
            <FormGroup>
                <Button type="submit" value="submit" color="primary" className="mr-4 signbtn">Buscar</Button>
            </FormGroup>
            </Col>
          </Row>
          </Form>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th style={{ textAlign: "center" }}>Ver detalle</th>
              </tr>
            </thead>
            <tbody>
            { employees && employees.users.map((postulante:any, index:number) => {
              let urlDetalle = "/postulantes/" + postulante.id;
              return (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{postulante.username}</td>
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
