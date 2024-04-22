async function fetchToken({ username, password, authProvider }) {
  if (!(username && password && authProvider)) {
    return [];
  }

  const data = new URLSearchParams();
  data.append("username", username);
  data.append("password", password);
  const res = await fetch(authProvider, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  });

  if (!res.ok) {
    throw new Error(`Token fetch for ${username} failed.`);
  }
  return res.json();
}

export default fetchToken;
