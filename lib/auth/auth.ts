import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { login } from "@/server/auth/services";
import { loginSchema } from "@/server/auth/validators";
import Google from "next-auth/providers/google";
import { sendVerificationEmail } from "../emails/send-verification";
import crypto from "crypto";

class EmailNotVerifiedError extends CredentialsSignin {
  code = "email not verified";
}
// Check next-auth.d.ts file to see the extanded type
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 7 /* 7 Days */ },

  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Credentials",
      async authorize(data) {
        const validation = loginSchema.safeParse(data);
        if (validation.success) {
          const user = await login(
            validation.data?.email,
            validation.data.password,
          );

          if (!user) return null;

          if (!user?.emailVerified) {
            if (user.verificationToken) throw new EmailNotVerifiedError();

            await sendVerificationEmail({
              email: user.email,
              name: user.name,
              userId: user.id,
              verifircationToken:
                user.verificationToken ||
                crypto.randomBytes(32).toString("hex"),
            });

            throw new EmailNotVerifiedError();
          }
          return user;
        }

        return null;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "user",
        };
      },
    }),
  ],
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { email: user.email! },
        data: { emailVerified: new Date(), verificationToken: null }, // ig user logged in with  google, then verifiy email, and clear verification token
      });
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        const dbUser = await prisma.user.findUnique({
          where: {
            id: token.id,
          },
          select: {
            role: true,
          },
        });

        
        if (!dbUser) throw new Error("User no longer exists in database");
        token.role = dbUser.role;
        session.user.email = token.email!;
        session.user.name = token.name;
        session.user.id = token.id!;
        session.user.role = dbUser.role;
      }
      return session;
    },
  },
});
