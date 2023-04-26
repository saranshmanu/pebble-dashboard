import { v4 } from "uuid";
import store from "../../store";
import { getDatabase } from "..";
import { createNotification } from "../../utils/commonFunctions";

const { dispatch } = store;

const getInstitutions = async () => {
  try {
    dispatch({ type: "institutions/setStatus", payload: { fetchingInstitutions: true } });
    const database = await getDatabase();
    let response = await database.institution.find().exec();
    response = response.map((data) => {
      const record = data._data;
      return record;
    });

    dispatch({ type: "institutions/setInstitutions", payload: response });
  } catch (error) {
    //
  }

  dispatch({ type: "institutions/setStatus", payload: { fetchingInstitutions: false } });
};

const createInstitution = async (payload) => {
  try {
    dispatch({ type: "institutions/setStatus", payload: { creatingInstitutions: true } });
    const database = await getDatabase();

    payload = { ...payload, uuid: v4() };
    await database.institution.insert(payload);

    dispatch({ type: "institutions/createInstitution", payload: payload });
    createNotification("Created the organisation successfully", "success");
  } catch (error) {
    createNotification("Failed to create organisation", "error");
  }

  dispatch({ type: "institutions/setStatus", payload: { creatingInstitutions: false } });
};

const removeInstitution = async ({ uuid }) => {
  try {
    dispatch({ type: "institutions/setStatus", payload: { removingInstitutions: true } });
    const database = await getDatabase();

    // Removes the institution
    let institution = await database.institution
      .findOne({
        selector: { uuid },
      })
      .exec();
    await institution.remove();

    // Removes all the associated fixed income holdings along with the institution
    let holdings = await database.investments
      .find({
        selector: { institution: uuid },
      })
      .exec();
    holdings = holdings.map((holding) => {
      return holding._data.uuid;
    });
    await database.investments.bulkRemove(holdings);

    // Remove all the assiciated equity holdings along with the institution
    holdings = await database.equityInvestments
      .find({
        selector: { institution: uuid },
      })
      .exec();
    holdings = holdings.map((holding) => {
      return holding._data.uuid;
    });
    await database.equityInvestments.bulkRemove(holdings);

    dispatch({ type: "institutions/removeInstitution", payload: { uuid } });
    createNotification("Removed the organisation!", "success");
  } catch (error) {
    createNotification("Failed to remove the organisation", "error");
  }

  dispatch({ type: "institutions/setStatus", payload: { removingInstitutions: false } });
};

const updateInstitution = async ({ uuid, ...payload }) => {
  try {
    dispatch({ type: "institutions/setStatus", payload: { updatingInstitutions: true } });
    const database = await getDatabase();
    let holding = await database.institution
      .findOne({
        selector: { uuid },
      })
      .exec();
    await holding.patch({ ...payload });

    dispatch({ type: "institutions/updateInstitution", payload: { uuid, ...payload } });
    createNotification("Updated the organisation!", "success");
  } catch (error) {
    createNotification("Failed to update the organisation", "error");
  }

  dispatch({ type: "institutions/setStatus", payload: { updatingInstitutions: false } });
};

export { createInstitution, getInstitutions, removeInstitution, updateInstitution };
