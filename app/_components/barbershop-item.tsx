import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Barbershop } from "@prisma/client";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";


interface BarbershopItemProps {
    barbershop: Barbershop;

}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {

    return (

        <Card className="min-w-[167px] max-w-[167px] rounded-2xl px-1 ">

            <CardContent className="px-1 pb-0">
              <div className="w-full h-[159px] relative">
              <div className="top-2 left-2 absolute z-50">

                  <Badge variant="secondary" className=" opacity-90 flex place-items-center gap-1 top-3 left-3">
                 <StarIcon size={12} className="fill-primary text-primary"/>
                 <span className="text-xs ">5,0</span>
                </Badge>
              </div>
                  <Image
                    className="rounded-2xl"
                    style={{
                        objectFit: "cover",
                    }}

                    src={barbershop.imageUrl}
                    alt={barbershop.NAME}
                    fill
                />
              </div>
                <div className="px-2">
                    <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">{barbershop.NAME}</h2>
                    <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">{barbershop.address}</p>
                    <Button className="w-full mt-3" variant="secondary">Reservar</Button>
                </div>
            </CardContent>

        </Card>
    );
}

export default BarbershopItem;