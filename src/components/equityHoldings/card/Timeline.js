import dayjs from "dayjs";
import { Typography } from "antd";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { Area } from "@ant-design/plots";
import { AppstoreOutlined } from "@ant-design/icons";
import Card from "../../Card";

const { Title } = Typography;

const TimelineCard = ({ darkMode }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    const values = [];
    const total = 365;

    for (let i = 0; i <= total; i += 1) {
      const date = dayjs().subtract(i, "day");
      values.push({
        Date: date.format("DD/MM/YYYY").toString(),
        scales: 0,
      });
    }

    setData(values.reverse());
  };

  return (
    <Card icon={<AppstoreOutlined />}>
      <Title className="title" level={5} style={{ margin: "0px 0px 10px 0px" }}>
        Timeline
      </Title>
      <Area
        {...{
          data,
          height: 250,
          xField: "Date",
          smooth: true,
          yField: "scales",
          line: { color: "#faad14" },
          yAxis: {
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
