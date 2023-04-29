import { Typography } from "antd";
import { connect } from "react-redux";
import { Area } from "@ant-design/plots";
import { AppstoreOutlined } from "@ant-design/icons";
import Card from "../../Card";

const { Title, Text } = Typography;

const TimelineCard = ({ darkMode, timeline }) => {
  return (
    <Card icon={<AppstoreOutlined />}>
      <div style={{ marginBottom: 40 }}>
        <Title className="title" level={5}>
          Timeline
        </Title>
        <Text type="secondary">Net amount invested based on the transaction history</Text>
      </div>
      <Area
        {...{
          data: timeline,
          height: 250,
          xField: "date",
          smooth: true,
          yField: "scales",
          line: { color: "#faad14" },
          yAxis: {
            min: 0,
            title: { text: "Invested Amount" },
            grid: {
              line: { style: { stroke: !darkMode ? "#eee" : "#333" } },
            },
            label: {
              style: { fill: !darkMode ? "#000" : "#fff" },
            },
          },
          xAxis: {
            grid: {
              line: { style: { stroke: !darkMode ? "#eee" : "#333" } },
            },
            line: null,
            range: [0, 1],
            tickCount: 10,
            label: {
              style: { fill: !darkMode ? "#000" : "#fff" },
            },
          },
          areaStyle: {
            stroke: "",
            fill: `l(270) 0:${darkMode ? "#000" : "#fff"} 0.7:#faad14 1:#faad14`,
          },
        }}
      />
    </Card>
  );
};

export default connect(
  (state) => ({ darkMode: state.settings.darkMode }),
  (dispatch) => ({})
)(TimelineCard);
