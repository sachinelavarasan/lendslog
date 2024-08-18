import axios from "../instance";

import { EditLendsSchemaType, lendsSchemaType } from "@/utils/schema";

export const add = (data: lendsSchemaType) => axios.post("/lends", data);
export const edit = (data: EditLendsSchemaType, id: number) => axios.put(`/lends/${id}`, data);
export const deleteLend = (id: number) => axios.delete(`/lends/${id}`);

// Installment Timeline
export const payInstallment = (it_id:number, ld_id: number) => axios.put(`/lends/${ld_id}/installment/${it_id}`);

export const getAll = () => axios.get("/lends/all");
export const getTodayLends = () => axios.get("/lends/today-installments");

// notification
export const getAllNotification = () => axios.get("/notifications/all");