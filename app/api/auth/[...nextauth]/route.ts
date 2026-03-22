import NextAuth from "next-auth"
import { Adapter } from "next-auth/adapters"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"   




const handler = NextAuth({
    adapter: PrismaAdapter(db) as Adapter,
    providers: [ Google(
        {
        clientId: "",
        clientSecret: "",
    }
    )

    ]
  ...
})

export { handler as GET, handler as POST }