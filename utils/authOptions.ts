// utils/authOptions.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../lib/mongodb";  // Ensure this path is correct for your project
import User from "../models/User";       // Ensure this path is correct for your project
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Ensure credentials are provided
        if (!credentials?.email || !credentials?.password) {
          throw new Error("❌ Please provide both email and password");
        }

        // Connect to the database
        await connectDB();

        // Find the user by email
        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("❌ No user found with this email");

        // Compare the provided password with the hashed password in the database
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password, // Trust that credentials is non-null
          user.password
        );
        if (!isPasswordCorrect) throw new Error("❌ Incorrect password");

        // Return user data including the role
        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role || "user", // fallback to 'user' if no role set
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Store user role in the JWT token
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Attach the role to the session
      if (session.user && token.role) {
        session.user.role = token.role as string; // Ensure 'role' is a string
      }
      return session;
    },
  },
  session: {
    strategy: "jwt", // Use JWT for session storage
  },
  pages: {
    signIn: "/user/login", // Path to your custom login page
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret for signing the session JWT
  debug: process.env.NODE_ENV === "development", // Enable debug mode in development
};
