import prisma from "@/lib/prisma";

interface DashboardPageProps {
    params: Promise<{ storeId: string}>;
}

export default async function DashboardPage({ params } : DashboardPageProps) {
    const { storeId } = await params;
    const store = await prisma.store.findFirst({
        where: {
            id : storeId,
        }
    })
    return (
        <div>Active Store:  {store?.name}</div>
    )
}