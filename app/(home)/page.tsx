import Search from "../_components/Search";
import { db } from "../lib/prisma";
import BookingItem from "../_components/booking-item";
import Header from "../_components/header";
import { ptBR } from "date-fns/locale"; //data com local correto
import { format } from "date-fns"; //adiciona data dinamica

export default async function Home() {

  //chamar prisma e pegar barbearias e agendamento para mostrar na tela
  const barbershops = await db.barbershop.findMany({});

  return (
    <div>
      <Header />
      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Miguel!</h2>
        <p suppressHydrationWarning className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM ", { locale: ptBR })}
        </p>
      </div>

      <div className="px-5 mt-6">
        <Search />
      </div>


      <div className="px-5 mt-3">
        <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">Agendamentos</h2>
        <BookingItem />
      </div>

    </div>
  );
}

