import { connect } from "react-redux";
import { ConfigProvider, theme } from "antd";
import { Routes, Route } from "react-router-dom";
import routes from "./routes";
import "./styles/App.scss";

const { darkAlgorithm } = theme;

function App({ darkMode }) {
  return (
    <ConfigProvider
      theme={{
        ...(darkMode ? { algorithm: darkAlgorithm } : {}),
        token: {
          // colorPrimary: "#00b96b",
        },
      }}
    >
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            index={route.index}
            path={route.path}
            element={
              <route.template>
                <route.view />
              </route.template>
            }
          ></Route>
        ))}
      </Routes>
    </ConfigProvider>
  );
}

export default connect(
  (state) => ({
    darkMode: state.settings.darkMode,
  }),
  (dispatch) => ({})
)(App);
