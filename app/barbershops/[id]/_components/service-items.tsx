"use client"

import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet";
import { Service } from "@prisma/client";
import { ptBR } from "date-fns/locale";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { generateDayTimeList } from "../_helpers/hours";



interface ServiceItemProps {
    service: Service;
    isAuthenticated: boolean;
}

const ServiceItem = ({ service, isAuthenticated }: ServiceItemProps) => {


    const [date, setDate] = useState<Date | undefined>(new Date());
    const handleBookingClick = () => {
        if (!isAuthenticated) {
            signIn('google');
        }

    }

    const timeList = useMemo(() => {

        return date ? generateDayTimeList(date) : [];
     }, [date])
    
     const [hour, setHour] = useState<string | undefined>();
    
     const handleDateClick = (date  : Date | undefined ) => {
        setDate(date)
        setHour(undefined)
    }
    
    
    
    const handleHourClick = (time: string) => {
        setHour(time)

    }



    return (

        <Card>
            <CardContent className="p-3">
                <div className="flex gap-4 items-center">
                    <div className="relative min-h-[110px] min-w-[110px] max-w-[110px] max-h-[110px]">
                        <Image className="rounded-lg" src={service.imageUrl} fill style={{ objectFit: 'contain' }} alt="{service.NAME}" />
                    </div>
                    <div className="flex flex-col w-full">
                        <h2 className="font-bold ">{service.NAME}</h2>
                        <p className="text-sm text-gray-400">{service.description}</p>

                        <div className="flex items-center justify-between mt-3">
                            <p className="text-sm text-primary font-bold">
                                {Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                }).format(Number(service.price.toString()))}
                            </p>
                            <Sheet>
                                <SheetTrigger asChild>

                                    <Button variant="secondary" onClick={handleBookingClick}>Reservar</Button>

                                </SheetTrigger>


                                <SheetContent className="p-0">
                                    <SheetHeader className="text-lef px-5 py-6 border-b border-solid border-secondary">
                                        <SheetTitle>
                                            Fazer reserva
                                        </SheetTitle>
                                    </SheetHeader>



                                    <Calendar

                                        mode="single"
                                        selected={date}
                                        onSelect={handleDateClick}
                                        className="w-full mt-6"
                                        disabled={{ before: new Date() }}
                                        locale={ptBR}
                                        classNames={{
                                            weekday: "w-full  text-center font-normal text-muted-foreground capitalize",
                                            day: "w-full  text-center font-normal text-muted-foreground",
                                            nav_button_next: "w-8 h-8",
                                            nav_button_prev: "w-8 h-8",
                                            caption_label: "capitalize"
                                        }}

                                    />


                                    {date && (

                                        <div className=" flex overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden py-6 px-5 border-y border-solid border-secondary">

                                            {timeList.map((time) => (
                                                <Button onClick={() => { handleHourClick(time) }}
                                                    variant={hour === time ? "default" : "outline"}
                                                    className="rounded-full"
                                                    key={time}>
                                                    {time}
                                                </Button>
                                            ))}
                                        </div>


                                    )}

                                </SheetContent>
                            </Sheet>


                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>


    );
}
export default ServiceItem;