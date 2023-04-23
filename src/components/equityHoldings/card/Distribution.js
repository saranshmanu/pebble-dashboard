import { Typography } from "antd";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { PieChartOutlined } from "@ant-design/icons";
import { Pie, G2 } from "@ant-design/plots";
import Card from "../../Card";

const { Title } = Typography;

const DistributionCard = ({ darkMode }) => {
  const G = G2.getEngine("canvas");

  const data = [
    { type: "Zomato", value: 27 },
    { type: "Paytm", value: 25 },
    { type: "SBI Cards", value: 18 },
    { type: "HDFC Bank", value: 15 },
    { type: "Edelweiss", value: 10 },
    { type: "JM Financials", value: 5 },
  ];
  return (
    <Card icon={<PieChartOutlined />}>
      <Title className="title" level={5} style={{ margin: "0px 0px 20px 0px" }}>
        Distribution
      </Title>
      <Pie
        {...{
          data,
          appendPadding: 10,
          angleField: "value",
          colorField: "type",
          radius: 0,
          height: 300,
          color: [
            "#a8cbe0",
            "#8ebbd6",
            "#73abed",
            "#599bc4",
            "#418bb8",
            "#38779e",
            "#2e6383",
            "#254f69",
            "#1c3b4f",
            "#122734",
          ],
          innerRadius: 0.9,
          pieStyle: {
            strokeOpacity: 0,
          },
          legend: false,
          label: {
            type: "spider",
            autoRotate: true,
            formatter: (data) => {
              const group = new G.Group({});
              group.addShape({
                type: "text",
                attrs: { text: `${data.type}`, fill: darkMode ? "#fff" : "#000" },
              });
              return group;
            },
          },
          statistic: {
            content: false,
            title: false,
          },
          interactions: [],
        }}
      />
    </Card>
  );
};

export default connect(
  (state) => ({ darkMode: state.settings.darkMode }),
  (dispatch) => ({})
)(DistributionCard);
