import axios from "../../Utils/Axios";
import { setInfo, removeInfo } from "../Reducers/TvReducers";

const asyncSetTvInfo = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/tv/${id}`);
    const externalIds = await axios.get(`tv/${id}/external_ids`);
    const videos = await axios.get(`tv/${id}/videos`);
    const similar = await axios.get(`tv/${id}/similar`);
    const watchProviders = await axios.get(`tv/${id}/watch/providers`);
    const translations = await axios.get(`tv/${id}/translations`);
    const recommendations = await axios.get(`tv/${id}/recommendations`);

    const universalData = {
      detail: data,
      externalIds: externalIds.data,
      trailer: videos.data.results.find((v) => v.type == "Trailer"),
      similar: similar.data.results,
      recommendations: recommendations.data.results,
      watchProviders: watchProviders.data.results.IN,
      translations: translations.data.translations,
    };
    dispatch(setInfo(universalData));
  } catch (error) {
    console.error(error);
    window.location = "error/404";
  }
};

export { setInfo, removeInfo, asyncSetTvInfo };
