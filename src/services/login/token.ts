import { defer } from "@passion_pi/fp";

const publicKey = "publicKey";

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

export const getPubKey = () => localStorage.getItem(publicKey);

export const setPubKey = (val: string) => localStorage.setItem(publicKey, val);

export const getUsername = () => {
  return "";
  // return (
  //   JSON.parse(atob(getToken().split(".")?.[1] || "") || "{}").username || ""
  // );
};

export const setLogoutStatus = () => {
  rejectAuth();
  resetLoginStatus();
  rejectAuth();
};

export const setLoginStatus = () => {
  resolveAuth();
  resetLoginStatus();
  resolveAuth();
};
