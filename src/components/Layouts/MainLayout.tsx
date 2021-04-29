import React, { useContext } from 'react';
import { Button } from 'antd';

import styled from '@emotion/styled';
import logo from '../../logo.svg';
import { LogoutOutlined, } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { isAdmin } from '../../helpers/utils/utility';
import { UserContext } from '../Authentication/UserProvider';
import { authenticationService } from '../../services/authentication';

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
  const { user } = useContext(UserContext);

  const logout = async () => {
    await authenticationService.logout();
  }

  console.log(isAdmin(user));

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
            <Button type="primary">
              Home
            </Button>
          </Link>
          <Link to="/postulantes">
            <Button type="primary">
             ExplorarPostulantes
            </Button>
          </Link>
          {isAdmin(user) && (
            <Link to="/admin">
              <Button type="primary">
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
