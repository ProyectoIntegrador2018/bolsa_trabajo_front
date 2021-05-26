import React from 'react';
import { Form, Row, Col, Button, Input, Navbar, Label, FormGroup, Container } from "reactstrap";
import { Formik,Field } from "formik";
import municipios from "../../shared/municipios";
import puestos from "../../shared/puestos";
import * as Yup from 'yup';
import { postEmployeeEnrollmentForm } from '../../services/formService';

//Esquema de validación
const validEmployeeInfoSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Muy corto!').max(50, 'Muy largo!').required('Requerido'),
  birthday: Yup.date().required('Requerido'),
  city: Yup.string().required('Requerido'),
  //agrupar telefonos para requerir solo uno
  phones: Yup.object().test('at-least-one-number', "Necesitamos al menos un telefono al cual poderle contactar", value =>
    !!(value.homePhone || value.personalPhone)
  ),
  lastActivityPeriod: Yup.string().required('Requerido'),
  lastOrganizationActivity: Yup.string().required('Requerido'),
  lastPositionActivity: Yup.string().required('Requerido'),
  worktime: Yup.string().required('Requerido'),
  jobFunction: Yup.string().required('Requerido'),
  desiredActivity: Yup.object().test('at-least-one-activity', "Marcar al menos un valor en capacitación, consultoría, o coaching", value =>
  !!(value.training || value.consulting || value.coaching)),
  workingReasons: Yup.string().required('Requerido'),
  schoolLevel: Yup.string().required('Requerido'),
  schoolName: Yup.string().required('Requerido'),
  schoolStartDate: Yup.date().required('Requerido'),
  schoolEndDate: Yup.date().min(Yup.ref('schoolStartDate'),"La fecha de fin de estudios no puede ser antes que la fecha de inicio").required('Campo requerido'),
  abilities: Yup.array().length(1,'Eligir al menos una de las habilidades en la lista'),
  classification: Yup.string().required('Requerido'),
  TandA: Yup.bool().isTrue('Debe aceptar la politica de privacidad')
});

function generateEmployeeEnrollmentDocument(values: { name: any; birthday: any; birthplace: any; street?: string; city?: string; zipCode?: string; phones?: { homePhone: string; personalPhone: string; }; lastActivityPeriod?: string; lastOrganizationActivity?: string; lastPositionActivity?: string; lastResponsabilityActivity?: string; worktime?: string; jobFunction?: string; desiredActivity?: { training: string; consulting: string; coaching: string; }; workingReasons?: string; schoolLevel?: string; schoolName?: string; schoolStartDate?: string; schoolEndDate?: string; abilities?: never[]; classification?: string; resume?: string; TandA?: boolean; ""?: any; }) {
  let enrollmentDocument = 
    {
      nombre: values.name,
      fecha_de_nacimiento: values.birthday,
      lugar_de_nacimiento: values.birthplace,
      calle: values.street,
      municipio: values.city,
      codigo_postal: values.zipCode,
      telefono_casa: values.phones?.homePhone,
      telefono_celular: values.phones?.personalPhone,
      secciones: {
        
        ultimo_ejemplo_o_actividad: {
          ultimo_periodo: values.lastActivityPeriod,
          empresa: values.lastOrganizationActivity,
          puesto: values.lastPositionActivity,
          responsabilidad: values.lastResponsabilityActivity
        },

        actividad_deseada: {
          jornada_de_trabajo: values.worktime,
          funcion: values.jobFunction,
          capacitacion_o_entrenamiento: values.desiredActivity?.training,
          consultoria: values.desiredActivity?.consulting,
          coaching: values.desiredActivity?.coaching
        },

        nivel_de_estudios: {
          nivel_escolar: values.schoolLevel,
          nombre_institucion: values.schoolName,
          fecha_inicio: values.schoolStartDate,
          fecha_fin: values.schoolEndDate
        },

        comentarios: {
          porque_quieres_trabajo: values.workingReasons
        },

        tus_habilidades_son: {
          habilidades: values.abilities
        },

        clasificacion_puesto : {
          clasificacion: values.classification
        },

        aceptacion_politica : {
          aceptacion : values.TandA
        }
      }
  }
  return enrollmentDocument;
}

const FormEmployee = () => (
        <React.Fragment>
          <Navbar>
            <img src="logoIEPAM_Blanco.png" height="55" width="90"/>
          </Navbar>
          <Container>
            <Row className='my-5'>
              <h1>Formato para registro de postulante</h1>
            </Row>
          </Container>
          <Formik
            initialValues={{
              name: '',
              birthday: '',
              birthplace:'',
              street:'',
              city:'',
              zipCode:'',
              phones: {
                homePhone: '',
                personalPhone: ''
              },
              lastActivityPeriod:'',
              lastOrganizationActivity:'',
              lastPositionActivity:'',
              lastResponsabilityActivity:'',
              worktime:'',
              jobFunction:'',
              desiredActivity:{
                training:'',
                consulting:'',
                coaching:'',
              },
              workingReasons:'',
              schoolLevel:'',
              schoolName:'',
              schoolStartDate: '',
              schoolEndDate: '',
              abilities: [],
              classification: '',
              resume: '',
              TandA: false
            }}
            validationSchema={validEmployeeInfoSchema}
            onSubmit={async (values, { setSubmitting }) => {
                debugger;
                let enrollmentDocument = generateEmployeeEnrollmentDocument(values)
                //console.log(JSON.stringify(values, null, 2))
                //alert(JSON.stringify(values, null, 2));
                await postEmployeeEnrollmentForm(enrollmentDocument)
                alert('Formulario enviado!')
                setSubmitting(false);
              }
            }
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
                  <h3>Datos Personales</h3>
                  <FormGroup>
                      <Label htmlFor="name"><strong>Nombre Completo*</strong></Label>
                      <Input  type="text" 
                              id="name" 
                              name="name" 
                              onChange={handleChange} 
                              value={values.name}/>
                              {errors.name && touched.name ? (
                              <div className="errorMessage">{errors.name}</div>) : null}
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor="birthday" ><strong>Fecha de Nacimiento*</strong></Label>
                      <Input  type="date" 
                              id="birthday" 
                              name="birthday" 
                              onChange={handleChange} 
                              value={values.birthday}/>
                              {errors.birthday && touched.birthday ? (
                              <div className="errorMessage">{errors.birthday}</div>) : null}
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor="birthplace" ><strong>Lugar de nacimiento(Ciudad, Estado, Pais)</strong></Label>
                      <Input  type="text" 
                              id="birthplace" 
                              name="birthplace" 
                              onChange={handleChange} 
                              value={values.birthplace}/>
                              {errors.birthplace && touched.birthplace ? (
                              <div className="errorMessage">{errors.birthplace}</div>) : null}
                  </FormGroup>
                  <FormGroup>
                  <Label><strong>Dirección Actual* (Seleccionar municipio como mínimo)</strong></Label>
                    <Row>
                        <Col md={4}>
                          <Input  type="text" 
                                  id="street" 
                                  name="street" 
                                  onChange={handleChange} 
                                  value={values.street} 
                                  placeholder='Calle y número, Colonia'/>
                                  {errors.street && touched.street ? (
                                  <div className="errorMessage">{errors.street}</div>) : null}
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
                          <div className="errorMessage">{errors.city}</div>) : null}
                        </Col>
                        <Col md={4}>
                          <Input  type='number' 
                                  id="zipCode" 
                                  name="zipCode" 
                                  onChange={handleChange} 
                                  value={values.zipCode} 
                                  placeholder='Código Postal'/>
                                  {errors.zipCode && touched.zipCode ? (
                                  <div className="errorMessage">{errors.zipCode}</div>) : null}
                        </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="phones.homePhone"><strong>Teléfono de casa</strong></Label>
                    <Input  type='tel' 
                            id="phones.homePhone" 
                            name="phones.homePhone" 
                            onChange={handleChange} 
                            value = {values.phones.homePhone}/>
                            {errors.phones && touched.phones ? (
                            <div className="errorMessage">{errors.phones}</div>) : null}
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="phones.personalPhone"><strong>Teléfono celular</strong></Label>
                    <Input  type='tel' 
                            id="phones.personalPhone" 
                            name="phones.personalPhone" 
                            onChange={handleChange} 
                            value = {values.phones.personalPhone}/>
                            {errors.phones && touched.phones? (
                            <div className="errorMessage">{errors.phones}</div>) : null}
                  </FormGroup>
                </Container>
                <Container id='lastEmploymentData'>
                  <h3>Ultimo Empleo o Actividad</h3>
                  <FormGroup>
                    <Label htmlFor="lastActivityPeriod"><strong>Seleccione el periodo de su ultima actividad laboral*</strong></Label>
                      <Input  type="select" 
                              id="lastActivityPeriod" 
                              name="lastActivityPeriod" 
                              onChange={handleChange} 
                              value={values.lastActivityPeriod}>
                                <option value="" disabled selected>Ultimo periodo de trabajo</option>
                                <option>Ultimo año</option>
                                <option>Ultimos tres años o mas</option>
                        </Input>
                        {errors.lastActivityPeriod && touched.lastActivityPeriod? (
                        <div className="errorMessage">{errors.lastActivityPeriod}</div>) : null}
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="lastOrganizationActivity"><strong>Ultima Empresa*</strong></Label>
                    <Input  type="textarea" 
                            id="lastOrganizationActivity" 
                            name="lastOrganizationActivity" 
                            onChange={handleChange} 
                            value={values.lastOrganizationActivity}/>
                            {errors.lastOrganizationActivity && touched.lastOrganizationActivity? (
                              <div className="errorMessage">{errors.lastOrganizationActivity}</div>) : null}
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="lastPositionActivity"><strong>Puesto*</strong></Label>
                    <Input  type="textarea" 
                            id="lastPositionActivity" 
                            name="lastPositionActivity" 
                            onChange={handleChange} 
                            value={values.lastPositionActivity}/>
                            {errors.lastPositionActivity && touched.lastPositionActivity? (
                            <div className="errorMessage">{errors.lastPositionActivity}</div>) : null}
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="lastResponsabilityActivity"><strong>Responsabilidad</strong></Label>
                    <Input  type="textarea" 
                            id="lastResponsabilityActivity" 
                            name="lastResponsabilityActivity" 
                            onChange={handleChange} 
                            value={values.lastResponsabilityActivity}/>
                  </FormGroup>
                </Container>
                <Container id='desiredActivityData'>
                  <h3>Actividad Deseada</h3>
                  <FormGroup tag="fieldset">
                    <Label htmlFor='worktime'><strong>Jornada de Trabajo*</strong></Label>
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
                      <div className="errorMessage">{errors.worktime}</div>) : null}
                    </Col>
                  </FormGroup>
                  <FormGroup tag='fieldset'>
                    <Label htmlFor="jobFunction"><strong>Función*</strong></Label>
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
                      <div className="errorMessage">{errors.jobFunction}</div>) : null}
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="activity.training"><strong>Capacitación o Entrenamiento</strong></Label>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio" 
                                  name="activity.training" 
                                  value='Operativa' 
                                  onChange={handleChange}/>{' '}
                          Operativa
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio" 
                                  name="desiredActivity.training" 
                                  value='Ejecutiva' 
                                  onChange={handleChange}/>{' '}
                          Ejecutiva
                        </Label>
                      </FormGroup>
                      {errors.desiredActivity && touched.desiredActivity ? (
                      <div className="errorMessage">{errors.desiredActivity}</div>) : null}
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="desiredActivity.consulting"><strong>Consultoría</strong></Label>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio" 
                                  name="desiredActivity.consulting" 
                                  value='Operativa' 
                                  onChange={handleChange}/>{' '}
                          Operativa
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio" 
                                  name="desiredActivity.consulting" 
                                  value='Ejecutiva' 
                                  onChange={handleChange}/>{' '}
                          Ejecutiva
                        </Label>
                      </FormGroup>
                      {errors.desiredActivity && touched.desiredActivity ? (
                      <div className="errorMessage">{errors.desiredActivity}</div>) : null}
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="desiredActivity.coaching"><strong>Coaching</strong></Label>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio" 
                                  name="desiredActivity.coaching" 
                                  value='Operativa' 
                                  onChange={handleChange}/>{' '}
                          Operativa
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input  type="radio" 
                                  name="desiredActivity.coaching" 
                                  value='Ejecutiva' 
                                  onChange={handleChange}/>{' '}
                          Ejecutiva
                        </Label>
                      </FormGroup>
                      {errors.desiredActivity && touched.desiredActivity ? (
                      <div className="errorMessage">{errors.desiredActivity}</div>) : null}
                    </Col>
                  </FormGroup>
                </Container>
                <Container id='schoolData'>
                  <h3>Nivel de estudios</h3>
                  <FormGroup>
                    <Label htmlFor="schoolLevel"><strong>Seleccione su máximo nivel de estudio obtenido*</strong></Label>
                    <Row>
                      <Col md={4}>
                        <Input  type="select" 
                                id="schoolLevel" 
                                name="schoolLevel" 
                                onChange={handleChange} 
                                value={values.schoolLevel} 
                                placeholder='Nivel de estudios'>
                                  <option value="" disabled selected>Nivel de estudios</option>
                                  <option>Primaria</option>
                                  <option>Secundaria</option>
                                  <option>Técnica o Bachillerato</option>
                                  <option>Profesional</option>
                                  <option>Maestría o Doctorado</option>
                        </Input>
                        {errors.schoolLevel && touched.schoolLevel ? (
                        <div className="errorMessage">{errors.schoolLevel}</div>) : null}
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="schoolInfo"><strong>Ingrese el nombre de la institución, fecha de inicio y fin de sus estudios*</strong></Label>
                    <Row>
                      <Col md={6}>
                        <Input  type="text" 
                                id="schoolName" 
                                name="schoolName" 
                                onChange={handleChange} 
                                value={values.schoolName} 
                                placeholder='Institución'/>
                                {errors.schoolName && touched.schoolName ? (
                                <div className="errorMessage">{errors.schoolName}</div>) : null}
                      </Col>
                      <Col md={3}>
                        <Input  type="date" 
                                id="schoolStartDate" 
                                name="schoolStartDate" 
                                onChange={handleChange} 
                                value = {values.schoolStartDate} />
                                {errors.schoolStartDate && touched.schoolStartDate ? (
                                <div className="errorMessage">{errors.schoolStartDate}</div>) : null}
                      </Col>
                      <Col md={3}>
                        <Input  type='date'
                                id="schoolEndDate" 
                                name="schoolEndDate" 
                                onChange={handleChange} 
                                value = {values.schoolEndDate}/>
                                {errors.schoolEndDate && touched.schoolEndDate ? (
                                <div className="errorMessage">{errors.schoolEndDate}</div>) : null}
                      </Col>
                    </Row>
                  </FormGroup>
                </Container>
                <Container id='commentaryData'>
                  <h3>Comentarios</h3>
                  <FormGroup>
                    <Label htmlFor="workingReasons"><strong>¿Por qué quieres trabajo?*</strong></Label>
                    <Input  type='textarea' 
                            id="workingReasons" 
                            name="workingReasons" 
                            onChange={handleChange} 
                            value={values.workingReasons}/>
                            {errors.workingReasons && touched.workingReasons ? (
                             <div className="errorMessage">{errors.workingReasons}</div>) : null}
                  </FormGroup>
                </Container>
                <Container id='abilityData'>
                  <h3>Habilidades</h3>
                  <FormGroup>
                  <Label htmlFor='abilities'><strong>Mis habilidades son:</strong></Label>
                    <FormGroup>
                      <Field  type="checkbox" 
                              name='abilities' 
                              value='Hacer Equipo'/>{' '}Hacer equipo
                    </FormGroup>
                    <FormGroup>
                      <Field  type="checkbox" 
                              name='abilities' 
                              value='Trabajar en Equipo'/>{' '}Trabajar en equipo
                    </FormGroup>
                    <FormGroup>
                      <Field  type="checkbox" 
                              name='abilities' 
                              value='Conciliador'/>{' '}Conciliador
                    </FormGroup>
                    <FormGroup>
                      <Field  type="checkbox" 
                              name='abilities' 
                              value='Lider'/>{' '}Líder
                    </FormGroup>
                    <FormGroup>
                      <Field  type="checkbox" 
                              name='abilities' 
                              value='Innovador'/>{' '}Innovador
                    </FormGroup>
                    <FormGroup>
                      <Field  type="checkbox" 
                              name='abilities' 
                              value='Trabajar Solo'/>{' '}Trabajar solo
                    </FormGroup>
                    {errors.abilities && touched.abilities ? (
                             <div className="errorMessage">{errors.abilities}</div>) : null}
                  </FormGroup>
                </Container>
                <Container id='classificationData'>
                  <FormGroup>
                  <h3>Clasificación de puesto</h3>
                  <Label htmlFor='classification'><strong>Selecciona la clasificación que mejor describa el puesto de trabajo deseado:*</strong></Label>
                    <Input  type="select" 
                            id="classificationData" 
                            name="classification" 
                            onChange={handleChange} 
                            value={values.classification} 
                            placeholder='Clasificación'>
                      <option value="" disabled selected>Clasificación</option>
                              {puestos.map((puesto) => <option>{puesto}</option>)}
                    </Input>
                    {errors.classification && touched.classification ? (
                     <div className="errorMessage">{errors.classification}</div>) : null}
                  </FormGroup>
                </Container>
                <Container>
                  <FormGroup>
                    <Col>
                    <Input  name="TandA" 
                              id="privacyCheck" 
                              type="checkbox" 
                              onChange={handleChange}/>{' '} He leído y acepto la <a href='PrivacidadIEPAM.pdf'>política de privacidad</a>
                              {errors.TandA && touched.TandA ? (
                               <div className="errorMessage">{errors.TandA}</div>) : null}
                    </Col>
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

export default FormEmployee;