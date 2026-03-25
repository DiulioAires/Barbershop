"use server"

import { db } from "@/app/lib/prisma";

interface SaveBookingParams {
    barbershopId: string;
    serviceId: string;
    userId: string;
    date: Date;
}

export const saveBooking = async (params: SaveBookingParams) => { // 👈 "params" não "SaveBookingParams"
    await db.booking.create({
        data: { 
            serviceId: params.serviceId,
            userId: params.userId,
            date: params.date,
            barbershopId: params.barbershopId, // 👈 "Id" maiúsculo
        }
    })
}