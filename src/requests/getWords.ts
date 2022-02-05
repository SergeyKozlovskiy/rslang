import { API } from "../types/enums";

export const getWords = async (group: number, page: number) => {
  return await fetch(`${API.URL}${API.Words}?group=${group}&page=${page}`).then((response) =>  response.json());
}