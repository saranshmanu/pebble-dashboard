/* eslint-disable react-hooks/exhaustive-deps */
import { v4 } from "uuid";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Tabs, Button, Row, Col, Tag, Result } from "antd";
import { GoldOutlined, CloseCircleOutlined } from "@ant-design/icons";
import FixedIncomeHolding from "../components/fixedIncomeHoldings";
import "../styles/Holdings.scss";

const { TabPane } = Tabs;

const Window = ({ onClassSelection }) => {
  const options = [
    { key: 1, title: "Fixed Income Securities", live: true },
    { key: 2, title: "Employees Provident Fund (EPF)", live: false },
    { key: 3, title: "National Pension Scheme (NPS)", live: false },
    { key: 3, title: "Public Provident Fund (PPF)", live: false },
    { key: 4, title: "Mutual Funds", live: false },
    { key: 5, title: "Equity Holdings", live: false },
    { key: 6, title: "G-Sec Bonds", live: false },
  ];
  const [selectedWindow, setSelectedWindow] = useState(0);

  const onOptionSelection = (option) => {
    setSelectedWindow(option?.key);
    onClassSelection(option?.title);
  };

  return (
    <div className="selection-container">
      {!selectedWindow && (
        <Row gutter={[20, 20]}>
          {options?.map((option, index) => (
            <Col key={index} xs={24} sm={12} lg={8} xl={6}>
              <Button disabled={!option?.live} className="section" block onClick={() => onOptionSelection(option)}>
                <div className="label-container" direction="vertical" size={5}>
                  <GoldOutlined className="illustration" />
                  <div className="placeholder">{option?.title}</div>
                  {!option?.live ? (
                    <Tag bordered={false} color="gold">
                      Coming Soon
                    </Tag>
                  ) : null}
                </div>
              </Button>
            </Col>
          ))}
        </Row>
      )}
      {selectedWindow === 1 && <FixedIncomeHolding />}
    </div>
  );
};

const Windows = ({ sections, active, setSections, setActive }) => {
  const onOptionSelection = (label) => {
    const updated = sections.map((section) => {
      if (section?.key === active) {
        section.label = label;
        return section;
      }
      return section;
    });
    setSections(updated);
  };

  const initialSections = [
    {
      label: "Investment Classes",
      closable: true,
      key: v4(),
    },
  ];

  const onInitialSelection = () => {
    setSections(initialSections);
    setActive(initialSections[0].key);
  };

  useEffect(() => {
    onInitialSelection();
  }, []);

  const remove = (targetKey) => {
    let key = active;
    let lastIndex = -1;
    sections.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });

    // Filters the section array and removes the targetKey
    const updatedSections = sections.filter((item) => item.key !== targetKey);
    if (updatedSections.length && key === targetKey) {
      key = lastIndex >= 0 ? updatedSections[lastIndex].key : updatedSections[0].key;
    }
    setSections(updatedSections);
    setActive(key);
  };

  const onEdit = (targetKey, action) => {
    if (action === "add") {
      const key = v4();
      setSections([...sections, { ...initialSections[0], key }]);
      setActive(key);
    } else {
      remove(targetKey);
    }
  };

  return (
    <Tabs type="editable-card" onChange={(key) => setActive(key)} activeKey={active} onEdit={onEdit}>
      {sections.map((section, index) => (
        <TabPane
          key={section?.key}
          tab={section?.label}
          closable={section?.closable}
          closeIcon={<CloseCircleOutlined />}
        >
          <Window onClassSelection={onOptionSelection} />
        </TabPane>
      ))}
    </Tabs>
  );
};

function Holding() {
  const [active, setActive] = useState();
  const [sections, setSections] = useState([]);

  return (
    <div>
      <Windows active={active} sections={sections} setActive={setActive} setSections={setSections} />
      {sections.length === 0 ? (
        <Result
          status="warning"
          title="No investment class selected"
          extra={
            <Button type="primary" key="console" onClick={() => {}}>
              Select a new class
            </Button>
          }
        />
      ) : null}
    </div>
  );
}

export default connect(
  (state) => ({}),
  (dispatch) => ({})
)(Holding);
