import { connect } from "react-redux";
import { Treemap } from "@ant-design/plots";
import { AppstoreOutlined } from "@ant-design/icons";
import Card from "../../Card";

const DistributionCard = ({ data, darkMode }) => {
  return (
    <Card icon={<AppstoreOutlined />} title="Current value distribution">
      <Treemap
        {...{
          data: {
            name: "root",
            children: data,
          },
          legend: false,
          color: [
            "#bbbbed",
            "#a6a6be",
            "#9292af",
            "#7d7da0",
            "#696990",
            "#5a5a7b",
            "#4b4b66",
            "#3c3c52",
            "#2d2d3d",
            "#1ele29",
          ],
          height: 150,
          colorField: "name",
          rectStyle: {
            stroke: darkMode ? "#424242" : "#fff",
          },
        }}
      />
    </Card>
  );
};

export default connect(
  (state) => ({ darkMode: state.settings.darkMode }),
  (dispatch) => ({})
)(DistributionCard);
