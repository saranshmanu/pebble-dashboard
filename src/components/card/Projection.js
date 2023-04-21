import { Typography } from "antd";
import { connect } from "react-redux";
import { LineChartOutlined } from "@ant-design/icons";
import { Line, Column } from "@ant-design/plots";
import Card from "../Card";

const { Title, Text } = Typography;

const ProjectionCard = ({ data = [], segregated = false, lineGraphCap = 0, barGraphCap = 0, darkMode }) => {
  return (
    <Card icon={<LineChartOutlined />}>
      <div style={{ marginBottom: 20 }}>
        <Title className="title" level={5}>Projection Graph</Title>
      </div>

      {segregated ? (
        <Column
          {...{
            data: data
              .filter((value) => value?.type === "Interest" || value?.type === "Invested")
              .slice(0, barGraphCap * 2),
            isStack: true,
            xField: "year",
            yField: "value",
            height: 150,
            color: ["#98daef", "#7899a4"],
            seriesField: "type",
            xAxis: { tickCount: 5 },
            yAxis: {
              title: { text: "Projected value" },
              grid: { line: { style: { stroke: darkMode ? "#424242" : "#d9d9d9" } } },
              label: false,
            },
            columnstyle: { radius: [20, 20, 0, 0] },
            legend: false,
          }}
        />
      ) : (
        <Line
          {...{
            data: data.filter((value) => value?.type === "Combined").slice(0, lineGraphCap),
            padding: "auto",
            xField: "year",
            yField: "value",
            height: 150,
            animation: { appear: { animation: "path-in", duration: 1000 } },
            lineStyle: { stroke: "#e71d36" },
            xAxis: {
              tickCount: 5,
              grid: { line: { style: { stroke: darkMode ? "#424242" : "#d9d9d9" } } },
            },
            yAxis: {
              tickCount: 4,
              title: { text: "Projected value" },
              label: false,
              grid: { line: { style: { stroke: darkMode ? "#424242" : "#d9d9d9" } } },
            },
          }}
        />
      )}

      <div style={{ marginTop: 20 }}>
        <Text type="secondary">
          (Projections based on next {!segregated ? lineGraphCap : barGraphCap} years of continuous investment)
        </Text>
      </div>
    </Card>
  );
};

export default connect(
  (state) => ({ darkMode: state.settings.darkMode }),
  (dispatch) => ({})
)(ProjectionCard);
