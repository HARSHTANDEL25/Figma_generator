// creating a project in db 

import { db } from "@/config/db";
import { projectTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
const {projectId,userInput,deviceInput} = await req.json();
const user = await currentUser()
if(!user){
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
}
//lets create in db

const newProject = await db.insert(projectTable).values({
    projectId : projectId,
    userId : user?.primaryEmailAddress?.emailAddress ?? "",
    userInput : userInput ?? "",
    deviceInput : deviceInput ?? "",
}).returning();

console.log(newProject);
return NextResponse.json({message: "Project created successfully", project: newProject}, {status: 201});

}