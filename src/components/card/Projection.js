import { Typography } from "antd";
import { LineChartOutlined } from "@ant-design/icons";
import { Line } from "@ant-design/plots";
import Card from "../Card";

const { Title } = Typography;

const ProjectionCard = ({ data = [] }) => {
  return (
    <Card icon={<LineChartOutlined />}>
      <Title level={5} style={{ margin: "0px 0px 10px 0px" }}>
        Projection Graph
      </Title>
      <Line
        {...{
          data,
          padding: "auto",
          xField: "Period",
          yField: "Amount",
          height: 200,
          animation: { appear: { animation: "path-in", duration: 1000 } },
          lineStyle: {
            stroke: "#e71d36",
          },
          xAxis: {
            tickCount: 5,
          },
          yAxis: {
            tickCount: 4,
            title: { text: "Projected value" },
            label: false,
          },
        }}
      />
    </Card>
  );
};

export default ProjectionCard;
