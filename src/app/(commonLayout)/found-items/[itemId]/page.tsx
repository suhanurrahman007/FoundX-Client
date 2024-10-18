import Container from "@/src/components/Ui/Container";
import Post from "@/src/components/Ui/Post";
import { getPost } from "@/src/services/post";

interface IProps {
  params: {
    itemId: string;
  };
}

const ItemDetailPage = async ({ params: { itemId } }: IProps) => {
  const { data: post } = await getPost(itemId);

  return (
    <Container>
      <div className="mx-auto my-3 max-w-[720px]">
        <Post key={post?._id} post={post} />
      </div>
    </Container>
  );
};

export default ItemDetailPage;
