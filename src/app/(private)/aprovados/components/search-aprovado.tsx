'use client';

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from 'use-debounce';

interface Props {
    fetchAprovados: (params: URLSearchParams) => void
}
export default function SearchAprovado({ fetchAprovados}: Props){
    const [queryParams, setQueryParams] = useState<URLSearchParams>(new URLSearchParams())
    const isFirstRender = useRef(true);
    const [edicoes, setEdicoes] = useState<string[]>([])

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
        async function fetchEdicoes() {
            const response = await fetch("/api/edicoes");
            const { data } = await response.json();
            setEdicoes(data)
        }
        fetchEdicoes()
    },[])

    useEffect(() => {
        if(isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        fetchAprovados(queryParams)
    }, [queryParams])

    return (
        <>
            <Input placeholder="Digite o nome" className="max-w-[400px]" onChange={(event) => handleSearch(event.target.value)}/>


            <Select onValueChange={(value) => {
                if(value === "0"){ 
                    const params = new URLSearchParams(queryParams)
                    params.delete("edicao")
                    setQueryParams(params)
                }else {
                    const params = new URLSearchParams(queryParams)
                    params.set("edicao", value)
                    setQueryParams(params)
                }
            }}>
                
            
            <SelectTrigger className="max-w-[200px]">
                    <SelectValue placeholder="Selecione a edição" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="0" key="0">
                            Nenhum
                        </SelectItem>
                        {edicoes.map((edicao) => (
                            <SelectItem key={edicao} value={edicao.toString()}>
                                {edicao}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}