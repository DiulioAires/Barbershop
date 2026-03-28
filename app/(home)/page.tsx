import Search from "../_components/Search";
import { db } from "../lib/prisma";
import BookingItem from "../_components/booking-item";
import Header from "../_components/header";
import BarberShopItem from "../_components/barbershop-item";
import { ptBR } from "date-fns/locale"; //data com local correto
import { format } from "date-fns"; //adiciona data dinamica
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { Prisma } from "@prisma/client"


export default async function Home() {


  const session = await getServerSession(authOptions)

  const [recommendedBarbershops, popularBarbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany({
      orderBy: {
        id: "asc",
      },
      take: 10,
    }),
    db.barbershop.findMany({
      orderBy: {
        id: "desc",
      },
      take: 10,
    }),
    session?.user
      ? db.booking.findMany({
          where: {
            userId: (session.user as any).id,
            date: {
              gte: new Date(),
            },
          },
          include: {
            service: true,
            barbershop: true,
          },
        })
      : Promise.resolve([]),
  ]);

  return (
    <div>
      <Header />
      <div className="px-5 pt-5">
          <h2 className="text-xl font-bold">{session?.user ? `Olá, ${session.user.name?.split(" ")[0]}!` : "Olá, visitante!"}</h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM ", { locale: ptBR })}
        </p>
      </div>

      <div className="mt-6 px-5">
        <Search />
      </div>


      <div className="mt-6">
        
       {confirmedBookings.length > 0 && (
        <>
        
        
        <h2 className="text-xs uppercase text-gray-400 font-bold mb-3 pl-5">Agendamentos</h2>
        
        <div className=" p-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden"> 
        {confirmedBookings.map((booking: Prisma.BookingGetPayload<{ include: { service: true; barbershop: true } }>) => (
          <BookingItem key={booking.id} booking={{
            ...booking,
            service: {
              ...booking.service,
              price: Number(booking.service.price),
            }
          } as any} />
        ))}</div>
        
        </>


       )}
      </div>


      <div className="mt-6">
        <h2 className="text-xs uppercase px-5 text-gray-400 font-bold mb-3">Recomendados</h2>


        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {recommendedBarbershops.map((barbershop) => (
            <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
              <BarberShopItem  barbershop={barbershop} />
            </div>

          ))}
        </div>


      </div>


      <div className="mt-6 mb-[4.5rem]">
        <h2 className="text-xs uppercase px-5 text-gray-400 font-bold mb-3">Populares</h2>


        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
              <BarberShopItem  barbershop={barbershop} />
            </div>

          ))}
        </div>


      </div>



    </div>
  );
}
