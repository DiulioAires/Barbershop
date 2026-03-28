import { db } from "../lib/prisma";
import Header from "../_components/header";
import BarbershopItem from "../_components/barbershop-item";
import { redirect } from "next/navigation";
import Search from "../_components/Search";
interface BarbershopsPageProps {
    searchParams: Promise<{
        search?: string;
    }>
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
    const params = await searchParams;
    
    if(!params.search) {
        return redirect("/")
    }

    const barbershops = await db.barbershop.findMany({
        where: {
            name: {
                contains: params.search,
                mode: "insensitive",
            }
        }
    });

    return (
        <>
            <Header />
            

            <div className="px-5 py-6 flex flex-col gap-6">
                <Search  defaultValues={{
                    search: params.search, 
                }}/>
                <h1 className="text-gray-400 font-bold text-xs uppercase">Resultados para &quot;{params.search}&quot;</h1>
                <div className="grid grid-cols-2 mt-3 gap-4">
                    {barbershops.map((barbershop) => (
                        <div key={barbershop.id} className="w-full">
                            <BarbershopItem barbershop={barbershop} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default BarbershopsPage;