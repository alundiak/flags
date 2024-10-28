export interface CodeObject {
  flag: string; // emoji
  code: string; // country code (2 chars in most cases)
  name: string; // country name (single string or space split string)
  unMember: boolean; // UN member or not
  // independent: boolean; // maybe
  // and many other fields
}

export interface RegionObject {
  [countryCode: string]: CodeObject;
}

export interface MinimalFlagsData {
  [region: string]: RegionObject;
}
