//get local storage and set local storage

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

/*export function setLocalStorage(key, value) {
  if (value === null) {
    localStorage.removeItem(key); // Remove the key if value is null
  } else {
    localStorage.setItem(key, JSON.stringify(value)); // Store the value as a JSON string
  }
}*/
