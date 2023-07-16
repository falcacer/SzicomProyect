import { redirect } from "react-router-dom";

export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth");
  }

  return null;
}

export function getUserFromToken(token : any) {
  const [headerBase64, payloadBase64, signatureBase64] = token.split(".");
  const payloadJSON = JSON.parse(atob(payloadBase64));
  const user = payloadJSON.username || null;
  return user;
}

