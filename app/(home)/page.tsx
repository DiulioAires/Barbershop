import Search from "../_components/Search";
import { db } from "../lib/prisma";
import BookingItem from "../_components/booking-item";
import Header from "../_components/header";
import BarberShopItem from "../_components/barbershop-item";
import { ptBR } from "date-fns/locale"; //data com local correto
import { format } from "date-fns"; //adiciona data dinamica
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Home() {


  const session = await getServerSession(authOptions)



  const [barbershops, confirmedBookings] = await Promise.all ([
      db.barbershop.findMany({}),
    session?.user ? db.booking.findMany({
        where: {
            userId: (session.user as any).id,
            date: {
                gte: new Date(),
            }
            
        },
        include: {
            service: true,
            barbershop: true,
        },
    }) 

    : Promise.resolve([]) 
  ])

 



  return (
    <div>
      <Header />
      <div className="px-5 pt-5">
          <h2 className="text-xl font-bold">{session?.user ? `Olá, ${session.user.name?.split(" ")[0]}!` : "Olá, visitante!"}</h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM ", { locale: ptBR })}
        </p>
      </div>

      <div className="mt-6">
        <Search />
      </div>


      <div className="mt-6">
        
       {confirmedBookings.length > 0 && (
        <>
        
        
        <h2 className="text-xs uppercase text-gray-400 font-bold mb-3 pl-5">Agendamentos</h2>
        
        <div className=" p-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden"> 
        {confirmedBookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}</div>
        
        </>


       )}
      </div>


      <div className="mt-6">
        <h2 className="text-xs uppercase px-5 text-gray-400 font-bold mb-3">Recomendados</h2>


        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />

          ))}
        </div>


      </div>


      <div className="mt-6 mb-[4.5rem]">
        <h2 className="text-xs uppercase px-5 text-gray-400 font-bold mb-3">Populares</h2>


        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />

          ))}
        </div>


      </div>



    </div>
  );
}
