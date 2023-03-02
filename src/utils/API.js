import axios from 'axios';

const apiUrl = "https://randomuser.me/api";

export const getRandomUsers = (profilesToFetch = 20) => {
  const response = axios.get(`${apiUrl}/?results=${profilesToFetch}`);

  return response;
}