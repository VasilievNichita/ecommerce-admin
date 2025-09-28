import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import { use } from "react";

import prismadb from "@/lib/prismadb";

export default async function SetupLayout ({
    children
}: {
    children : React.ReactNode;
}) {
    const { userId } = await  auth()

    if(!userId) {
        redirect('/sign-in');
    }

    let store = null;
    
    try {
        store = await prismadb.store.findFirst({
            where: {
                userId 
            }
        });
    } catch (error) {
        console.error('Database connection error:', error);
        // Continue without redirecting if database is not available
    }

    if(store){
      redirect(`/${store.id}`)  
    }

    return (
        <>
            {children}
        </>
    )
}