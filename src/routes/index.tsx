import React from 'react';

//import async from "../components/Async";

import MainLayout from '../components/Layouts/MainLayout';
import RouteWithLayout from '../components/Layouts/RouteWithLayout';

import { UserContext } from '../components/Authentication/UserProvider';

import SignIn from '../components/Authentication/SignIn';
import SignUp from '../components/Authentication/SignUp';
import FormEmployee from '../components/Forms/FormEmployee';
import FormOrganization from '../components/Forms/FormOrganization';
import PanelAdmin from '../components/PanelAdmin/PanelAdmin';
import CompanyDashboard from '../components/Pages/CompanyDashboard';
import Home from '../components/Home/Home';
import ExplorarPostulantes from '../components/Postulantes/ExplorarPostulantes'
import DetallePostulante from '../components/Postulantes/DetallePostulante'
import SolicitudesPostulante from '../components/Pages/SolicitudesPostulante'
import SolicitudesEmpresa from '../components/Pages/SolicitudesEmpresa'

//const SignIn = async(() => import('../components/Authentication/SignIn'));
//const SignUp = async(() => import('../components/Authentication/SignUp'));
//const PanelAdmin = async(() => import('../components/PanelAdmin/PanelAdmin'));


export const employeeRoutes = [
  {
    path: '/form-employee',
    layout: MainLayout,
    layoutProps: null,
    component: FormEmployee
  },
  {
    path: '/missolicitudes',
    layout: MainLayout,
    layoutProps: null,
    component: SolicitudesPostulante
  },
]

export const companyRoutes = [
  {
    path: '/dashboard',
    layout: MainLayout,
    layoutProps: null,
    component: CompanyDashboard
  },
  {
    path: '/postulantes',
    layout: MainLayout,
    layoutProps: null,
    component: ExplorarPostulantes
  },
  {
    path: '/postulantes/:id',
    layout: MainLayout,
    layoutProps: null,
    component: DetallePostulante
  },
  {
    path: '/form-organization',
    layout: MainLayout,
    layoutProps: null,
    component: FormOrganization
  },
  {
    path: '/solicitudes',
    layout: MainLayout,
    layoutProps: null,
    component: SolicitudesEmpresa
  }
]

export const adminRoutes = [
  {
    path: '/admin',
    layout: MainLayout,
    layoutProps: null,
    component: PanelAdmin
  }
]

export const mainRoutes = [
  {
    path: '/home',
    layout: MainLayout,
    layoutProps: null,
    component: Home
  }
]

export const authRoutes = [
  {
    path: '/',
    layout: null,
    layoutProps: null,
    component: SignIn
  },
  {
    path: '/sign-in',
    layout: null,
    layoutProps: null,
    component: SignIn
  },
  {
    path: '/register',
    layout: null,
    layoutProps: null,
    component: SignUp
  }
]
