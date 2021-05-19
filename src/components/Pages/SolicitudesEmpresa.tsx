import React from 'react';
import { UserContext } from '../Authentication/UserProvider';
import { isEmployee, isCompany, isMinAdmin } from '../../helpers/utils/utility';
import { Redirect } from "react-router-dom";

function SolicitudesEmpresa() {
  return (
    <h1>Solicitudes Empresa</h1>
  );
}

export default SolicitudesEmpresa;
