import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Image from "next/image"; // Adicione esta linha

const Header = () => {
    return (
        <Card>
                <CardContent className="p-5 flex justify items-center justify-between flex-row ">
                <Image src="/logo.png" alt="Logo" height={18} width={120} />
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MenuIcon size={16} />
                </Button>

                </CardContent>
        </Card>
    );
}

export default Header;