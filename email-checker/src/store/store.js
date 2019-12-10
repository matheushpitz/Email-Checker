export function Add(key, value) {
    localStorage.setItem(key, value);
}

export function Get(key) {
    return localStorage.getItem(key);
}