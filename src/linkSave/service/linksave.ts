import SubCustomapi from "../lib/api";
import { LinkCard } from "../types/card";

const api =  SubCustomapi;

export const fetchAllLinks = async (): Promise<LinkCard[]> => {
  const res = await api.get("/linksave");
  return res.data;
}

export const fetchLinks = async (link_id:string): Promise<LinkCard[]> => {
  const res = await api.get(`/linksave/${link_id}`);
  return res.data;
};

export const addLink = async (linkData: LinkCard): Promise<LinkCard> => {
  const res = await api.post("/linksave", linkData);
  return res.data;
};

export const updateLink = async (link_id: string, linkData: Omit<LinkCard, "id" | "date">): Promise<LinkCard> => {
  const res = await api.put(`/linksave/${link_id}`, linkData);
  return res.data;
};

export const deleteLink = async (link_id: string): Promise<void> => {
  await api.delete(`/linksave/${link_id}`);
  return;
};