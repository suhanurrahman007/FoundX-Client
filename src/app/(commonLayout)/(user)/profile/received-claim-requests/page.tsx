"use client";

import Claim from "@/src/components/Ui/Post/Claim";
import ClaimPostCard from "@/src/components/Ui/Post/ClaimPostCard";
import { useGetReceivedClaimRequest } from "@/src/hooks/cliemRequest";
import { TClaimRequest } from "@/src/types";
import { map } from "zod";

const ReceivedClaimRequestsPage = () => {
  const { data } = useGetReceivedClaimRequest();
  // Safely access the posts data, defaulting to an empty array if not available
  const posts = data?.data || [];
  return (
    <>
      {posts?.length ? (
        posts?.map((post: TClaimRequest, index: number) => (
          <ClaimPostCard key={index} post={post} />
        ))
      ) : (
        <div className="flex min-h-screen w-full items-center justify-center rounded-md bg-default-100">
          <h1 className="text-4xl">No Claim Request Received!</h1>
        </div>
      )}
    </>
  );
};

export default ReceivedClaimRequestsPage;
