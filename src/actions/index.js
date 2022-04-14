import createActionTypes from "../utils/createActionTypes";
import apiRequest from "../utils/api";
import { GET_RECENT_IMAGE, SEARCH_IMAGE } from "../utils/constants";

export const appActions = createActionTypes("appActions", [
  "FETCH_DATA_SUCCESS",
  "FETCH_DATA_ERROR",
  "FETCH_DATA_REQUEST",
]);

const getImageConfig = (params) => {
  return {
    method: "GET",
    url: `?method=${GET_RECENT_IMAGE}&${params}`,
  };
};

const getImageSearchConfig = (params) => {
    return {
      method: "GET",
      url: `?method=${SEARCH_IMAGE}&${params}`,
    };
  };

export const fetchDataSuccess = (data) => {
  return {
    type: appActions.FETCH_DATA_SUCCESS,
    payload: {
      data,
    },
  };
};

export const fetchDataFailure = (error) => {
  return {
    type: appActions.FETCH_DATA_ERROR,
    payload: {
      error,
    },
  };
};

export const fetchDataRequest = () => {
  return {
    type: appActions.FETCH_DATA_REQUEST,
  };
};

export const fetchImageData = (params) => (dispatch, getState) => {
  const { appReducer: { data: { page = 1, imageData = [] } } } = getState();
  if (page === 1) {
    dispatch(fetchDataRequest());
  }
  return apiRequest
    .request(getImageConfig(params))
    .then(({ data }) => {
        const { photos: { photo = [], total } } = data;
        if (page === 1) {
            dispatch(fetchDataSuccess({
                imageData: photo.length > 0 ? [...photo] : [],
                page: page + 1,
                has_more: true
            }))
        } else {
            dispatch(fetchDataSuccess({
                imageData: photo.length > 0 ? [...imageData, ...photo] : [...imageData],
                page: page + 1,
                has_more: !!((photo.length + imageData.length) < total)
            }))
        }
    })
    .catch((e) => dispatch(fetchDataFailure(e.response.data)));
};

export const searchImageData = (params) => (dispatch) => {
    return apiRequest
      .request(getImageSearchConfig(params))
      .then(({ data }) => {
          dispatch(fetchDataSuccess({
            imageData: data.photos && data.photos.photo.length > 0 ? data.photos.photo : [],
            page: 1,
            has_more: false
          }))
        })
      .catch((e) => dispatch(fetchDataFailure(e.response.data)));
};