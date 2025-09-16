import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST (
    req: Request,
    { params } : {params:{storeId: string}}
) {
    try {
        const {userId} =await  auth();
        const body = await req.json();

        const {name} = body;

        if(!userId){
            return new NextResponse("Unauthentificated",{status:401})
        }
        if(!name){
            return new NextResponse("Name is required", {status: 400})
        }

        if(!params.storeId){
            return new NextResponse("Store id is required",{status: 400})
        }

        const store = await prismadb.store.create({
            where : {
                id: params.storeId,
                userId
            }, 
            data : {
                name
            }

        })

        return NextResponse.json(store);
    } catch (error) {
        console.log('[STORE_POST]',error);
        return new NextResponse("Internal error",{status: 500})
    }
}



export async function DELETE (
    req: Request,
    { params } : {params:{storeId: string}}
) {
    try {
        const {userId} =await  auth();

        if(!userId){
            return new NextResponse("Unauthentificated",{status:401})
        }

        if(!params.storeId){
            return new NextResponse("Store id is required",{status: 400})
        }

        const store = await prismadb.store.deleteMany({
            where : {
                id: params.storeId,
                userId
            }
        })

        return NextResponse.json(store);
    } catch (error) {
        console.log('[STORE_DELETE]',error);
        return new NextResponse("Internal error",{status: 500})
    }
}