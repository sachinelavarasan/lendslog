import axios from "../instance";

import { lendsSchemaType } from "@/utils/schema";

export const add = (data: lendsSchemaType) => axios.post("/lends", data);

export const getAll = () => axios.get("/lends/all");