import React from 'react';
import { Input, Button } from 'antd';
import { Form } from 'antd';
import Swal from 'sweetalert2';
import { Link, useHistory } from 'react-router-dom';
import { createErrorOptions } from '../../helpers/utils/utility';
import { authenticationService } from '../../services/authentication';


function SignIn() {
  const history = useHistory();

  const signInWithEmailAndPasswordHandler = async ({ email, password }: any) => {
    try {
      await authenticationService.login({email, password});
      history.push('/');
    } catch (error) {
      Swal.fire(createErrorOptions(error));
    }
  };

  return (
    <div>
      <Form
        name="basic"
        onFinish={signInWithEmailAndPasswordHandler}
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