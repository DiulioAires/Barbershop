import { db } from "@/app/lib/prisma"; // Se der erro aqui ainda, veja a nota abaixo
import BarbershopInfo from "./_components/barbershop-info";


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
  });

  if (!barbershop) {
    return null // to DO: redirecionar para home page
  }

  return ( 
    <BarbershopInfo barbershop={barbershop} />
  );
    
  
}

export default BarbershopDetailsPage;