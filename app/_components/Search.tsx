"use client";


import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { SearchIcon } from "lucide-react"

const Search = () => {


    return ( 
        <div className="flex justify-center gap-2 items-center">

            <Input placeholder="Busque por uma barbearia"/>

            <Button variant="default" className="p-4"> 
                <SearchIcon size={18} />
            </Button>

        </div>

    );



}

export default Search;