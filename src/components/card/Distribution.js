import { Typography } from "antd";
import { Treemap } from "@ant-design/plots";
import { AppstoreOutlined } from "@ant-design/icons";
import Card from "../Card";

const { Title } = Typography;

const DistributionCard = ({ data }) => {
  return (
    <Card icon={<AppstoreOutlined />} className="turquoise-gradient">
      <Title level={5} style={{ margin: "0px 0px 10px 0px" }}>
        {"Current value distribution"}
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
        }}
      />
    </Card>
  );
};

export default DistributionCard;
