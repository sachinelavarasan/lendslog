import axios from "../instance";

import { lendsSchemaType } from "@/utils/schema";

export const add = (data: lendsSchemaType) => axios.post("/lends", data);