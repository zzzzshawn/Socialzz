import Loader from '@/components/shared/Loader';
import PostStats from '@/components/shared/PostStats';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/AuthContext';
import { useDeletePost, useGetPostById } from '@/lib/react-query/queriesAndMutation'
import { timeAgo } from '@/lib/utils';
import { Link, useNavigate, useParams } from 'react-router-dom'


const PostDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const postId: string = id!; // Assert that id is a non-nullable string
  const { data: post, isPending } = useGetPostById(postId); // Use postId directly as it's already asserted to be non-nullable
  
  
  const { user } = useUserContext(); // to check if the user is the creator of post. if yes, show him the edit and delete options

  const { mutate: deletePost } = useDeletePost();


  const handleDeletePost = () => {
    if (id && post?.imageId) {
      deletePost({ postId: id, imageId: post.imageId });
      navigate(-1);
    } else {
      // Handle the case where id or post.imageId is undefined
      console.error("postId or imageId is undefined");
    }
  };


  return (
    <div className='post_details-container'>
      {isPending ? <Loader /> : (
        <div className="post_details-card">
          <img src={post?.imageUrl} alt="creator" className='post_details-img' />
          <div className="post_details-info">
            <div className="flex-between w-full ">

              <Link to={`/profile/${post?.creator.$id}`} className='flex items-center gap-3'>
                <img src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'}
                  alt="post"
                  className="rounded-full w-8 h-8 lg:w-12 lg:h-12" />

                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className="flex items-center flex-wrap gap-2 text-slate-400">
                    <p className="subtle-semibold lg:small-regular">
                      {timeAgo(post?.$createdAt)}
                    </p>
                    -
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex-center gap-4">
                <Link to={`/update-post/${post?.$id}`} className={`${user.id !== post?.creator.$id && 'hidden'}`}>
                  <img src="/assets/icons/edit.svg" alt="" width={24} height={24} />
                </Link>
                <Button onClick={handleDeletePost}
                  variant={`ghost`}
                  className={`ghost_details-delete_btn ${user.id !== post?.creator.$id && 'hidden'}`}>
                  <img src="/assets/icons/delete.svg"
                    alt="delete" width={24} height={24}
                  />
                </Button>
              </div>

            </div>

            <hr className='border w-full border-dark-4/80' />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string) => (
                  <li key={tag} className="text-light-3">
                    {tag? `#${tag}`:'' }
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full">
                <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostDetails