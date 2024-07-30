import axios from "../instance";

import { EditLendsSchemaType, lendsSchemaType } from "@/utils/schema";

export const add = (data: lendsSchemaType) => axios.post("/lends", data);
export const edit = (data: EditLendsSchemaType, id: number) => axios.put(`/lends/${id}`, data);

export const getAll = () => axios.get("/lends/all");