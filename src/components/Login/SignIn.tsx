import React from 'react';
import { Input, Button } from 'antd';
import { Form } from 'antd';
import Swal from 'sweetalert2';
import logo from '../assets/logo.png';
import { Link, useHistory } from 'react-router-dom';
// import { authenticationService } from '../services/authentication';
import { createErrorOptions, getNotImplementedOptions } from '../../helpers/utils/utility';


function SignIn() {
  const history = useHistory();

  const signInWithEmailAndPasswordHandler = async ({ email, password }: any) => {
    Swal.fire(getNotImplementedOptions('Login'))
    try {
      // const user = await authenticationService.login(email, password);
      // console.log(`Before redirect ${user}`);
      history.push('/');
    } catch (error) {
      Swal.fire(createErrorOptions(error));
    }
  };

  const onFinishFailed = () => {
    console.log('Logging in failed');
  };

  return (
    <div>
      <Form
        name="basic"
        onFinish={signInWithEmailAndPasswordHandler}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Enter a valid email' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Enter a valid password' }]}
        >
          <Input.Password />
        </Form.Item>

          <Link to="/register">
            <Button type="primary">
              Register 
            </Button>
          </Link>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Iniciar sesión
            </Button>
          </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;