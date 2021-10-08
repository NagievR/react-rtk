import defineHTTPError from "./defineHTTPError";

const fetchData = async (url, method = "get", dataToSend) => {
  try {
    console.log(1);
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: dataToSend && JSON.stringify(dataToSend),
    });
    console.log(2, response);

    if (!response.ok) {
      throw defineHTTPError(response);
    }
    console.log(3);

    return await response.json(response);
  } catch (error) {
    throw error;
  }
};

export default fetchData;
