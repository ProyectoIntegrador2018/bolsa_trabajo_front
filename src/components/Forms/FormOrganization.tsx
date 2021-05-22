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
  TandA: Yup.bool().isTrue('Debe aceptar la politica de privacidad')
});

function generateOrganizationEnrollmentDocument(values: { organizationName: any; street: any; city: any; zipCode: any; telephone1: any; telephone2: any; TandA: any; }) {
  let enrollmentDocument = 
  {
    nombre_empresa: values.organizationName,
    calle: values.street,
    municipio: values.city,
    codigo_postal: values.zipCode,
    telefono_1: values.telephone1,
    telefono_2: values.telephone2,
    aceptacion_politica : {
      aceptacion : values.TandA
    }
}
  return enrollmentDocument;
}

const FormOrganization = () => (
        <React.Fragment>
          <Navbar>
            <img src="logoIEPAM_Blanco.png" height="55" width="90"/>
          </Navbar>
          <Container>
            <Row className='my-5'>
              <h1>Formato para registro de empresa</h1>
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
              TandA: false
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
                              <div className="errorMessage">{errors.organizationName}</div>) : null}
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
                                  {errors.city && touched.city ? (
                                  <div className="errorMessage">{errors.city}</div>) : null}
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
                            <div className="errorMessage">{errors.telephone1}</div>) : null}
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="telephone2"><strong>Teléfono 2</strong></Label>
                    <Input  type='tel' 
                            id="telephone2" 
                            name="telephone2" 
                            onChange={handleChange} 
                            value={values.telephone2}/>
                            {errors.telephone2 && touched.telephone2 ? (
                            <div className="errorMessage">{errors.telephone2}</div>) : null}
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

export default FormOrganization ;