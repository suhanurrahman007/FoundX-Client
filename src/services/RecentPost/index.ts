"use server"

import { envConfig } from "@/src/config/envConfig";

export const getRecentPosts = async () => {
  const fetchOption = {
    next: {
      tags: ["posts"]
    }
  }
  const res = await fetch(
    `${envConfig.baseApi}/items?sortBy=-createdAt&limit=10`, fetchOption
  );
  return res.json();
};
