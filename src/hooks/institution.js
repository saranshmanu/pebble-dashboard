import { v4 } from "uuid";
import { useState } from "react";
import { getDatabase } from "../database";
import { createNotification } from "../utils/commonFunctions";

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

      createNotification("Created the organisation successfully", "success");
    } catch (error) {
      createNotification("Failed to create organisation", "error");
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

      createNotification("Removed the organisation!", "success");
    } catch (error) {
      createNotification("Failed to remove the organisation", "error");
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

      createNotification("Updated the organisation!", "success");
    } catch (error) {
      createNotification("Failed to update the organisation", "error");
    }

    setUpdatingRecordStatus(false);
  };

  return [
    { creatingRecord, fetchingRecord, removingRecord, updatingRecord, institutions },
    { createInstitution, getInstitutions, removeInstitution, updateInstitution },
  ];
};

export default useInstitution;
