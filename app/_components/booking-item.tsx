import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


const BookingItem = () => {
    return (

        
        <Card>
            <CardContent className="p-5 flex justify-between py-0 ">
                <div className="flex flex-col gap-2 py-5">
                    <Badge className="bg-[#221C3D] text-primary hover:bg-[#221C3D]/80 w-fit">Confirmado</Badge>
                    <h2 className="font-bold mb-0.5">Corte de Cabelo</h2>



                    <div className="flex items-center gap-3">

                        <Avatar className="h-6 w-6">
                            <AvatarImage src="https://utfs.io/f/0522fdaf-0357-4213-8f52-1d83c3dcb6cd-18e.png" />

                            <AvatarFallback>A</AvatarFallback>




                        </Avatar>

                        <h3 className="text-sm">Vintage Barber</h3>
                    </div>
                </div>



                <div className="flex flex-col items-center justify-center border-l border-solid border-secondary px-3">

                    <p className="text-sm">Fevereiro</p>
                    <p className="text-2xl">06</p>
                    <p className="text-sm">09:45</p>

                </div>
            </CardContent>
        </Card>

    );
}

export default BookingItem;