import React, { useState } from "react";
import { Button, Image, Input, Modal, Form, message, App } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { updateUsers } from "../../../api-services/user-service";
import { SetUser } from "../../../store/features/userSlice";
import { HideLoading, ShowLoading } from "../../../store/features/alertSlice";
import validator from "validator";

const ProfileInformation = () => {
  const savedRecipes = useSelector((state) => state.recipe?.savedRecipes || []);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const { message } = App.useApp();

  const showModal = () => {
    form.setFieldsValue({
      name: user?.name,
      email: user?.email,
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUpdateProfile = async (values) => {
    try {
      // Sanitize Input
      const sanitizedValues = {
        name: validator.escape(values.name.trim()),
        email: validator.escape(values.email.trim()),
      };

      dispatch(ShowLoading());
      const response = await updateUsers(sanitizedValues);

      dispatch(SetUser(response.user));
      message.success(response.message);
      setIsModalOpen(false);
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          error.response?.data.message ||
          error.message
      );
    } finally {
      dispatch(HideLoading());
    }
  };

  return (
    <div className='w-full mx-auto max-w-sm bg-white border border-gray-200 rounded-2xl shadow-xl mt-6 p-6 flex flex-col items-center'>
      <Image
        src={
          user?.avatar ||
          "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
        }
        width={80}
        height={80}
        className='w-24 h-24 mb-3 rounded-full shadow-md border border-gray-300'
        alt='Profile'
      />
      <h5 className='text-2xl mt-6 font-semibold text-gray-900'>
        {user?.name}
      </h5>
      <span className='text-sm text-gray-500'>{user?.email}</span>

      <div className='grid grid-cols-2 gap-6 text-center mt-4 w-full'>
        <div className='p-2 bg-gray-100 rounded-lg'>
          <div className='text-lg font-medium text-black'>
            {savedRecipes?.length}
          </div>
          <span className='text-rose-700 font-bold  hover:text-blue-500'>
            Recipes Created
          </span>
        </div>
        <Button className='mt-2' type='primary' onClick={showModal}>
          Edit Profile
        </Button>
      </div>

      {/* Modal for Profile Editing */}
      <Modal
        title='Edit Profile'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleUpdateProfile} layout='vertical'>
          <Form.Item
            label='Name'
            name='name'
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Email'
            name='email'
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input type='email' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProfileInformation;
