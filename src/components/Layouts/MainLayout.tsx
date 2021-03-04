import React from 'react';
import { Button } from 'antd';
// import { browserHistory } from 'react-router';

import styled from '@emotion/styled';
import logo from '../../logo.svg';
import { LogoutOutlined, } from '@ant-design/icons';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { getNotImplementedOptions, isAdmin } from '../../helpers/utils/utility';
// import { authenticationService } from '../services/authentication';
// import { UserContext } from '../components/UserProvider';

export const StyledSmallLogo = styled.img`
  width: 100px;
  height: auto;
`;

const StyledNav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const StyledSearch = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const StyledSearchFragment = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledNavContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const StyledDashboardWrapper = styled.div`
  padding: 20px;
`;

function MainLayout({navExtraInfo = <></>, children,}: any) {
  // User context: get user context here (logged in/out??)
  // const user = useContext(UserContext);
  const user = "User";

  const logout = () => {
    // authenticationService.logout();
    Swal.fire(getNotImplementedOptions('Logout'));
  }

  return (
    <StyledDashboardWrapper>
      <StyledNav>
        <Link to="/">
          <StyledSmallLogo src={logo}></StyledSmallLogo>
        </Link>
        <StyledSearch>
          {navExtraInfo}
        </StyledSearch>
        <StyledNavContent>
          <Link to="/">
            <Button type="primary" style={{ marginRight: '10px' }}>
              Home
            </Button>
          </Link>
          <Link to="/lugar-2">
            <Button type="primary" style={{ marginRight: '10px' }}>
             Lugar 2 
            </Button>
          </Link>
          <Link to="/lugar-3">
            <Button type="primary" style={{ marginRight: '10px' }}>
             Lugar 3
            </Button>
          </Link>
          {isAdmin(user) && (
            <Link to="/admin">
              <Button type="primary" style={{ marginRight: '10px' }}>
                Panel Admin
              </Button>
            </Link>
          )}
          <Button
            onClick={logout}
            danger
          >
            Cerrar sesión
            <LogoutOutlined />
          </Button>
        </StyledNavContent>
      </StyledNav>
      {children}
    </StyledDashboardWrapper>
  );
}

export default MainLayout;