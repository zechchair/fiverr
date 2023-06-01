import Input from "@/components/custom/input";
import Image from "next/image";
import Modal from "@/components/custom/modal";
import AttachementsMail from "@/components/custom/attachementsMail";

import { useState } from "react";
import { getCsrfToken, signIn } from "next-auth/react";
import Router, { useRouter } from "next/router";

type DataInput = {
  username: String;
  password: String;
};
export default function Login(props: any) {
  const router = useRouter();
  let [attachments, setAttachments] = useState([]);

  const [show, setShow] = useState<boolean>(false);
  const [data, setData] = useState(undefined);
  const [df, setDf] = useState(undefined);
  return (
    <>
      <div className="hidden fixed md:w-2/3 bg-gray-50 flex md:block   inset-y-0 left-0">
<div className="my-32 fixed md:w-2/3 bg-gray-50 flex md:block   inset-y-0 left-0">
        <Image src="/illustration.svg" layout="fill" priority alt="Eden" /></div>
      </div>
      <div
        className={
          "translate fixed flex  flex-col items-stretch justify-center bg-gradient-to-l from-purple-200 to-gray-50 shadow md:w-1/3 w-screen inset-y-0 right-0"
        }
      >
        <div className="flex justify-center mt-8 ">
          <Image src="/next.svg" width={165} height={105} priority alt="Eden" />
        </div>
        <form
          method="post"
          action="/api/auth/callback/crEdentials"
          className="px-12 space-y-5 mt-8 "
          onKeyDown={(e) => {
            if (e.keyCode == 13) {
              e.preventDefault();
              document?.getElementById("submit")?.click();
            }
          }}
          autoComplete="off"
        >
          <input
            name="csrfToken"
            type="hidden"
            defaultValue={props.csrfToken}
          />

          <input
            name="username"
            type="text"
            required
            placeholder="Identifiant......"
            value={data?.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            autoFocus
            className={
              "w-full text-sm py-2 text-black pl-4 pr-2 focus:ring-1 focus:outline-none focus:border-blue-300 focus:ring-gray-200 border border-gray-200 rounded-md"
            }
          />

          <input
            name="password"
            value={data?.password}
            required
            onChange={(e) => setData({ ...data, password: e.target.value })}
            type="password"
            placeholder="Mot de passe......"
            className={
              "w-full text-sm py-2 text-black pl-4 pr-2 focus:ring-1 focus:outline-none focus:border-blue-300 focus:ring-gray-200 border border-gray-200 rounded-md"
            }
          />

          {/* <div className="text-center text-red-500 text-sm center">{header}</div> */}
          <div className="text-center pt-4 flex flex-col h-full">
            <div>
              <button
                type="submit"
                id="submit"
                className="text-gray-50 bg-purple-500 py-1 px-3 my-2 rounded-full"
              >
                Connexion
              </button>
            </div>
            <div>
              <button
                className="text-gray-600 inline-flex py-1 px-3 my-2 rounded-full hover:underline hover:animate-pulse"
                onClick={() => {
                  Router.push("/register");
                }}
                type="button"
              >
                Créer mon compte &nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
              </button>
            </div>
            <div className="">
              <button
                className="text-xs  text-gray-900 hover:underline hover:text-gray-400 cursor-pointer"
                onClick={() => {
                  setShow(true);
                  setAttachments([]);
                  setDf(undefined);
                }}
                type="button"
              >
                Mot de passe oublié ?
              </button>
            </div>
          </div>
        </form>
        <div className="md:absolute mt-auto pt-2 w-full text-xs text-center bottom-0">
          <div>Eden @copyright</div>
          <a>Created by : Zakaria Echchair</a>
        </div>
      </div>
      <Modal
        show={show}
        size="md"
        onClose={() => {
          setShow(false);
        }}
      >
        <div className="rounded px-8 sm:px-12 py-8">
          <form
            className="grid md:grid-cols-2 md:gap-5 gap-3 "
            onSubmit={async (e) => {
              e.preventDefault();
              const bodyMail = {
                attachments: attachments,
                subject: "Demande de réinitialisation du mot de passe",
                to: "zakaria.echchair@tawsila.fr",
                text: `<h3>Bonjour Madame / Monsieur</h3> <h3>Monsieur / Madame ${
                  df?.name
                }, vous demande de bien vouloir récupérer son compte</h3><h3>Son message est :<h4> ${
                  df?.message ? df?.message : "N/A"
                }</h4></h3> <h5>contact:${df?.address}</h5>`,
              };
              const resmail = await fetch("/api/send_mail", {
                method: "POST",
                body: JSON.stringify(bodyMail),
              });
              if (resmail.status == 200) {
                setShow(false);
                setDf(undefined);
              } else {
              }
            }}
          >
            <Input
              type="text"
              autoFocus
              required
              value={df?.name}
              onChange={(e) => {
                setDf({ ...df, name: e.target.value });
              }}
              placeholder="Votre nom......"
            >
              Nom et prénom :
            </Input>
            <Input
              type="text"
              required
              value={df?.address}
              onChange={(e) => {
                setDf({ ...df, address: e.target.value });
              }}
              placeholder="Votre email ou numero de téléphone"
            >
              Email ou numero de téléphone :
            </Input>
            <Input
              type="textarea"
              value={df?.message}
              onChange={(e) => {
                setDf({ ...df, message: e.target.value });
              }}
              rows={3}
            >
              Message pour l'administrateur :
            </Input>
            <AttachementsMail
              attachments={attachments}
              setAttachments={setAttachments}
            />

            {/* <div className="flex justify-end"> */}
            <button
              type="submit"
              className="text-green-600 animate-pulse ml-auto md:col-span-2 mt-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
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
            {/* </div> */}
          </form>
        </div>
      </Modal>
    </>
  );
}
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
