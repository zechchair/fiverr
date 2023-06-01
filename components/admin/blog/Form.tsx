import ComboboxInput from "@/components/ComboBox";
import Input1 from "@/components/Input1";
import InputFile from "@/components/InputFile";
import TextAreaHtml from "@/components/TextAreaHtml";
import { fetcher } from "@/utils/fetcher";
import {
  LinkIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma } from "@prisma/client";
import { error } from "console";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { number, z } from "zod";

export default function Form({ IncomingData, afterSubmit }) {
  const category_labels: any = [
    { id: 1, name: "Freelancing" },
    { id: 2, name: "Shaping the future" },
    { id: 3, name: "Let's do it" },
    { id: 4, name: "Becoming partner" },
    // More users...
  ];
  const [displayFile, setDisplayFile] = useState(undefined);
  const [file, setFile] = useState(undefined);
  const FormSchema = z.object({
    category: z.object({ id: z.number(), name: z.string() }).optional(),
    description: z.string().optional(),
    title: z.string().optional(),
    image: z.string().optional(),
    content: z.string(),
  });

  type FormSchemaType = z.infer<typeof FormSchema>;
  const {
    watch,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // title: "",
      // description: "",
      // content: "",
      // image:"",
      // category:{}
    },
  });
  useEffect(() => {
    reset({
      title: IncomingData?.title,
      description: IncomingData?.description,
      content: IncomingData?.content,
      image: IncomingData?.image,
      category: category_labels.find(
        (elem) => elem.name == IncomingData?.category
      ),
    });
  }, [IncomingData]);
  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    console.log({ errors });
    console.log(data);
    const body: Prisma.BlogCreateArgs = {
      data: {
        title: data.title,
        description: data.description,
        content: data.content,
        image: data.image,
        category: data?.category?.name,
      },
      include: {
        author: true,
      },
    };
    async function Fetch() {
      const res = await fetcher("/api/create/blog", body);
      if (!res.code) {
        afterSubmit(res);
        reset({   
           title: undefined,
          description: undefined,
          content:undefined ,
          image:undefined,
          category:undefined});
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
  };

  return (
    <form
      className="flex flex-col h-full justify-between"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="divide-y divide-gray-200 px-4 sm:px-6">
        <div className="space-y-6 pb-5 pt-6">
          <InputFile
            setFile={setFile}
            setUploadedImage={setDisplayFile}
            image={displayFile}
          />

          <Input1
            error={errors?.title?.message}
            title="Title"
            value={watch("title")}
            onChange={(e) => {
              setValue("title", e.target.value);
            }}
          />
          <ComboboxInput
            error={errors?.category?.message}
            by="name"
            title="Category"
            options={category_labels}
            selected={watch("category")}
            onChange={(elem) => {
              setValue("category", elem);
            }}
          />
          <Input1
            error={errors?.description?.message}
            title="Description"
            value={watch("description")}
            onChange={(e) => {
              setValue("description", e.target.value);
            }}
          />

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Content
            </label>
            <div className="mt-2">
              <TextAreaHtml
                setBody={(text: string) => {
                  setValue("content", text);
                }}
                value={watch("content")}
              />
              <span className="text-xs text-red-600 px-3">
                {errors?.content?.message}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-shrink-0 justify-end px-4 py-4">
        <button
          type="button"
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
          onClick={() => console.log(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Save
        </button>
      </div>
    </form>
  );
}
