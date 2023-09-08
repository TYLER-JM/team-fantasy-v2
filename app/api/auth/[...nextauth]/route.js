import prisma from "@/lib/prismaClient";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'

export const Options = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {label: 'Username', type: 'text', placeholder: 'username'},
        password: {label: 'Password', type: 'password'}
      },
      async authorize(credentials, req) {
        try {
          let user = await prisma.user.findFirstOrThrow({where: {username: req.body.username}, include: {owner: true}})
          if (bcrypt.compareSync(req.body.password, user.password)) {
            return {...user, password: null}
            // return user
          } else {
            return null
          }
        } catch (error) {
          console.log('ERROR logging in', error)
          return null
        }
      },
    })
  ],
  // session: {jwt: true, maxAge: 30 * 24 * 60 * 60}
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.user = user
      }
      return token
    },
    async session({session, token}) {
      if (token.user) {
        session.user = token.user
      }
      return session
    }
  }
}

const handler = NextAuth(Options)

export {handler as GET, handler as POST}