import { rsaEncrypt } from "@/utils/rsa";
import { request } from "../request";
import {
  delToken,
  getPubKey,
  getToken,
  rejectAuth,
  resolveAuth,
  setLoginStatus,
  setPubKey,
} from "./token";

export const isLogin = async () => {
  if (!getToken()) {
    rejectAuth();
    return;
  }
  const [err] = await request({
    method: "post",
    url: "/api/ping",
  });
  if (err != null) {
    rejectAuth();
    delToken();
    return;
  }
  resolveAuth();
};

export const fetchPubKey = async () => {
  if (getPubKey()) {
    return;
  }
  const [error, value] = await request<{ publicKey: string }>({
    url: "/api/pub",
    method: "POST",
  });
  if (error || !value.publicKey) {
    console.error(error);
  } else {
    setPubKey(value.publicKey);
  }
};

export const login = async (body: {
  username: string;
  password: string;
}): Promise<[Error, null] | [null, { token: string }]> => {
  const pubKey = getPubKey();
  if (!pubKey) {
    return [Error("public key not found"), null];
  }
  const encrypt = await rsaEncrypt(pubKey, body?.password);
  const [error, value] = await request<{ token: string }>({
    url: "/api/login",
    method: "POST",
    body: {
      username: body?.username,
      password: encrypt,
    },
  });
  if (error) {
    console.error(error);
  } else {
    setLoginStatus(value.token);
  }
  return [error, value] as [Error, null] | [null, { token: string }];
};

export const sign_up = async (body: {
  username: string;
  password: string;
}): Promise<[Error, null] | [null, { token: string }]> => {
  const pubKey = getPubKey();
  if (!pubKey) {
    return [Error("public key not found"), null];
  }
  const encrypt = await rsaEncrypt(pubKey, body?.password);
  const [error, value] = await request<{ token: string }>({
    url: "/api/sign",
    method: "POST",
    body: {
      username: body?.username,
      password: encrypt,
    },
  });
  if (error) {
    console.error("sign:", error);
  } else {
    setLoginStatus(value.token);
  }
  return [error, value] as [Error, null] | [null, { token: string }];
};
