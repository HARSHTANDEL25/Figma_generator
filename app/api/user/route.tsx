import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST() {
    const {userId} = await auth();
    
    if(!userId){
        return new Response("Unauthorized", {status: 401});
    }

    //our clerk user
    const user = await currentUser();

    //matching clerk user with our database user
    const users = await db.select().from(usersTable).where(
        eq(usersTable?.email,user?.primaryEmailAddress?.emailAddress ?? "")
    )

    if(users.length === 0){
        const userdata = {
            name : user?.fullName ?? "",
            email : user?.primaryEmailAddress?.emailAddress ?? "",
        }
        //inserting user data into our database
        const newUsers= await db.insert(usersTable).values({
            ...userdata
        }).returning();
        return NextResponse.json({message: "User created successfully", user: newUsers[0]}, {status: 201});
    }
    return NextResponse.json({message: "User already exists", user: users[0]}, {status: 200});
}