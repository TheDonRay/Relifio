// Backend base URL, set via REACT_APP_BACKEND_HOSTED_URL in .env (or the hosting provider's env settings).
// CRA only exposes env vars prefixed with REACT_APP_. Trailing slashes are stripped so `${BACKEND_URL}/api/...` stays clean.
export const BACKEND_URL = (process.env.REACT_APP_BACKEND_HOSTED_URL || "http://localhost:2400").replace(/\/+$/, "");
