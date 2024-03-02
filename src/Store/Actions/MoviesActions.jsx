import axios from "../../Utils/Axios";
import { setInfo, removeInfo } from "../Reducers/MoviesReducer";

const asyncSetMovieInfo = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/movie/${id}`);
    const externalIds = await axios.get(`movie/${id}/external_ids`);
    const videos = await axios.get(`movie/${id}/videos`);
    const similar = await axios.get(`movie/${id}/similar`);
    const watchProviders = await axios.get(`movie/${id}/watch/providers`);
    const translations = await axios.get(`movie/${id}/translations`);
    const recommendations = await axios.get(`movie/${id}/recommendations`);

    const universalData = {
      detail: detail.data,
      externalIds: externalIds.data,
      trailer: videos.data.results.find((v) => v.type == "Trailer"),
      similar: similar.data.results,
      watchProviders: watchProviders.data.results.IN,
      translations: translations.data.translations,
      recommendations: recommendations.data.results,
    };
    dispatch(setInfo(universalData));
  } catch (error) {
    console.log("Error: ", error);
  }
};

export { setInfo, removeInfo, asyncSetMovieInfo };
