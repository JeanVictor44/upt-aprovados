'use client';

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Polo } from "@/types/polo"
import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from 'use-debounce';

interface Props {
    polos: Polo[],
    fetchUsuarios: (params: URLSearchParams) => void
}
export default function SearchUsuario({ polos,fetchUsuarios }: Props){
    const [queryParams, setQueryParams] = useState<URLSearchParams>(new URLSearchParams())
    const isFirstRender = useRef(true);

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(queryParams)

        if(term){
            params.set("query", term)
        }else {
            params.delete("query")
        }
        setQueryParams(params)

    }, 500);

    useEffect(() => {
        if(isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        fetchUsuarios(queryParams)
    }, [queryParams])

    return (
        <>
            <Input placeholder="Digite o nome ou e-mail" className="max-w-[400px]" onChange={(event) => handleSearch(event.target.value)}/>

            <Select onValueChange={(value) => {
                if(value === "0"){ 
                    const params = new URLSearchParams(queryParams)
                    params.delete("polo")
                    setQueryParams(params)
                }else {
                    const params = new URLSearchParams(queryParams)
                    params.set("polo", value)
                    setQueryParams(params)
                }
            }}>
                <SelectTrigger className="max-w-[200px]">
                    <SelectValue placeholder="Selecione o polo" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="0" key="0">
                            Nenhum
                        </SelectItem>
                        {polos.map((polo) => (
                            <SelectItem key={polo.id} value={polo.id.toString()}>
                                {polo.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}