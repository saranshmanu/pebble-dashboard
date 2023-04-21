import { Typography } from "antd";
import { connect } from "react-redux";
import { Treemap } from "@ant-design/plots";
import { AppstoreOutlined } from "@ant-design/icons";
import Card from "../Card";

const { Title } = Typography;

const DistributionCard = ({ data, darkMode }) => {
  return (
    <Card icon={<AppstoreOutlined />}>
      <Title level={5} style={{ margin: "0px 0px 10px 0px" }}>
        Current value distribution
      </Title>
      <Treemap
        {...{
          data: {
            name: "root",
            children: data,
          },
          legend: false,
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
