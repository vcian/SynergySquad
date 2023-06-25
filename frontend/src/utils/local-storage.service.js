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

export const setLocalStorageKey = (key, value) => {
  if (typeof window !== "undefined") {
    let localStorage = window.localStorage;
    if (localStorage === undefined || localStorage === null) {
      throw new Error("LOCAL STORAGE NOT FOUND");
    }
    return localStorage.setItem(key, value);
  }
};

export const deleteLocalStorageKey = (key) => {
  if (typeof window !== "undefined") {
    let localStorage = window.localStorage;
    if (localStorage === undefined || localStorage === null) {
      throw new Error("LOCAL STORAGE NOT FOUND");
    }
    return localStorage.removeItem(key);
  }
};
