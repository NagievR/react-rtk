import defineHTTPError from "./defineHTTPError";

const fetchData = async (url, method = "GET", dataToSend) => {
  console.log("UPD")
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: dataToSend && JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      throw defineHTTPError(response);
    }

    return await response.json(response);
  } catch (error) {
    console.warn(error)
    throw error;
  }
};

export default fetchData;
