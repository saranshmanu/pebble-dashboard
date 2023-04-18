import { connect } from "react-redux";

const Card = ({ children, icon, darkMode }) => {
  const style = {
    ...(darkMode ? { color: "#fff" } : {}),
  };

  return (
    <div style={style} className="information-card">
      <div className="card-body flex-expand">
        <div className="icon">{icon}</div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    darkMode: state.settings.darkMode,
  }),
  () => ({})
)(Card);
