import { rsaEncrypt } from "@/utils/rsa";
import { request } from "../request";
import {
  getPubKey,
  rejectAuth,
  resolveAuth,
  setLoginStatus,
  setPubKey,
} from "./token";

export const isLogin = async () => {
  const [err] = await request({
    url: "/api/ping",
  });
  if (err != null) {
    rejectAuth();
    return;
  }
  resolveAuth();
};

export const fetchPubKey = async () => {
  if (getPubKey()) {
    return;
  }
  const [error, value] = await request<string>({
    url: "/open/pem",
  });
  if (error || !value) {
    console.error(error);
  } else {
    setPubKey(value);
  }
};

export const login = async (body: {
  username: string;
  password: string;
}): Promise<[Error, null] | [null, string]> => {
  const pubKey = getPubKey();
  if (!pubKey) {
    return [Error("public key not found"), null];
  }
  const encrypt = await rsaEncrypt(pubKey, body?.password);
  const [error, value] = await request<string>({
    url: "/open/login",
    method: "POST",
    body: {
      username: body?.username,
      password: encrypt,
    },
  });
  if (error) {
    console.error(error);
  } else {
    setLoginStatus();
  }
  return [error, value] as [Error, null] | [null, string];
};

export const sign_up = async (body: {
  username: string;
  password: string;
}): Promise<[Error, null] | [null, string]> => {
  const pubKey = getPubKey();
  if (!pubKey) {
    return [Error("public key not found"), null];
  }
  const encrypt = await rsaEncrypt(pubKey, body?.password);
  const [error, value] = await request<string>({
    url: "/open/sign",
    method: "POST",
    body: {
      username: body?.username,
      password: encrypt,
    },
  });
  if (error) {
    console.error("sign:", error);
  } else {
    setLoginStatus();
  }
  return [error, value] as [Error, null] | [null, string];
};
