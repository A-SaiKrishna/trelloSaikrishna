import axios from "axios";
import { APIKEY, APITOKEN } from "./ApiInfo";
const axiosInstance = axios.create({ baseURL: "https://api.trello.com/1" });
export async function fetchData(element1, element2, id) {
  try {
    let response = await axiosInstance.get(
      `/${element1}/${id}/${element2}?key=${APIKEY}&token=${APITOKEN}`
    );
    let data = await response.data;
    return data;
  } catch (error) {
    return error;
  }
}

export async function postData(postElement, name) {
  try {
    let response = await axiosInstance.post(`/${postElement}`, {
      name: name,
      key: APIKEY,
      token: APITOKEN,
    });
    let data = await response.data;
    return data;
  } catch (error) {
    return error;
  }
}
export async function archieveData(element1, element2, id, dataPost = {}) {
  try {
    let response = await axiosInstance.post(`/${element1}/${id}/${element2}`, {
      ...dataPost,
      key: APIKEY,
      token: APITOKEN,
    });
    let data = response.data;
    return data;
  } catch (error) {
    return error;
  }
}

export async function deleteData(element1, id) {
  try {
    let response = await axiosInstance.delete(
      `/${element1}/${id}?key=${APIKEY}&token=${APITOKEN}`
    );
    let data = await response.data;
    return data;
  } catch (error) {
    return error;
  }
}

export async function postDataWithId(element1, dataParams) {
  try {
    let response = await axiosInstance.post(`/${element1}`, {
      ...dataParams,
      key: APIKEY,
      token: APITOKEN,
    });
    let data = await response.data;
    return data;
  } catch (error) {
    return error;
  }
}
export async function deleteDataItem(element1, element2, listId, id) {
  try {
    let response = await axiosInstance.delete(
      `/${element1}/${listId}/${element2}/${id}?key=${APIKEY}&token=${APITOKEN}`
    );
    let data = await response.data;
    return data;
  } catch (error) {
    return error;
  }
}
export async function putItems(cardId, id, stateOfItem) {
  try {
    let response = await axiosInstance.put(
      `/cards/${cardId}/checkItem/${id}?key=${APIKEY}&state=${stateOfItem}&token=${APITOKEN}`
    );
    let data = await response.data;
    return data;
  } catch (error) {
    return error;
  }
}
export async function getBoard(id) {
  try {
    let response = await axiosInstance.get(
      `boards/${id}?key=${APIKEY}&token=${APITOKEN}`
    );
    let data = await response.data;
    return data;
  } catch (error) {
    return error;
  }
}
