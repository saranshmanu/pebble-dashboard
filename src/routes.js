import Summary from "./pages/Summary";
import Setting from "./pages/Setting";
import Holding from "./pages/Holding";
import Default from "./templates/Default";

const routes = [
  {
    index: false,
    path: "/dashboard/summary",
    view: Summary,
    template: Default,
    exact: false,
  },
  {
    index: false,
    path: "/dashboard/holdings",
    view: Holding,
    template: Default,
    exact: false,
  },
  {
    index: false,
    path: "/dashboard/settings",
    view: Setting,
    template: Default,
    exact: false,
  },
];

export default routes;
