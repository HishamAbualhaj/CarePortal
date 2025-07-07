interface Response {
  status: boolean;
  msg: string;
}
async function useFetch(
  apiUrl: string,
  method: string,
  data?: Record<string, any>
): Promise<Response> {
  const res = await fetch(apiUrl, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: ["POST", "PUT", "DELETE", "PATCH"].includes(method.toUpperCase())
      ? JSON.stringify(data)
      : undefined,
  });

  const result = await res.json();
  if (!res.ok) {
    return {
      msg: result.message || "Faild to connect to server",
      status: false,
    };
  }
  return result;
}

export default useFetch;
