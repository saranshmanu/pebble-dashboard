import { useEffect, useState } from "react";
import { Typography, Divider, Dropdown, Button, Modal, Result } from "antd";
import { EditOutlined, DeleteOutlined, MoreOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import InstitutionForm from "./InstitutionForm";
import useInstitution from "../../hooks/institution";

const { Title } = Typography;
const { confirm } = Modal;

const Institution = () => {
  const [{ institutions, updatingRecord }, { getInstitutions, removeInstitution, updateInstitution }] =
    useInstitution();
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
            <div className="toggle-item">
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
                            title: "Are you sure you want to delete the organisation?",
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
                  <Button icon={<MoreOutlined />}></Button>
                </Dropdown>
              </div>
            </div>
            <Divider className="no-margin" />
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

export default Institution;
