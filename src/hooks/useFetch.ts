type response = {
  message: string;
  data: any;
};
async function useFetch(
  apiUrl: string,
  method: string,
  data?: Record<string, any>
) {
  const res = await fetch(apiUrl, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: ["POST", "PUT", "DELETE", "PATCH"].includes(method.toUpperCase())
      ? JSON.stringify(data)
      : undefined,
  });

  const result = (await res.json()) as response;
  if (!res.ok) {
    return {
      message: result.message || "Faild to connect to server",
      data: null,
    };
  }
  return result;
}

export default useFetch;
