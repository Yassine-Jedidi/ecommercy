import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req:Request , {params} : {params: Promise<{storeId: string}>}){
    try{
        const {userId} = await auth();
        if (!userId){
            return new NextResponse("Unauthenticated", { status: 401 });
        }
        const body = await req.json();
        const {name} = body;
        if (!name){
            return new NextResponse("Name is required", {status : 400});
        }
        const {storeId} = await params;
        if (!storeId){
            return new NextResponse("Store ID is required", {status : 400})
        }
        const store = await prisma.store.update({
            where: {
                id: storeId
            },
            data: {
                name,
            }
        })
        return NextResponse.json(store);
    } catch (error) {
        console.log("[STORE_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req:Request, {params} : {params : Promise<{storeId: string}>}){
    try{
        const {userId} = await auth();
        if (!userId){
            return new NextResponse("Unauthenticated", {status : 401});
        }
        const {storeId} = await params;
        if (!storeId){
            return new NextResponse("Store Id is required", {status : 400});
        }
        const store = await prisma.store.delete({
            where:{
                id:storeId,
                userId: userId,
            }
        })
        return NextResponse.json(store);
    }catch (error) {
        console.log("[STORE_DELETE]", error);
        return new NextResponse("Internal Error", {status : 500});
    }
}