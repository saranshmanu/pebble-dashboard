import "./styles/App.css";
import routes from "./routes";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
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
