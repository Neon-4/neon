// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { axios } from "axios";

export const products = async () => {
  const response = await axios.get("https://ecom-back.thehive-services.com/api/store/products/");
  return response.data;
}
