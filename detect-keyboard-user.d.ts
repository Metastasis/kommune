declare module 'detect-keyboard-user' {
  interface Settings {
    keyboardPriority: boolean
  }
  class DKU {
    public settings: object
    constructor (settings: Partial<Settings> = {}) {}
  }
  export = DKU;
}
