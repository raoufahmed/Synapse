// localStorage that never throws (private mode, blocked storage, etc.)
export const sg = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
export const ss = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
