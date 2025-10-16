import axios from "axios";

const API_URL = "http://localhost:4000/load-data";

export async function fetchData() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    throw error; // pass it up to service layer
  }
}
