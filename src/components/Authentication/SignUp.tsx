import React from 'react';
import { Form, Input, Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { authenticationService, RegisterData } from '../../services/authentication';
import { UserType } from '../../model/Users';

const SignUp = () => {

  const history = useHistory();
  
  const createUserWithEmailAndPasswordHandler = async ({ name, email, password}: any) => {
    const type: UserType = {type: 'employee'};
    const data: RegisterData = {name, email, password, type};
    try {
      await authenticationService.register(data);
      history.push('/'); // redirect to login
    } catch (error) {
      console.error(error);
    }
  }; 

  return (
    <div>
      <Form
        name="basic"
        onFinish={createUserWithEmailAndPasswordHandler}
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
