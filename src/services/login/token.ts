import { defer } from "@passion_pi/fp";

const publicKey = "publicKey";
const token = "token";

const resetLoginStatus = () => {
  ({
    pending: loginAuthPending,
    resolve: resolveAuth,
    reject: rejectAuth,
  } = defer());
};

export let {
  pending: loginAuthPending,
  resolve: resolveAuth,
  reject: rejectAuth,
} = defer();

export const delToken = () => localStorage.removeItem(token);

export const getToken = () => localStorage.getItem(token) || "";

export const setToken = (val: string) => localStorage.setItem(token, val || "");

export const getPubKey = () => localStorage.getItem(publicKey);

export const setPubKey = (val: string) => localStorage.setItem(publicKey, val);

export const getUsername = () => {
  return (
    JSON.parse(atob(getToken().split(".")?.[1] || "") || "{}").username || ""
  );
};

export const setLogoutStatus = () => {
  rejectAuth();
  delToken();
  resetLoginStatus();
  rejectAuth();
};

export const setLoginStatus = (val: string) => {
  resolveAuth();
  setToken(val);
  resetLoginStatus();
  resolveAuth();
};
