/**
 * @flow
 */
import { API_BASE_URL } from "../constants/config";

function apiUrl(pathName: string): string {
  return `${API_BASE_URL}/${pathName}`;
}

export function post(
  pathName: string,
  data: Object = {},
  headers: Object = {}
): Promise<any> {
  return fetch(apiUrl(pathName), {
    method: "post",
    body: JSON.stringify(data),
    headers
  });
}

export function get(pathName: string, headers: Object = {}): Promise<any> {
  return fetch(apiUrl(pathName), {
    method: "get",
    headers
  });
}
