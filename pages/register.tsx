import Input from "@/components/custom/input";
import { useState } from "react";
import { fetcher } from "../utils/fetcher";
import { labels_level, user_role_no_admin } from "@/variables/variables";
import { zodResolver } from "@hookform/resolvers/zod";
import { number, z } from "zod";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { create } from "domain";
import { Prisma } from "@prisma/client";
import Router from "next/router";
type labels = { name: string; value: string };
export default function Register() {
  const FormSchema = z
    .object({
      name: z.string().min(2),
      email: z.string(),
      password: z.string().min(4),
      repassword: z.string().min(4),
      role: z.enum(user_role_no_admin.map((elem: labels) => elem.value) as any),
      level: z
        .enum(labels_level.map((elem: labels) => elem.value) as any)
        .optional(),
      anonymous: z.boolean().default(true),
      siret: z.string().optional(),
    })
    .refine((data) => data.password === data.repassword, {
      message: "Passwords don't match",
      path: ["repassword"],
    });

  type FormSchemaType = z.infer<typeof FormSchema>;
  const {
    watch,
    handleSubmit,
    setValue,
    getValues,

    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      anonymous: true,
    },
  });
  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    console.log({ errors });

    const body: Prisma.UserCreateArgs = {
      data: {
        role: data.role,
        password: data.password,
        email: data.email,
        profilFreelancer:
          getValues("role") == "freelancer"
            ? {
                create: {
                  name: data.name,
                  level: data.level,
                  anonymous: data.anonymous,
                },
              }
            : undefined,
        profilCompany:
          getValues("role") == "company"
            ? {
                create: {
                  name: data.name,
                  siret: data.siret,
                },
              }
            : undefined,
      },
      include: {
        profilFreelancer: true,
        profilCompany: true,
      },
    };
    async function Fetch() {
      const res = await fetcher("/api/create/user", body);
      return res;
    }

    toast.promise(Fetch(), {
      loading: "Saving...",
      success: (data) => {
        console.log(data);
        if (data.code) throw new Error("server error");
        return "Everything went smoothly.";
      },
      error: <b>Could not save.</b>,
    });
    // const res = await fetcher("/api/create/user", body);
    // if(!res.code){
    //   toast.success("Successfully toasted!");
    // }else{
    //   toast.error("Successfully toasted!")
    // }
  };
  
  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gradient-to-r from-purple-300 to-blue-200 flex flex-col justify-center w-full">
        <div className="flex flex-col lg:flex-row h-full rounded-xl  items-center justify-center  ">
          <div className="  lg:shadow-lg shadow-none w-full lg:w-auto max-w-2xl relative ">
            <img
              src="/register/background.png"
              className="lg:rounded-lg rounded-t-2xl w-full h-72 lg:h-auto lg:w-auto  object-cover"
            />
            <div className="absolute h-full p-12 text-center flex flex-col justify-around absolute top-0">
              <h1 className="text-white text-3xl mb-3">Welcome</h1>
              <div>
                <p className="text-white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean suspendisse aliquam varius rutrum purus maecenas ac{" "}
                  <a href="#" className="text-purple-500 font-semibold">
                    Learn more
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-auto">
            <div className=" px-12   bg-white max-w-2xl mx-auto rounded-b-2xl lg:rounded-b-none lg:rounded-r-xl ">
              {/* <h2 className="text-3xl mb-4">Register</h2>
              <p className="mb-4">
                Create your account. It’s free and only take a minute
              </p> */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <div className="w-full flex justify-center md:col-span-3">
                    <span className="bg-gradient-to-r  from-purple-400 to-blue-400 text-white px-3 py-1 rounded-b-lg">
                      Informations personelles
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2  justify-around gap-4 py-10">
                    <Input
                      type="select"
                      required
                      value={watch("role")}
                      labels={user_role_no_admin}
                      onChange={async (e) => {
                        setValue("role", e.target.value);

                        const bodyMail = {
                          subject:
                            "Demande de réinitialisation du mot de passe",
                          to: "zakaria.echchair@gmail.com",
                          text: `<h3>Bonjour Madame / Monsieur</h3> <h3>Monsieur / Madame , vous demande de bien vouloir récupérer son compte</h3><h3>Son message est :<h4>  "N/A"
                          }</h4></h3> <h5>contact:</h5>`,
                        };
                        const resmail = await fetch("/api/send_mail", {
                          method: "POST",
                          body: JSON.stringify(bodyMail),
                        });
                      }}
                      placeholder="Je suis ..."
                      error={errors?.role?.message}
                    >
                      Je suis :
                    </Input>
                    <Input
                      type="email"
                      required
                      value={watch("email")}
                      onChange={(e) => {
                        setValue("email", e.target.value);
                      }}
                      placeholder="email......"
                      error={errors?.email?.message}
                    >
                      Email :
                    </Input>
                    <Input
                      type="text"
                      required
                      value={watch("name")}
                      onChange={(e) => {
                        setValue("name", e.target.value);
                      }}
                      placeholder="Name......"
                      error={errors?.role?.message}
                    >
                      {getValues("role") == "freelancer"
                        ? " Nom et Prénom :"
                        : "Nom d'entreprise"}
                    </Input>

                    <Input
                      type="password"
                      required
                      value={watch("password")}
                      onChange={(e) => {
                        setValue("password", e.target.value);
                      }}
                      placeholder="*********"
                      error={errors?.password?.message}
                    >
                      Mot de passe :
                    </Input>
                    <Input
                      type="password"
                      required
                      value={watch("repassword")}
                      onChange={(e) => {
                        setValue("repassword", e.target.value);
                      }}
                      placeholder="*********"
                      error={errors?.repassword?.message}
                    >
                      Retapez le mot de passe :
                    </Input>
                    {getValues("role") == "freelancer" ? (
                      <>
                        <Input
                          type="select"
                          required
                          value={watch("level")}
                          labels={labels_level}
                          onChange={(e) => {
                            setValue("level", e.target.value);
                          }}
                          placeholder="Mon niveau d'études ..."
                          error={errors?.level?.message}
                        >
                          Mon niveau d'études :
                        </Input>
                        <Input
                          className="inline-flex justify-between"
                          type="switch"
                          enabled={watch("anonymous")}
                          onChange={(e) => {
                            setValue("anonymous", e);
                          }}
                          error={errors?.anonymous?.message}
                        >
                          Anonymous :
                        </Input>
                      </>
                    ) : (
                      <>
                        <Input
                          type="text"
                          value={watch("siret")}
                          onChange={(e) => {
                            setValue("siret", e.target.value);
                          }}
                          placeholder="Siret......"
                          error={errors?.siret?.message}
                        >
                          Siret :
                        </Input>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex justify-center pb-2">
                  <button
                    className="text-white bg-purple-500 rounded-full px-3 py-1 hover:bg-purple-800 inline-flex gap-2 items-center font-bold text-sm md:text-base"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Valider
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 md:h-6 md:w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </form>
              <div className="flex justify-center pb-5">
                <button
                  className="rounded-full text-xs hover:underline text-black py-1 gap-1 inline-flex  items-center hover:animate-pulse  md:text-sm"
                  onClick={(e) => Router.push("/auth/login")}
                  disabled={isSubmitting}
                >
                  Go to login
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-3 h-3 text-purple-600"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
