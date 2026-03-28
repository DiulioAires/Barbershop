"use client"

import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Prisma } from "@prisma/client";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import { Button } from "./ui/button";
import { cancelBooking } from "../_actions/cancel-booking";
import { toast } from "sonner";
import { use, useState } from "react";
import { Loader2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";


interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            service: true;
            barbershop: true;
        }

    }>

}


const BookingItem = ({ booking }: BookingItemProps) => {
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    const isBookingConfirmed = isFuture(booking.date);

    const handleCancelClick = async () => {
        setIsDeleteLoading(true);
        try {
            await cancelBooking(booking.id);
            toast.success("Reserva cancelada com sucesso!");
        } catch (error) {
            console.log(error);
        } finally {
            setIsDeleteLoading(false);
        }
    }



    return (


        <Sheet>

            <SheetTrigger asChild>
                <Card className="min-w-full">
                    <CardContent className="flex py-0 px-0 ">
                        <div className="flex flex-col gap-2 py-5 flex-3 pl-5">
                            <Badge className={isBookingConfirmed ? "bg-[#221C3D] text-primary hover:bg-[#221C3D]/80 w-fit" : "bg-secondary text-gray-400 w-fit"}>
                                {isFuture(booking.date) ? "Confirmado" : "Finalizado"}
                            </Badge>
                            <h2 className="font-bold mb-0.5">{booking.service.name}</h2>



                            <div className="flex items-center gap-3">

                                <Avatar className="h-6 w-6">
                                    <AvatarImage src={booking.barbershop.imageUrl} />

                                    <AvatarFallback>A</AvatarFallback>




                                </Avatar>

                                <h3 className="text-sm">{booking.barbershop.name}</h3>
                            </div>
                        </div>



                        <div className="flex flex-col items-center justify-center flex-1 border-l border-solid border-secondary">
                            <p className="text-sm capitalize">
                                {format(booking.date, "MMMM", {
                                    locale: ptBR,
                                })}
                            </p>
                            <p className="text-2xl">{format(booking.date, "dd")}</p>
                            <p className="text-sm">{format(booking.date, "HH:mm")}</p>
                        </div>
                    </CardContent>
                </Card>

            </SheetTrigger>

            <SheetContent className="px-0 ">
                <SheetHeader className=" px-5 text-left pb-6 border-b border-solid border-secondary">
                    <SheetTitle>
                        Informações da Reserva
                    </SheetTitle>
                </SheetHeader>

                <div className="px-5">
                    <div className="relative h-[180px] w-full mt-6">
                        <Image src="/barbershop-map.png" fill style={{

                        }}
                            alt={booking.barbershop.name}
                        />

                        <div className="w-full absolute bottom-4  left-0 px-5">
                            <Card className="mx-5 ">
                                <CardContent className="p-3 flex gap-2">
                                    <Avatar className="w-[40px] h-[40px]">
                                        <AvatarImage src={booking.barbershop.imageUrl} />
                                    </Avatar>
                                    <div>
                                        <h2 className="font-bold">{booking.barbershop.name}</h2>
                                        <h3 className="text-xs overflow-hidden text-nowrap text-ellipsis">{booking.barbershop.address}</h3>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>


                    </div>
                    <Badge className={isBookingConfirmed ? "bg-[#221C3D] text-primary hover:bg-[#221C3D]/80 w-fit  my-3" : "bg-secondary text-gray-400 w-fit"}>
                        {isFuture(booking.date) ? "Confirmado" : "Finalizado"}
                    </Badge>

                    <Card>
                        <CardContent className="p-3 gap-3 flex flex-col">
                            <div className="flex justify-between">
                                <h2 className="font-bold">{booking.service.name}</h2>
                                <h3 className="font-bold">
                                    {Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    }).format(Number(booking.service.price.toString()))}
                                </h3>
                            </div>


                            <div className="flex justify-between">
                                <h3 className="text-gray-400 text-sm">Data</h3>
                                <h4 className="text-sm">{format(booking.date, "dd 'de' MMMM", { locale: ptBR })}</h4>
                            </div>



                            <div className="flex justify-between">
                                <h3 className="text-gray-400 text-sm">Horário</h3>
                                <h4 className="text-sm">{format(booking.date, "HH:mm")}</h4>
                            </div>


                            <div className="flex justify-between">
                                <h3 className="text-gray-400 text-sm">Barbearia</h3>
                                <h4 className="text-sm">{booking.barbershop.name}</h4>
                            </div>
                        </CardContent>
                    </Card>



                    <SheetFooter className="grid grid-cols-2 gap-3 mt-6">
                        <SheetClose asChild>
                            <Button variant="secondary" className="w-full p-5 ">
                                Voltar
                            </Button >
                        </SheetClose>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>

                                <Button  disabled={!isBookingConfirmed || isDeleteLoading} variant="destructive"
                                    className="w-full p-5">
                                    Cancelar Reserva
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="w-[90%]">
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Cancelar Reserva</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Tem certeza que deseja cancelar sua reserva?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="flex-row grid grid-cols-2 gap-3">
                                    <AlertDialogCancel className="w-full mt-0">Cancelar</AlertDialogCancel>
                                    <AlertDialogAction  disabled={!isBookingConfirmed || isDeleteLoading} className="w-full on" onClick={handleCancelClick}>
                                        {isDeleteLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}

                                        Confirmar
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>








                    </SheetFooter>

                </div>


            </SheetContent>


        </Sheet>
    );
}

export default BookingItem;