import { Typography } from "antd";
import { LineChartOutlined } from "@ant-design/icons";
import { Line } from "@ant-design/plots";

const { Title } = Typography;

const ProjectionCard = ({ data = [] }) => {
  return (
    <div className="information-card projection-card">
      <div className="card-body">
        <div className="icon">
          <LineChartOutlined />
        </div>
        <div>
          <Title level={5} style={{ marginBottom: 20 }}>
            Projection Graph
          </Title>
          <Line
            {...{
              data,
              padding: "auto",
              xField: "Period",
              yField: "Amount",
              height: 150,
              animation: { appear: { animation: "path-in", duration: 1000 } },
              lineStyle: {
                // stroke: "#000000",
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
        </div>
      </div>
    </div>
  );
};

export default ProjectionCard;
