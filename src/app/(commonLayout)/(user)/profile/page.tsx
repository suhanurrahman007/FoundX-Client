import Post from "@/src/components/Ui/Post";
import { getMyPosts } from "@/src/services/post";
import { TPost } from "@/src/types";


export default async function Profile() {
  const { data } = await getMyPosts();

  return (
    <>
      {data?.length ? (
        data?.map((post: TPost) => <Post key={post._id} post={post} />)
      ) : (
        <div className="flex min-h-screen w-full items-center justify-center rounded-md bg-default-100">
          <h1 className="text-4xl">No Post Found!</h1>
        </div>
      )}
    </>
  );
}
