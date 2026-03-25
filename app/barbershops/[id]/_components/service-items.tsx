"use client"

import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet";
import { Barbershop, Service } from "@prisma/client";
import { ptBR, se } from "date-fns/locale";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { generateDayTimeList } from "../_helpers/hours";
import { format, setHours, setMinutes } from "date-fns";
import { saveBooking } from "../_actions/save-booking";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



interface ServiceItemProps {
    service: Service;
    barbershop: Barbershop;
    isAuthenticated: boolean;
}

const ServiceItem = ({ service, barbershop, isAuthenticated }: ServiceItemProps) => {
    const router = useRouter();
    const {data} = useSession();
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [submitIsLoading, setSubmitIsLoading] = useState(false);
    const [sheetIsOpen, setSheetIsOpen] = useState(false);



    const handleBookingClick = () => {
        if (!isAuthenticated) {
            return signIn('google');
        }
        // Se estiver logado, abre a sheet manualmente
        setSheetIsOpen(true);
    }

    const timeList = useMemo(() => {

        return date ? generateDayTimeList(date) : [];
    }, [date])

    const [hour, setHour] = useState<string | undefined>();

    const handleDateClick = (date: Date | undefined) => {
        setDate(date)
        setHour(undefined)
    }



    const handleHourClick = (time: string) => {
        setHour(time)

    }


    const handleBookingSubmit = async () => {  
        setSubmitIsLoading(true);

        try {
            if (!date || !hour || !data?.user) {
                return;
            }

            const dateHour = Number(hour.split(":")[0])
            const dateMinutes = Number(hour.split(":")[1])
            const newDate = setMinutes(setHours(date,dateHour),dateMinutes)

            await saveBooking({
                serviceId: service.id,
                barbershopId: barbershop.id,
                date: newDate,
                userId: (data.user as any).id,
            })

            setSheetIsOpen(false);
            setDate(undefined);
            setHour(undefined);
        

            toast("Reserva realizada com sucesso!",{
                description: format(newDate, "'Para' dd 'de' MMMM 'às' HH:mm'.'", { locale: ptBR }),
                duration: 8000,
                action: {
                    label: "Visualizar",
                    onClick: () => router.push("/boo")
                }
            })
            setHour(undefined);
            setDate(undefined);
            // toast("Reserva realizada com sucesso!") <-- Você pode adicionar um Toast aqui se quiser
        } catch (error) { 
            console.error("Erro ao realizar reserva:", error)
        } finally {
            setSubmitIsLoading(false);
        }
    }
 

    return (

        <Card>
            <CardContent className="p-3">
                <div className="flex gap-4 items-center">
                    <div className="relative min-h-[110px] min-w-[110px] max-w-[110px] max-h-[110px]">
                        <Image className="rounded-lg" src={service.imageUrl} fill style={{ objectFit: 'contain' }} alt="{service.name}" />
                    </div>
                    <div className="flex flex-col w-full">
                        <h2 className="font-bold ">{service.name}</h2>
                        <p className="text-sm text-gray-400">{service.description}</p>

                        <div className="flex items-center justify-between mt-3">
                            <p className="text-sm text-primary font-bold">
                                {Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                }).format(Number(service.price.toString()))}
                            </p>
                            <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                                <SheetTrigger asChild>

                                    <Button variant="secondary" onClick={handleBookingClick}>Reservar</Button>

                                </SheetTrigger>


                                <SheetContent className="p-0 flex flex-col h-full">
                                    <SheetHeader className="text-left px-5 py-4 border-b border-solid border-secondary">
                                        <SheetTitle>Fazer reserva</SheetTitle>
                                    </SheetHeader>

                                    {/* Área com scroll */}
                                    <div className="flex-1 overflow-y-auto">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={handleDateClick}
                                            className="px-2 w-full"
                                            disabled={{ before: new Date() }}
                                            locale={ptBR}
                                            classNames={{
                                                month: "flex w-full flex-col",
                                                table: "w-full border-collapse space-y-1",
                                                head_row: "flex justify-between w-full",
                                                row: "flex justify-between w-full mt-2",
                                                cell: "text-center w-full text-sm p-0 relative [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                                day: "w-full h-9 p-0 font-normal aria-selected:opacity-100",
                                                day_today: "bg-transparent text-white font-normal border border-primary rounded-md", // 👈 aqui
                                                caption: "flex justify-center pt-0 relative items-center w-full",
                                                caption_label: "text-sm font-medium capitalize",
                                            }}
                                        />

                                        {date && (
                                            <div className="flex overflow-x-auto flex-nowrap px-3 gap-3 [&::-webkit-scrollbar]:hidden py-6 border-t border-solid border-secondary">
                                                {timeList.map((time) => (
                                                    <Button
                                                        onClick={() => handleHourClick(time)}
                                                        variant={hour === time ? "default" : "outline"}
                                                        className="rounded-full shrink-0"
                                                        key={time}
                                                    >
                                                        {time}
                                                    </Button>
                                                ))}
                                            </div>
                                        )}

                                        <div className="py-6 px-5 border-t border-solid border-secondary">
                                            <Card>
                                                <CardContent className="p-3 gap-3 flex flex-col">
                                                    <div className="flex justify-between">
                                                        <h2 className="font-bold">{service.name}</h2>
                                                        <h3 className="font-bold">
                                                            {Intl.NumberFormat("pt-BR", {
                                                                style: "currency",
                                                                currency: "BRL",
                                                            }).format(Number(service.price.toString()))}
                                                        </h3>
                                                    </div>

                                                    {date && (
                                                        <div className="flex justify-between">
                                                            <h3 className="text-gray-400 text-sm">Data</h3>
                                                            <h4 className="text-sm">{format(date, "dd 'de' MMMM", { locale: ptBR })}</h4>
                                                        </div>
                                                    )}

                                                    {hour && (
                                                        <div className="flex justify-between">
                                                            <h3 className="text-gray-400 text-sm">Horário</h3>
                                                            <h4 className="text-sm">{hour}</h4>
                                                        </div>
                                                    )}

                                                    <div className="flex justify-between">
                                                        <h3 className="text-gray-400 text-sm">Barbearia</h3>
                                                        <h4 className="text-sm">{barbershop.name}</h4>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </div>


                                    <SheetFooter className="p-5 border-t border-solid border-secondary">
                                        <Button onClick={handleBookingSubmit} className="w-full" disabled={!date || !hour || submitIsLoading}>
                                            Confirmar reserva
                                           {submitIsLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                                        </Button>
                                    </SheetFooter>
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