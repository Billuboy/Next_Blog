export function toJson(body) {
  return JSON.parse(JSON.stringify(body));
}

export function jsonStringify(body) {
  return JSON.stringify(body);
}

export function jsonParse(string) {
  return JSON.parse(string);
}
