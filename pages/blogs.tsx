import Blog from "@/components/admin/blog/Blog";
import Form from "@/components/admin/blog/Form";
import Layout from "@/components/admin/Layout";
import SlideOver from "@/components/admin/SlideOverWithFooter";
import PaginationUi from "@/components/pagination";
import prisma from "@/lib/prisma";
import { fetcher } from "@/utils/fetcher";
import { Prisma } from "@prisma/client";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { toast } from "react-hot-toast";

const database = "blog";
const item_per_page: number = 6;

export async function getServerSideProps() {
  const data: Prisma.BlogUncheckedCreateInput[] = await prisma[
    database
  ].findMany({
    take: item_per_page,
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  const Count = await prisma[database].count();
  const dataj = JSON.parse(JSON.stringify(data));
  return {
    props: { initialData: dataj, Count: Count },
  };
}

export default function Blogs(props) {
  const [open, setOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(undefined);

  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [data, setData] = useState<Prisma.BlogUncheckedCreateInput[]>(
    props.initialData
  );

  const [count, setCount] = useState(props.Count);

  async function goToPg(newPg: number = 1) {
    const body = {
      take: item_per_page,
      skip: item_per_page * (newPg - 1),
      // where: {
      // 	name: filter?.name ? { contains: filter?.name } : undefined,
      // 	codeA: filter?.codeA ? { contains: filter?.codeA } : undefined,
      // },
      orderBy: [
        {
          id: "desc",
        },
      ],
    };

    async function Fetch() {
      // var Count = 0
      // var res:any=[]
      let done=false
     await Promise.all([
        await fetcher("/api/count/" + database, {
          // where: body.where,
        }),
        await fetcher("/api/find/" + database, body),
        ,
      ]).then((array) => {
        setCount(array[0]);
        if (!array[1]?.code) {
          if (isMobile && newPg - 1) {
            setData([...data, ...array[1]]);
          } else {
            setData(array[1]);
          }
          done=true
          setSelectedPage(newPg);
        }
      
      });

      return done
    }
    toast.promise(Fetch(), {
      loading: "Downloading...",
      success: (done) => {
        if (!done) throw new Error("server error");
        return "Everything went smoothly.";
      },
      error: <b>Could not download.</b>,
    });
  }

  const [filter, setFilter] = useState<any>(undefined);

  return (
    <Layout>
      {/* <div className="fixed  top-16 right-5 text-gray-900 "> */}

      <button
        hidden={open}
        className="absolute cursor-pointer right-0  w-24 hover:w-auto hover:inline-flex hover:p-2 transition-all duration-200 ease-in-out delay-50 group    gap-2 transform  hover:-translate-x-5  items-center hover:bg-purple-700   text-white rounded-full  hover:px-3"
        onClick={() => {
          setOpen(true);
        }}
      >
        {/* <div className="w-10 h-10 group-hover:w-4 group-hover:h-4  shadow-xl motion-safe:animate-pulse group-hover:animate-pulse center transition-all  hover:shadow-lg transform  hover:rotate-45 rounded-full p-2 bg-purple-600 group-hover:bg-purple-50 "> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-10 h-10 text-white group-hover:w-4 group-hover:h-4  shadow-xl motion-safe:animate-pulse  center transition-all duration-200 ease-in-out delay-50   hover:shadow-lg transform  hover:rotate-45 rounded-full p-2 bg-purple-600 group-hover:bg-purple-50 "
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        {/* </div> */}
        <div className="center cursor-pointer">
          <span className="text-xs md:text-sm font-semibold whitespace-nowrap uppercase ">
            New blog
          </span>
        </div>
      </button>
      {/* </div> */}

      <div className="bg-white ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              From the blog
            </h2>
            {/* <p className="mt-2 text-lg leading-8 text-gray-600">
              Learn how to grow your business with our expert advice.
            </p> */}
          </div>
          <div className="mx-auto mt-6 grid max-w-2xl  grid-cols-1 gap-x-10 xl:gap-x-32 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {data?.map((post: any) => (
              <Blog
                post={post}
                onClick={(post) => {
                  setSelectedBlog(post);
                  setOpen(true);
                }}
                onDelete={(elem) => {
                  goToPg(selectedPage);
                  // setData(data.filter((item)=>(item.id!=elem.id)))
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <SlideOver open={open} setOpen={setOpen}>
        <Form
          IncomingData={selectedBlog}
          afterSubmit={(newPost) => {
            setData([newPost, ...data.slice(0, item_per_page - 1)]);
            setCount(count + 1);
          }}
        />
      </SlideOver>
      <PaginationUi
        selected={selectedPage}
        len={parseInt(((count - 0.1) / item_per_page) as any) + 1}
        onChange={async (newPg) => {
          console.log(newPg);
          goToPg(newPg);
        }}
      />
    </Layout>
  );
}
