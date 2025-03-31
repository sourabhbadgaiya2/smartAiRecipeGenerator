import { App } from "antd";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../store/features/userSlice.js";
import { getCurrentUser } from "../api-services/user-service";
import { HideLoading, ShowLoading } from "../store/features/alertSlice";

const ProtectedRoute = ({ children }) => {
  const [showContent, setShowContent] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message } = App.useApp();

  const { user } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getCurrentUser();
      dispatch(SetUser(response.data));
    } catch (error) {
      message.error(
        error.response?.data.error ||
          error.response.data.message ||
          error.message
      );
      Cookies.remove("token");

    } finally {
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/");
    } else {
      getData();
      setShowContent(true);
    }
  }, [navigate]);

  return showContent && user && <div>{children}</div>;
};

export default ProtectedRoute;
