import React from "react";
import AppRoutes from "./routes/AppRoutes";
import ThemeProvider from "./theme/ThemeProvider";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";

const App = () => {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <ThemeProvider>
      {loading && <Spinner />}
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;
