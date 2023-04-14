import { v4 } from "uuid";
import { useState } from "react";
import { message } from "antd";
import { getDatabase } from "../database";

const useInstitution = () => {
  const [institutions, setInstitutions] = useState([]);

  const [fetchingRecord, setFetchingRecordStatus] = useState(false);
  const [creatingRecord, setCreatingRecordStatus] = useState(false);
  const [removingRecord, setRemovingRecordStatus] = useState(false);
  const [updatingRecord, setUpdatingRecordStatus] = useState(false);

  const getInstitutions = async () => {
    try {
      setFetchingRecordStatus(true);
      const database = await getDatabase();
      if (!database.investments) {
        console.warn("Database instance cannot be found");
        return;
      }
      let response = await database.institution.find().exec();
      response = response.map((data) => {
        const record = data._data;
        return record;
      });

      setInstitutions(response);
    } catch (error) {
      //
    }

    setFetchingRecordStatus(false);
  };

  const createInstitution = async (payload) => {
    try {
      setCreatingRecordStatus(true);
      const database = await getDatabase();
      await database.institution.insert({ ...payload, uuid: v4() });
      getInstitutions();

      message.success("Created the organisation successfully");
    } catch (error) {
      message.error("Failed to create organisation");
    }

    setCreatingRecordStatus(false);
  };

  const removeInstitution = async ({ uuid }) => {
    try {
      setRemovingRecordStatus(true);
      const database = await getDatabase();
      let institution = await database.institution
        .findOne({
          selector: { uuid },
        })
        .exec();
      await institution.remove();
      getInstitutions();

      message.success("Removed the organisation!");
    } catch (error) {
      message.error("Failed to remove the organisation");
    }

    setRemovingRecordStatus(false);
  };

  const updateInstitution = async ({ uuid, label }) => {
    try {
      setUpdatingRecordStatus(true);
      const database = await getDatabase();
      let holding = await database.institution
        .findOne({
          selector: { uuid },
        })
        .exec();
      await holding.patch({ label });
      getInstitutions();

      message.success("Updated the organisation!");
    } catch (error) {
      message.error("Failed to update the organisation");
    }

    setUpdatingRecordStatus(false);
  };

  return [
    { creatingRecord, fetchingRecord, removingRecord, updatingRecord, institutions },
    { createInstitution, getInstitutions, removeInstitution, updateInstitution },
  ];
};

export default useInstitution;
