import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Typography, Divider, Dropdown, Button, Modal, Result } from "antd";
import { EditOutlined, DeleteOutlined, MoreOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { getInstitutions, removeInstitution, updateInstitution } from "../../database/actions/institution";
import InstitutionForm from "./InstitutionForm";

const { Title } = Typography;
const { confirm } = Modal;

const Institution = ({ institutions, updatingRecord }) => {
  const [isModalOpen, setModalOpen] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getInstitutions();
  }, []);

  return (
    <div>
      <InstitutionForm
        inUpdateMode={true}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        selected={selected}
        updatingRecord={updatingRecord}
        updateInstitution={updateInstitution}
      />
      {institutions.length ? (
        institutions.map((institution, index) => (
          <div key={index}>
            <div className="toggle-item flex-expand">
              <div className="toggle-option">
                <Title className="toggle-item-label" level={5}>
                  {institution.label}
                </Title>
              </div>
              <div className="toggle-dropdown">
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "1",
                        label: "Edit",
                        icon: <EditOutlined />,
                        onClick: () => {
                          setSelected(institution?.uuid);
                          setModalOpen(true);
                        },
                      },
                      {
                        key: "2",
                        label: "Delete",
                        icon: <DeleteOutlined />,
                        onClick: () => {
                          confirm({
                            title:
                              "All the associated investment holdings will be removed. Are you sure you want to delete the organisation?",
                            icon: <ExclamationCircleFilled />,
                            okText: "Yes",
                            okType: "danger",
                            cancelText: "No",
                            onOk: () => {
                              removeInstitution({ uuid: institution?.uuid });
                            },
                            onCancel: () => {},
                          });
                        },
                      },
                    ],
                    onClick: () => {},
                  }}
                >
                  <Button icon={<MoreOutlined />} type="link" block>
                    Actions
                  </Button>
                </Dropdown>
              </div>
            </div>
            <Divider className="divider-margin" />
          </div>
        ))
      ) : (
        <Result
          status="warning"
          title="No organisation found!"
          extra={<Title level={2}>Add a new institution from the general settings section to continue.</Title>}
        />
      )}
    </div>
  );
};

export default connect(
  (state) => ({
    institutions: state.institutions.institutions,
    updatingRecord: state.institutions.updatingInstitutions,
  }),
  () => ({})
)(Institution);
