import React from 'react';
import { Form, Row, Col, Button, Input, Navbar, Label, FormGroup, Container } from "reactstrap";
import { Formik,Field } from "formik";
import municipios from "../../shared/municipios";
import * as Yup from 'yup';
import { Header } from 'antd/lib/layout/layout';

//Esquema de validación
const validEmployeeInfoSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Muy corto!').max(50, 'Muy largo!').required('Requerido'),
  birthday: Yup.date().required('Requerido'),
  birthplace: Yup.string().min(2, 'Muy corto').required('Requerido'),
  street: Yup.string().required('Requerido'),
  city: Yup.string().required('Requerido'),
  zipCode: Yup.number().min(5).max(5).required('Requerido'),
  homePhone: Yup.number().required('Requerido'),
  personalPhone: Yup.number().required('Requerido'),
  lastYearActivity: Yup.string().required('Requerido'),
  lastThreeYearsActivity: Yup.string().required('Requerido'),
  lastOrganizationActivity: Yup.string().required('Requerido'),
  lastPositionActivity: Yup.string().required('Requerido'),
  lastResponsabilityActivity: Yup.string().required('Requerido'),
  worktime: Yup.string().required('Requerido'),
  jobFunction: Yup.string().required('Requerido'),
  training: Yup.string().required('Requerido'),
  consulting: Yup.string().required('Requerido'),
  coaching: Yup.string().required('Requerido'),
  workingReasons: Yup.string().required('Requerido'),
  elementarySchool: Yup.string().required('Requerido'),
  middleSchool: Yup.string().required('Requerido'),
  highSchool: Yup.string().required('Requerido'),
  college: Yup.string().required('Requerido'),
  masters: Yup.string().required('Requerido'),
  elementarySchoolStartDate: Yup.date().required('Requerido'),
  elementarySchoolEndDate: Yup.date().required('Requerido'),
  middleSchoolStartDate: Yup.date().required('Requerido'),
  middleSchoolEndDate: Yup.date().required('Requerido'),
  highSchoolStartDate: Yup.date().required('Requerido'),
  highSchoolEndDate: Yup.date().required('Requerido'),
  collegeStartDate: Yup.date().required('Requerido'),
  collegeEndDate: Yup.date().required('Requerido'),
  mastersStartDate: Yup.date().required('Requerido'),
  mastersEndDate: Yup.date().required('Requerido'),
  abilities: Yup.array().required('Requerido')
});

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
              homePhone:'',
              personalPhone:'',
              lastYearActivity:'',
              lastThreeYearsActivity:'',
              lastOrganizationActivity:'',
              lastPositionActivity:'',
              lastResponsabilityActivity:'',
              worktime:'',
              jobFunction:'',
              training:'',
              consulting:'',
              coaching:'',
              workingReasons:'',
              elementarySchool:'',
              middleSchool:'',
              highSchool:'',
              college:'',
              masters:'',
              elementarySchoolStartDate:'',
              elementarySchoolEndDate:'',
              middleSchoolStartDate:'',
              middleSchoolEndDate:'',
              highSchoolStartDate:'',
              highSchoolEndDate:'',
              collegeStartDate:'',
              collegeEndDate:'',
              mastersStartDate:'',
              mastersEndDate:'',
              abilities: []
            }}
            validationSchema={validEmployeeInfoSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                console.log(JSON.stringify(values, null, 2))
                alert(JSON.stringify(values, null, 2));
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
                  <h3>Datos Personales</h3>
                  <FormGroup>
                      <Label htmlFor="name"><strong>Nombre Completo</strong></Label>
                      <Input  type="text" 
                              id="name" 
                              name="name" 
                              onChange={handleChange} 
                              value={values.name}/>
                              {errors.name && touched.name ? (
                              <div>{errors.name}</div>) : null}
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor="birthday" ><strong>Fecha de Nacimiento</strong></Label>
                      <Input  type="date" 
                              id="birthday" 
                              name="birthday" 
                              onChange={handleChange} 
                              value={values.birthday}/>
                              {errors.birthday && touched.birthday ? (
                              <div>{errors.birthday}</div>) : null}
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor="birthplace" ><strong>Lugar de nacimiento(Ciudad, Estado, Pais)</strong></Label>
                      <Input  type="text" 
                              id="birthplace" 
                              name="birthplace" 
                              onChange={handleChange} 
                              value={values.birthplace}/>
                              {errors.birthplace && touched.birthplace ? (
                              <div>{errors.birthplace}</div>) : null}
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
                    <Label htmlFor="homePhone"><strong>Teléfono de casa</strong></Label>
                    <Input  type='tel' 
                            id="homePhone" 
                            name="homePhone" 
                            onChange={handleChange} 
                            value={values.homePhone}/>
                            {errors.homePhone && touched.homePhone ? (
                            <div>{errors.homePhone}</div>) : null}
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="personalPhone"><strong>Teléfono celular</strong></Label>
                    <Input  type='tel' 
                            id="personalPhone" 
                            name="personalPhone" 
                            onChange={handleChange} 
                            value={values.personalPhone}/>
                            {errors.personalPhone && touched.personalPhone ? (
                            <div>{errors.personalPhone}</div>) : null}
                  </FormGroup>
                </Container>
                <Container id='lastEmploymentData'>
                  <h3>Ultimo Empleo o Actividad</h3>
                  <FormGroup>
                    <Label htmlFor="lastYearActivity"><strong>Ultimo Año</strong></Label>
                    <Input  type='textarea' 
                            id="lastYearActivity" 
                            name="lastYearActivity" 
                            onChange={handleChange} 
                            value={values.lastYearActivity}/>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="lastThreeYearsActivity"><strong>Ultimos Tres Años</strong></Label>
                    <Input  type="textarea" 
                            id="lastThreeYearsActivity" 
                            name="lastThreeYearsActivity" 
                            onChange={handleChange} 
                            value={values.lastThreeYearsActivity}/>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="lastOrganizationActivity"><strong>Ultima Empresa</strong></Label>
                    <Input  type="textarea" 
                            id="lastOrganizationActivity" 
                            name="lastOrganizationActivity" 
                            onChange={handleChange} 
                            value={values.lastOrganizationActivity}/>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="lastPositionActivity"><strong>Puesto</strong></Label>
                    <Input  type="textarea" 
                            id="lastPositionActivity" 
                            name="lastPositionActivity" 
                            onChange={handleChange} 
                            value={values.lastPositionActivity}/>
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
                <Container id='schoolData'>
                  <h3>Nivel de estudios</h3>
                  <FormGroup>
                  <Label htmlFor="elementarySchool"><strong>Primaria</strong></Label>
                    <Row>
                      <Col md={6}>
                        <Input  type="text" 
                                id="elementarySchool" 
                                name="elementarySchool" 
                                onChange={handleChange} 
                                value={values.elementarySchool} 
                                placeholder='Institución'/>
                                {errors.elementarySchool && touched.elementarySchool ? (
                                <div>{errors.elementarySchool}</div>) : null}
                      </Col>
                      <Col md={3}>
                        <Input  type="date" 
                                id="elementarySchoolStartDate" 
                                name="elementarySchoolStartDate" 
                                onChange={handleChange} 
                                value={values.elementarySchoolStartDate}/>
                                {errors.elementarySchoolStartDate && touched.elementarySchoolStartDate ? (
                                <div>{errors.elementarySchoolStartDate}</div>) : null}
                      </Col>
                      <Col md={3}>
                        <Input  type="date" 
                                id="elementarySchoolEndDate" 
                                name="elementarySchoolEndDate" 
                                onChange={handleChange} 
                                value={values.elementarySchoolEndDate}/>
                                {errors.elementarySchoolEndDate && touched.elementarySchoolEndDate ? (
                                <div>{errors.elementarySchoolEndDate}</div>) : null}
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="middleSchool"><strong>Secundaria</strong></Label>
                    <Row>
                      <Col md={6}>
                        <Input  type="text" 
                                id="middleSchool" 
                                name="middleSchool" 
                                onChange={handleChange} 
                                value={values.middleSchool} 
                                placeholder='Institución'/>
                                {errors.middleSchool && touched.middleSchool ? (
                                <div>{errors.middleSchool}</div>) : null}
                      </Col>
                      <Col md={3}>
                        <Input  type="date" 
                                id="middleSchoolStartDate" 
                                name="middleSchoolStartDate" 
                                onChange={handleChange} 
                                value={values.middleSchoolStartDate}/>
                                {errors.middleSchoolStartDate && touched.middleSchoolStartDate ? (
                                <div>{errors.middleSchoolStartDate}</div>) : null}
                      </Col>
                      <Col md={3}>
                        <Input  type="date" 
                                id="middleSchoolEndDate" 
                                name="middleSchoolEndDate" 
                                onChange={handleChange} 
                                value={values.middleSchoolEndDate}/>
                                {errors.middleSchoolEndDate && touched.middleSchoolEndDate ? (
                                <div>{errors.middleSchoolEndDate}</div>) : null}
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="highSchool"><strong>Preparatoria</strong></Label>
                    <Row>
                      <Col md={6}>
                        <Input  type="text" 
                                id="highSchool" 
                                name="highSchool" 
                                onChange={handleChange} 
                                value={values.highSchool} 
                                placeholder='Institución'/>
                                {errors.highSchool && touched.highSchool ? (
                                <div>{errors.highSchool}</div>) : null}
                      </Col>
                      <Col md={3}>
                        <Input  type="date" 
                                id="highSchoolStartDate" 
                                name="highSchoolStartDate" 
                                onChange={handleChange} 
                                value={values.highSchoolStartDate}/>
                                {errors.highSchoolStartDate && touched.highSchoolStartDate ? (
                                <div>{errors.highSchoolStartDate}</div>) : null}
                      </Col>
                      <Col md={3}>
                        <Input  type="date" 
                                id="highSchoolEndDate" 
                                name="highSchoolEndDate" 
                                onChange={handleChange} 
                                value={values.highSchoolEndDate}/>
                                {errors.highSchoolEndDate && touched.highSchoolEndDate ? (
                                <div>{errors.highSchoolEndDate}</div>) : null}
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="college"><strong>Profesional</strong></Label>
                    <Row>
                      <Col md={6}>
                        <Input  type="text" 
                                id="college" 
                                name="college" 
                                onChange={handleChange} 
                                value={values.college} placeholder='Institución'/>
                                {errors.college && touched.college ? (
                                <div>{errors.college}</div>) : null}
                      </Col>
                      <Col md={3}>
                        <Input  type="date" 
                                id="collegeStartDate" 
                                name="collegeStartDate" 
                                onChange={handleChange} 
                                value={values.collegeStartDate}/>
                                {errors.collegeStartDate && touched.collegeStartDate ? (
                                <div>{errors.collegeStartDate}</div>) : null}
                      </Col>
                      <Col md={3}>
                        <Input  type="date" 
                                id="collegeEndDate" 
                                name="collegeEndDate" 
                                onChange={handleChange} 
                                value={values.collegeEndDate}/>
                                {errors.collegeEndDate && touched.collegeEndDate ? (
                                <div>{errors.collegeEndDate}</div>) : null}
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="masters"><strong>Maestria o Doctorado</strong></Label>
                    <Row>
                      <Col md={6}>
                        <Input  type="text" 
                                id="masters" 
                                name="masters" 
                                onChange={handleChange} 
                                value={values.masters} 
                                placeholder='Institución'/>
                                {errors.masters && touched.masters ? (
                                <div>{errors.masters}</div>) : null}
                      </Col>
                      <Col md={3}>
                        <Input  type="date" 
                                id="mastersStartDate" 
                                name="mastersStartDate" 
                                onChange={handleChange} 
                                value={values.mastersStartDate}/>
                                {errors.mastersStartDate && touched.mastersStartDate ? (
                                <div>{errors.mastersStartDate}</div>) : null}
                      </Col>
                      <Col md={3}>
                        <Input  type="date" 
                                id="mastersEndDate" 
                                name="mastersEndDate" 
                                onChange={handleChange} 
                                value={values.mastersEndDate}/>
                                {errors.mastersEndDate && touched.mastersEndDate ? (
                                <div>{errors.mastersEndDate}</div>) : null}
                      </Col>
                    </Row>
                  </FormGroup>
                </Container>
                <Container id='commentaryData'>
                  <h3>Comentarios</h3>
                  <FormGroup>
                    <Label htmlFor="workingReasons"><strong>¿Por qué quieres trabajo?</strong></Label>
                    <Input  type='textarea' 
                            id="workingReasons" 
                            name="workingReasons" 
                            onChange={handleChange} 
                            value={values.workingReasons}/>
                            {errors.workingReasons && touched.workingReasons ? (
                            <div>{errors.workingReasons}</div>) : null}
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
                            <div>{errors.abilities}</div>) : null}
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