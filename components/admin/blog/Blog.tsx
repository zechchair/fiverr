import { fetcher, formatDate } from "@/utils/fetcher";
import { User } from "@prisma/client";
import { Blog } from "@prisma/client";
import { toast } from "react-hot-toast";

type props = {
  post: Blog & { author: User };
  onClick?: (post: Blog & { author: User }) => void;
  onDelete?: (post: Blog & { author: User }) => void;
};

export default function Blog({ post, onClick,onDelete }: props) {
  return (
    <>
      <article
        key={post.id}
        className="flex flex-col items-start justify-between"
      >
        <div className="relative w-full">
          <button className="absolute top-2 bg-white rounded-full p-1 z-10 hover:scale-125 cursor-pointer right-2 "
          onClick={async ()=>{
            async function Fetch() {
              const res = await fetcher("/api/delete/blog", {
                where:{id:post.id}
              });
              console.log(res)
              if (!res.code) {
               onDelete(post)
              }
              return res;
            }
        
            toast.promise(Fetch(), {
              loading: "Saving...",
              success: (data) => {
                if (data.code) throw new Error("server error");
                return "Everything went smoothly.";
              },
              error: <b>Could not save.</b>,
            });
          }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              className="text-red-600 w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>

          <img
            onClick={() => {
              onClick ? onClick(post) : undefined;
            }}
            src={
              post.image ??
              "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80"
            }
            alt=""
            className="aspect-[16/9] cursor-pointer w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
          />
        </div>
        <div className="max-w-xl">
          <div className="mt-8 flex items-center gap-x-4 text-xs">
            <time
              dateTime={post.createdAt.toString()}
              className="text-gray-500"
            >
              {formatDate(post.createdAt)}{" "}
            </time>
            <a
              // href={post.category.href}
              className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
            >
              {post.category}
            </a>
          </div>
          <div className="group relative">
            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
              <a
              //  href={post.href}
              >
                <span className="absolute inset-0" />
                {post.title}
              </a>
            </h3>
            {/* <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
              {post.description}
            </p> */}
          </div>
          {!!post.author ? (
            <div className="relative mt-8 flex items-center gap-x-4">
              <img
                src={post?.author?.image}
                alt=""
                className="h-10 w-10 rounded-full bg-gray-100"
              />
              <div className="text-sm leading-6">
                <p className="font-semibold text-gray-900">
                  <a
                  // href={post.author.href}
                  >
                    <span className="absolute inset-0" />
                    {post?.author?.name}
                  </a>
                </p>
                <p className="text-gray-600">{post?.author?.role}</p>
              </div>
            </div>
          ) : undefined}
        </div>
      </article>
    </>
  );
}
{
  /* <article
key={post.id}
className="relative isolate flex flex-col gap-8 lg:flex-row"

>
<div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0"
onClick={()=>{ onClick ? onClick(post):undefined}}
>
  <img
    src={post.image ??         "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80"          }
    alt=""
    className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
  />
  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
</div>
<div>
  <div className="flex items-center gap-x-4 text-xs">
    <time dateTime={post.createdAt.toString()} className="text-gray-500">
      {post.createdAt.toString()}
    </time>
    <a
      // href={post.category.href}
      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
    >
      {post.category}
    </a>
  </div>
  <div className="group relative max-w-xl">
    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
      <a
      // href={post.href}
      >
        <span className="absolute inset-0" />
        {post.title}
      </a>
    </h3>
    <p className="mt-5 text-sm leading-6 text-gray-600">
      {post.description}
    </p>
  </div>
  {post.author ?
  <div className="mt-6 flex border-t border-gray-900/5 pt-6">
    <div className="relative flex items-center gap-x-4">
      <img
        src={post?.author?.image}
        alt=""
        className="h-10 w-10 rounded-full bg-gray-50"
      />
      <div className="text-sm leading-6">
        <p className="font-semibold text-gray-900">
          <a
          // href={post.author.href}
          >
            <span className="absolute inset-0" />
            {post?.author?.name}
          </a>
        </p>
        <p className="text-gray-600">{post?.author?.role}</p>
      </div>
    </div>
  </div>:undefined}
</div>
</article> */
}
