import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, App } from "antd";
import { useState } from "react";
import validator from "validator";
import { registerUser } from "../../api-services/auth-service";
import { HideLoading, ShowLoading } from "../../store/features/alertSlice";
import { useDispatch } from "react-redux";

const Register = ({ setIsLoginOpen, onSuccess }) => {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      // Sanitize Input
      const sanitizedValues = {
        name: validator.escape(values.name.trim()),
        email: validator.escape(values.email.trim()),
        password: validator.escape(values.password.trim()),
      };

      dispatch(ShowLoading());
      const response = await registerUser(sanitizedValues);
      message.success(response.message);
      navigate("/login");
      onSuccess();
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
        <h1 className='text-2xl font-bold text-gray-600'>
          Register your account
        </h1>

        <Form.Item name='name' label='Name' rules={[{ required: true }]}>
          <Input placeholder='Name' />
        </Form.Item>

        <Form.Item name='email' label='Email' rules={[{ required: true }]}>
          <Input placeholder='Email' />
        </Form.Item>

        <Form.Item
          name='password'
          label='Password'
          rules={[{ required: true }]}
        >
          <Input.Password placeholder='Password' />
        </Form.Item>

        <Button type='primary' htmlType='submit' block>
          Register
        </Button>
        <Button onClick={setIsLoginOpen} type='default'>
          Already have an account? Login
        </Button>
      </Form>
    </div>
  );
};

export default Register;
