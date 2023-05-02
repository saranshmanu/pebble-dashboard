/* eslint-disable react-hooks/exhaustive-deps */
import { v4 } from "uuid";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Tabs, Button, Row, Col, Tag, Result } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { investmentClasses } from "../utils/constants";
import FixedIncomeHolding from "../components/fixedIncomeHoldings";
import EquityHolding from "../components/equityHoldings";
import EmployeeProvidentFundHolding from "../components/employeeProvidentFundHoldings";
import "../styles/Holdings.scss";

const Window = ({ onClassSelection }) => {
  const options = investmentClasses;
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
                  {option?.icon}
                  <div className="placeholder">{option?.title}</div>
                  {!option?.live ? (
                    <Tag bordered={false} color="gold">
                      Coming Soon
                    </Tag>
                  ) : (
                    <Tag bordered={false} color="cyan">
                      Now Live
                    </Tag>
                  )}
                </div>
              </Button>
            </Col>
          ))}
        </Row>
      )}
      {selectedWindow === 1 && <FixedIncomeHolding />}
      {selectedWindow === 2 && <EquityHolding />}
      {selectedWindow === 3 && <EmployeeProvidentFundHolding />}
    </div>
  );
};

const Windows = ({ sections, active, setSections, setActive, onInitialSelection, initialSections }) => {
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
        <Tabs.TabPane
          key={section?.key}
          tab={section?.label}
          closable={section?.closable}
          closeIcon={<CloseCircleOutlined />}
        >
          <Window onClassSelection={onOptionSelection} />
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
};

function Holding() {
  const [active, setActive] = useState();
  const [sections, setSections] = useState([]);

  const initialSections = [{ label: "Investment Classes", closable: true, key: v4() }];
  const onInitialSelection = () => {
    setSections(initialSections);
    setActive(initialSections[0].key);
  };

  useEffect(() => {
    onInitialSelection();
  }, []);

  return (
    <div>
      <Windows
        active={active}
        sections={sections}
        setActive={setActive}
        setSections={setSections}
        initialSections={initialSections}
        onInitialSelection={onInitialSelection}
      />
      {sections.length === 0 ? (
        <Result
          status="warning"
          title="No investment class selected"
          extra={
            <Button type="primary" key="console" onClick={onInitialSelection}>
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
