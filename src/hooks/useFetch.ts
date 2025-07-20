interface Response {
  status: boolean;
  msg: string | Record<string, any>;
}
async function useFetch(
  apiUrl: string,
  method: string,
  data?: Record<string, any>,
  token?: string
): Promise<Response> {
  const res = await fetch(apiUrl, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: ["POST", "PUT", "DELETE", "PATCH"].includes(method.toUpperCase())
      ? JSON.stringify(data)
      : undefined,
  });

  const result = await res.json();
  if (!res.ok) {
    return {
      msg: result.msg || "Faild to connect to server",
      status: false,
    };
  }
  return result;
}

export default useFetch;
