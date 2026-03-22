"use client"

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";;
import SideMenu from "./side-menu";
import { MenuIcon } from "lucide-react";


const Header = () => {

    return (
        <Card>
            <CardContent className="p-5 flex items-center justify-between flex-row">
                <Image src="/logo.png" alt="Logo" height={18} width={120} />
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <MenuIcon size={16} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="p-0">
                    <SideMenu />
                    </SheetContent>
                </Sheet>


            </CardContent>
        </Card>
    );
}

export default Header;