import { useState } from "react";
import validator from "validator";
import { Button, Form, Input, App } from "antd";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api-services/auth-service";
import { HideLoading, ShowLoading } from "../../store/features/alertSlice";
import { useDispatch } from "react-redux";

const Login = ({ setIsSignUpOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { message } = App.useApp();

  const onFinish = async (values) => {
    try {
      const sanitizedValues = {
        email: validator.escape(values.email.trim()),
        password: validator.escape(values.password.trim()),
      };

      dispatch(ShowLoading());
      const response = await loginUser(sanitizedValues);
      message.success(response.message);
      navigate("/Home");
    } catch (error) {
      message.error(
        error.response?.data.error ||
          error.response?.data.message ||
          error.message
      );
    } finally {
      dispatch(HideLoading());
    }
  };

  return (
    <div className='flex items-center justify-center'>
      <Form
        className='flex flex-col gap-5 w-96'
        layout='vertical'
        onFinish={onFinish}
      >
        <h1 className='text-2xl font-bold text-gray-600'>Login your account</h1>

        <Form.Item
          name='email'
          required
          label='Email'
          rules={[{ required: true }]}
        >
          <Input placeholder='Email' />
        </Form.Item>

        <Form.Item
          name='password'
          required
          label='Password'
          rules={[{ required: true }]}
        >
          <Input.Password placeholder='Password' />
        </Form.Item>

        <Button type='primary' htmlType='submit' block>
          Login
        </Button>

        <Button onClick={setIsSignUpOpen}>
          Don't have an account? Register
        </Button>
      </Form>
    </div>
  );
};

export default Login;
