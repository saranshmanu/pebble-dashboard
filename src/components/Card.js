import { Card } from "antd";
import { connect } from "react-redux";

const CardComponent = ({ children, icon, darkMode, title }) => {
  const style = {
    ...(darkMode ? { color: "#fff", borderColor: "#424242" } : { borderColor: "#777" }),
  };

  return (
    <Card
      style={style}
      className="information-card"
      title={
        <div className="card-title">
          <div className="icon">{icon}</div>
          <span>{title}</span>
        </div>
      }
    >
      <div className="card-body flex-expand">
        <div>{children}</div>
      </div>
    </Card>
  );
};

export default connect(
  (state) => ({ darkMode: state.settings.darkMode }),
  () => ({})
)(CardComponent);
