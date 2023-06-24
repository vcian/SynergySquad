"use client";
export const getLocalStorageKey = (key) => {
  if (typeof window !== "undefined") {
    let localStorage = window.localStorage;
    if (localStorage === undefined || localStorage === null) {
      throw new Error("LOCAL STORAGE NOT FOUND");
    }
    return localStorage.getItem(key);
  }
  return null;
};
