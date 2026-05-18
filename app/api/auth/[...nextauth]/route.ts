import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const validUser = credentials.username === process.env.ADMIN_USERNAME;
        const validPass = await bcrypt.compare(
          credentials.password,
          process.env.ADMIN_PASSWORD_HASH as string
        );

        if (validUser && validPass) {
          return { id: "1", name: "Admin", email: "admin@clyde.fit" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      return `${baseUrl}/admin/events`;
    },
  },
});

export { handler as GET, handler as POST };
