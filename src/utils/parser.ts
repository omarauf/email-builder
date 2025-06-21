export function jsonToStringWithUndefined(obj: any) {
  return JSON.stringify(obj, (_, v) => (v === undefined ? '__undefined' : v), 2).replace(
    /"__undefined"/g,
    'undefined'
  );
}
