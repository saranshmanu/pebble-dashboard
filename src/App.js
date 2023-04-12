import routes from "./routes";
import { Routes, Route } from "react-router-dom";
import "./styles/App.scss";

function App() {
  return (
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
  );
}

export default App;
