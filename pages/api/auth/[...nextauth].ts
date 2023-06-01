import { NextApiHandler } from "next"
import NextAuth from "next-auth"
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
// we will define `options` up next
const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler
const options = {
	// adapter: PrismaAdapter(prisma),
	debug: process.env.NODE_ENV === "development",
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: { label: "Email", type: "email", placeholder: "Email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials:any, req:any) {
				const user = await prisma.user.findFirst({
					where: {
						email: credentials.username,
						password: credentials.password,
					},
				})
		
				if (user) {
					return user
				}
				return null
			},
		}),
	],
	callbacks: {
		async jwt({ token, account, user, isNewUser }:any) {
			if (account) {
				token.role = user?.role
				token.username = user?.username
			}
			return token
		},
		async session({ session, token, user }:any) {
			session.user = { ...session.user, role: token?.role, username: token.username }
			return session
		},
		// redirect({ url, baseUrl }) {
		// 	if (url.startsWith(baseUrl)) return url
		// 	else if (url.startsWith("/")) return new URL(url, baseUrl).toString()
		// 	return baseUrl
		// },
	},
	session: {
		// Seconds - How long until an idle session expires and is no longer valid.
		maxAge: 12 * 60 * 60, // 30 days
	},

	// secret: "secrets",
	pages: {
		signIn: "/auth/login",
		signOut: "/",
		error: "/auth/login", // Error code passed in query string as ?error=
		// verifyRequest: "/auth/verify-request", // (used for check email message)
		// newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
	},
}
