import React from 'react';
import { Form, Row, Col, Button, Input, Navbar, Label, FormGroup, Container } from "reactstrap";
import { Formik,Field } from "formik";
import municipios from "../../shared/municipios";
import * as Yup from 'yup';

//Esquema de validación
const validPositionInfoSchema = Yup.object().shape({
  organizationName: Yup.string().min(2, 'Muy corto!').max(50, 'Muy largo!').required('Requerido'),
  street: Yup.string().required('Requerido'),
  city: Yup.string().required('Requerido'),
  zipCode: Yup.number().min(5).max(5).required('Requerido'),
  telephone1: Yup.number().required('Requerido'),
  telephone2: Yup.number().required('Requerido'),
  worktime: Yup.string().required('Requerido'),
  jobFunction: Yup.string().required('Requerido'),
  training: Yup.string().required('Requerido'),
  consulting: Yup.string().required('Requerido'),
  coaching: Yup.string().required('Requerido'),
  machineOperationDescription: Yup.string().required('Requerido'),
  technicalKnowledgeDescription: Yup.string().required('Requerido'),
  computingEquimentKnowledge: Yup.string().required('Requerido'),
  programmingKnowledge: Yup.string().required('Requerido'),
  logicKnowledge: Yup.string().required('Requerido'),
  numericKnowledge: Yup.string().required('Requerido'),
  professionalTitle: Yup.string().required('Requerido')
});

function generateOrganizationEnrollmentDocument(values: { organizationName: string; street: string; city: string; zipCode: string; telephone1: string; telephone2: string; worktime: string; jobFunction: string; training: string; consulting: string; coaching: string; machineOperationDescription: string; technicalKnowledgeDescription: string; computingEquimentKnowledge: string; programmingKnowledge: string; logicKnowledge: string; numericKnowledge: string; competences: never[]; professionalTitle: string; }) {
  let enrollmentDocument = 
  {
    nombre_empresa: values.organizationName,
    calle: values.street,
    municipio: values.city,
    codigo_postal: values.zipCode,
    telefono_1: values.telephone1,
    telefono_2: values.telephone2,
    secciones: {
            posicion_vacante: {
                    jornada_de_trabajo: values.worktime,
                    funcion: values.jobFunction,
                    capacitacion_o_entrenamiento: values.training,
                    consultoria: values.consulting,
                    coaching: values.coaching
            },
            habilidades_necesarias: {
                    operacion_de_maquinaria: values.machineOperationDescription,
                    conocimientos_tecnicos: values.technicalKnowledgeDescription,
                    manejo_de_equipo_de_computo: values.computingEquimentKnowledge,
                    programacion_u_office: values.programmingKnowledge,
                    analisis_logico: values.logicKnowledge,
                    analisis_numerico: values.numericKnowledge
            },
            competencias_requeridas: {
                    competencias: values.competences
            }
    }
}
  return enrollmentDocument;
}

const FormPosition = () => (
        <React.Fragment>
          <Navbar>
            <img src="logoIEPAM_Blanco.png" height="55" width="90"/>
          </Navbar>
          <Container>
            <Row className='my-5'>
              <h1>Formato para registro de puesto</h1>
            </Row>
          </Container>
          <Formik
            initialValues={{
              organizationName: '',
              street:'',
              city:'',
              zipCode:'',
              telephone1:'',
              telephone2:'',
              worktime:'',
              jobFunction:'',
              training:'',
              consulting:'',
              coaching:'',
              machineOperationDescription: '',
              technicalKnowledgeDescription: '',
              computingEquimentKnowledge: '',
              programmingKnowledge: '',
              logicKnowledge: '',
              numericKnowledge: '',
              competences: [],
              professionalTitle: ''
            }}
            validationSchema={validPositionInfoSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                //console.log(JSON.stringify(values, null, 2))
                //alert(JSON.stringify(values, null, 2));
                let enrollmentDocument = generateOrganizationEnrollmentDocument(values)
                console.log(JSON.stringify(enrollmentDocument))
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ 
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
             }) => (
              <Form onSubmit={handleSubmit}>
                <Container id='personalData'>
                  <h3>Datos de la Empresa</h3>
                  <FormGroup>
                      <Label htmlFor="organizationName"><strong>Nombre de la Empresa</strong></Label>
                      <Input  type="text" 
                              id="organizationName" 
                              name="organizationName" 
                              onChange={handleChange} 
                              value={values.organizationName}/>
                              {errors.organizationName && touched.organizationName ? (
                              <div>{errors.organizationName}</div>) : null}
                  </FormGroup>
                  <FormGroup>
                  <Label><strong>Dirección Actual</strong></Label>
                    <Row>
                        <Col md={4}>
                          <Input  type="text" 
                                  id="street" 
                                  name="street" 
                                  onChange={handleChange} 
                                  value={values.street} 
                                  placeholder='Calle y número, Colonia'/>
                                  {errors.street && touched.street ? (
                                  <div>{errors.street}</div>) : null}
                        </Col>
                        <Col md={4}>
                          <Input  type="select" 
                                  id="cityDropdown" 
                                  name="city" 
                                  onChange={handleChange} 
                                  value={values.city} 
                                  placeholder='Municipio'>
                            <option value="" disabled selected>Selecciona tu municipio</option>
                            {municipios.map((municipio) => <option>{municipio}</option>)}
                          </Input>
                          {errors.city && touched.city ? (
                          <div>{errors.city}</div>) : null}
                        </Col>
                        <Col md={4}>
                          <Input  type='number' 
                                  id="zipCode" 
                                  name="zipCode" 
                                  onChange={handleChange} 
                                  value={values.zipCode} 
                                  placeholder='Código Postal'/>
                                  {errors.city && touched.city ? (
                                  <div>{errors.city}</div>) : null}
                        </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="telephone1"><strong>Teléfono 1</strong></Label>
                    <Input  type='tel' 
                            id="telephone1" 
                            name="telephone1" 
                            onChange={handleChange} 
                            value={values.telephone1}/>
                            {errors.telephone1 && touched.telephone1 ? (
                            <div>{errors.telephone1}</div>) : null}
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="personalPhone"><strong>Teléfono 2</strong></Label>
                    <Input  type='tel' 
                            id="personalPhone" 
                            name="personalPhone" 
                            onChange={handleChange} 
                            value={values.telephone2}/>
                            {errors.telephone2 && touched.telephone2 ? (
                            <div>{errors.telephone2}</div>) : null}
                  </FormGroup>
                </Container>
                <Container id='desiredActivityData'>
                  <h3>Actividad Deseada</h3>
                  <FormGroup tag="fieldset">
                    <Label htmlFor='worktime'><strong>Jornada de Trabajo</strong></Label>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio" 
                                  name="worktime" 
                                  value='partial' 
                                  onChange={handleChange}/>{' '}
                          Parcial (horas)
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio" 
                                  name="worktime" 
                                  value='fulltime' 
                                  onChange={handleChange}/> 
                          Completa
                        </Label>
                      </FormGroup>
                      {errors.worktime && touched.worktime ? (
                      <div>{errors.worktime}</div>) : null}
                    </Col>
                  </FormGroup>
                  <FormGroup tag='fieldset'>
                    <Label htmlFor="jobFunction"><strong>Función</strong></Label>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio" 
                                  name="jobFunction" 
                                  value='Operativa' 
                                  onChange={handleChange}/>{' '}
                          Operativa
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio" 
                                  name="jobFunction" 
                                  value='Contable' 
                                  onChange={handleChange}/>{' '}
                          Contable
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio" 
                                  name="jobFunction" 
                                  value='Administrativa' 
                                  onChange={handleChange}/>{' '}
                          Administrativa
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio" 
                                  name="jobFunction" 
                                  value='Gerencial'
                                  onChange={handleChange}/>{' '}
                          Gerencial
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio" 
                                  name="jobFunction" 
                                  value='A Pie de Maquina' 
                                  onChange={handleChange}/>{' '}
                          A pie de máquina
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio" 
                                  name="jobFunction" 
                                  value='Supervision' 
                                  onChange={handleChange}/>{' '}
                          Supervisión
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio" 
                                  name="jobFunction" 
                                  value='Oficina' 
                                  onChange={handleChange}/>{' '}
                          Oficina
                        </Label>
                      </FormGroup>
                      {errors.jobFunction && touched.jobFunction ? (
                      <div>{errors.jobFunction}</div>) : null}
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="training"><strong>Capacitación o Entrenamiento</strong></Label>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio" 
                                  name="training" 
                                  value='Operativa' 
                                  onChange={handleChange}/>{' '}
                          Operativa
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio" 
                                  name="training" 
                                  value='Ejecutiva' 
                                  onChange={handleChange}/>{' '}
                          Ejecutiva
                        </Label>
                      </FormGroup>
                      {errors.training && touched.training ? (
                      <div>{errors.training}</div>) : null}
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="consulting"><strong>Consultoría</strong></Label>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio" 
                                  name="consulting" 
                                  value='Operativa' 
                                  onChange={handleChange}/>{' '}
                          Operativa
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio" 
                                  name="consulting" 
                                  value='Ejecutiva' 
                                  onChange={handleChange}/>{' '}
                          Ejecutiva
                        </Label>
                      </FormGroup>
                      {errors.consulting && touched.consulting ? (
                      <div>{errors.consulting}</div>) : null}
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="coaching"><strong>Coaching</strong></Label>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio" 
                                  name="coaching" 
                                  value='Operativa' 
                                  onChange={handleChange}/>{' '}
                          Operativa
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio" 
                                  name="coaching" 
                                  value='Ejecutiva' 
                                  onChange={handleChange}/>{' '}
                          Ejecutiva
                        </Label>
                      </FormGroup>
                      {errors.coaching && touched.coaching ? (
                      <div>{errors.coaching}</div>) : null}
                    </Col>
                  </FormGroup>
                </Container>
                <Container id='abilityData'>
                  <h3>Habilidades</h3>
                  <FormGroup>
                  <Label htmlFor='abilities'><strong>Habilidades necesarias:</strong></Label>
                    <FormGroup>
                    <Label htmlFor='machineOperationDescription'>Operación de maquinaria (especificar que tipo)</Label>
                      <Input  type="textarea" 
                              name='machineOperationDescription' 
                              value={values.machineOperationDescription} />
                              {errors.machineOperationDescription && touched.machineOperationDescription ? (
                              <div>{errors.machineOperationDescription}</div>) : null}
                    </FormGroup>
                    <FormGroup>
                    <Label htmlFor='technicalKnowledgeDescription'>Conocimientos Técnicos (especificar)</Label>
                    <Input  type="textarea" 
                            name='technicalKnowledgeDescription' 
                            value={values.technicalKnowledgeDescription} />
                            {errors.technicalKnowledgeDescription && touched.technicalKnowledgeDescription ? (
                            <div>{errors.technicalKnowledgeDescription}</div>) : null}        
                    </FormGroup>
                    <FormGroup>
                    <Label htmlFor='computingEquimentKnowledge'>Manejo de equipo de cómputo</Label>
                    <Input  type="textarea" 
                            name='computingEquimentKnowledge' 
                            value={values.computingEquimentKnowledge} />
                            {errors.computingEquimentKnowledge && touched.computingEquimentKnowledge ? (
                            <div>{errors.computingEquimentKnowledge}</div>) : null}
                    </FormGroup>
                    <FormGroup>
                    <Label htmlFor='programmingKnowledge'>Programación u Office</Label>
                    <Input  type="textarea" 
                            name='programmingKnowledge' 
                            value={values.programmingKnowledge} />
                            {errors.programmingKnowledge && touched.programmingKnowledge ? (
                            <div>{errors.programmingKnowledge}</div>) : null}
                    </FormGroup>
                    <FormGroup>
                    <Label htmlFor='programmingKnowledge'>Análisis Lógico</Label>
                    <Input  type="textarea" 
                            name='logicKnowledge' 
                            value={values.logicKnowledge} />
                            {errors.logicKnowledge && touched.logicKnowledge ? (
                            <div>{errors.logicKnowledge}</div>) : null}
                    </FormGroup>
                    <FormGroup>
                    <Label htmlFor='numericKnowledge'>Análisis Numérico</Label>
                    <Input  type="textarea" 
                            name='numericKnowledge' 
                            value={values.numericKnowledge} />
                            {errors.numericKnowledge && touched.numericKnowledge ? (
                            <div>{errors.numericKnowledge}</div>) : null}
                    </FormGroup>
                  </FormGroup>
                </Container>
                <Container id='competenceData'>
                  <h3>Competencias</h3>
                  <FormGroup>
                  <Label htmlFor='competences'><strong>Competencias requeridas:</strong></Label>
                    <FormGroup>
                      <Field  type="checkbox" 
                              name='competences' 
                              value='Liderazgo'/>{' '}Liderazgo
                    </FormGroup>
                    <FormGroup>
                      <Field  type="checkbox" 
                              name='competences' 
                              value='Conciliador'/>{' '}Conciliador
                    </FormGroup>
                    <FormGroup>
                      <Field  type="checkbox" 
                              name='competences' 
                              value='Negociador'/>{' '}Negociador
                    </FormGroup>
                    <FormGroup>
                      <Field  type="checkbox" 
                              name='competences' 
                              value='Trabajo en Equipo'/>{' '}Trabajo en Equipo
                    </FormGroup>
                    <FormGroup>
                      <Field  type="checkbox" 
                              name='competences' 
                              value='Certificación en capacitación'/>{' '}Certificación en capacitación
                    </FormGroup>
                    <FormGroup>
                      <Field  type="checkbox" 
                              name='competences' 
                              value='Certificación como consejero'/>{' '}Certificación como consejero
                    </FormGroup>
                    <FormGroup>
                      <Field  type="checkbox" 
                              name='competences' 
                              value='Capacidad gerencial'/>{' '}Capacidad gerencial
                    </FormGroup>
                    <FormGroup>
                      <Field  type="checkbox" 
                              name='competences' 
                              value='Capacidad directiva'/>{' '}Capacidad directiva
                    </FormGroup>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor='professionalTitle'><strong>Titulo Profesional en:</strong></Label>
                    <Input  type='text'
                            name='professionalTitle' 
                            value={values.professionalTitle} />
                            {errors.professionalTitle && touched.professionalTitle ? (
                            <div>{errors.professionalTitle}</div>) : null}
                        
                  </FormGroup>
                </Container>
                <Container>
                  <FormGroup>
                    <Button type="submit" color="primary">
                        Enviar
                    </Button>
                  </FormGroup>
                </Container>
              </Form>
            )}
          </Formik> 
        </React.Fragment>
    );

export default FormPosition ;