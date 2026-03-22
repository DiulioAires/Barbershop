import { db } from "@/app/lib/prisma"; // Se der erro aqui ainda, veja a nota abaixo
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-items";



interface BarbershopDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const BarbershopDetailsPage = async ({ params }: BarbershopDetailsPageProps) => {
  const { id } = await params; // No Next.js 15, precisamos aguardar o params

  if (!id) {
    // to DO: redirecionar para home page
    return null
  }


  const barbershop = await db.barbershop.findUnique({
   
    where: {
      id: id,
    },
      include: {
      services: true,
    },
  });

  if (!barbershop) {
    return null // to DO: redirecionar para home page
  }

  // Extraímos os serviços para não enviar os "Objetos Decimal" para o Client Component
  const { services, ...barbershopData } = barbershop;

  return ( 
   <div className="">
    
    <BarbershopInfo barbershop={barbershopData}/>
   

    <div className="px-5 flex flex-col py-6 gap-4">
       {services.map((service) => (
      <ServiceItem key={service.id} service={service} />
    ))}
    </div>

   
   </div>
  );
    
  
}

export default BarbershopDetailsPage;