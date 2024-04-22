export function randomString() {
  return (Math.random() + 1).toString(36).substring(7);
}

export function heartbeat() {
  return JSON.stringify({ ty: "HEARTBEAT" });
}