import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import { LineChartOutlined } from "@ant-design/icons";
import { Line } from "@ant-design/plots";

const { Title } = Typography;

const ProjectionCard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch("https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  return (
    <div className="information-card projection-card">
      <div className="card-body">
        <div style={{ margin: "0px 0px 10px 0px", fontSize: "30px" }}>
          <LineChartOutlined />
        </div>
        <div>
          <Title level={5} style={{ marginBottom: 20 }}>
            Projection Graph
          </Title>
          <Line
            {...{
              data,
              width: 100,
              padding: "auto",
              xField: "Date",
              yField: "scales",
              height: 150,
              legend: false,
              lineStyle: {
                stroke: "#000000",
              },
              xAxis: {
                tickCount: 5,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectionCard;
