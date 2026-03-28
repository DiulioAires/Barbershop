"use client";

import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { SearchIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  search: z.string().trim().min(1, "Campo Obrigatório"),
});


interface SearchProps {
    defaultValues?: z.infer<typeof formSchema>;
}

const Search = ({defaultValues}: SearchProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: defaultValues?.search || "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`/barbershops?search=${data.search}`);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-center gap-2 items-center w-full">
        <Input placeholder="Busque por uma barbearia" {...form.register("search")} />
        <Button variant="default" type="submit"> 
          <SearchIcon size={18} />
        </Button>
      </form>
      {form.formState.errors.search && (
        <span className="text-red-500 text-xs">{form.formState.errors.search.message}</span>
      )}
    </div>
  );
};

export default Search;