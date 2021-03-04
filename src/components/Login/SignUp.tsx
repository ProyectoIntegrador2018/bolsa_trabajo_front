import React from 'react';
import { Form, Input, Button } from 'antd';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { getNotImplementedOptions } from '../../helpers/utils/utility';

const SignUp = () => {
  
  const createUserWithEmailAndPasswordHandler = async ({ name, email, password}: any) => {
    Swal.fire(getNotImplementedOptions("SignUp"));
  }; 

  const onFinishFailed = () => {
    console.log('Logging in failed');
  };

  return (
    <div>
      <Form
        name="basic"
        onFinish={createUserWithEmailAndPasswordHandler}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Nombre"
          name="name"
          rules={[{ required: true, message: 'Enter a valid name' }]}
        >
          <Input />
        </Form.Item>
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
          {/* TODO: Change '/login' to '/' once we get UserContext. */}
          <Link to="/">
            <Button type="primary" style={{ marginRight: '100px' }}>
              Atras 
            </Button>
          </Link>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Crear usuario 
            </Button>
          </Form.Item>
      </Form>
    </div>
  );
};
export default SignUp;
