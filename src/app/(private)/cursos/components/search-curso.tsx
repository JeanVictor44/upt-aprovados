'use client';

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Domain } from "@/types/domain";
import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from 'use-debounce';

interface Props {
    tiposCurso: Domain[],
    fetchCursos: (params: URLSearchParams) => void
}
export default function SearchCurso({ tiposCurso,fetchCursos }: Props){
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

        fetchCursos(queryParams)
    }, [queryParams])

    return (
        <>
            <Input placeholder="Digite o nome do curso" className="max-w-[400px]" onChange={(event) => handleSearch(event.target.value)}/>

            <Select onValueChange={(value) => {
                if(value === "0"){ 
                    const params = new URLSearchParams(queryParams)
                    params.delete("tipo_curso_id")
                    setQueryParams(params)
                }else {
                    const params = new URLSearchParams(queryParams)
                    params.set("tipo_curso_id", value)
                    setQueryParams(params)
                }
            }}>
                <SelectTrigger className="max-w-[400px]">
                    <SelectValue placeholder="Selecione a modalidade da graduação" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="0" key="0">
                            Nenhum
                        </SelectItem>
                        {tiposCurso.map((tipoCurso) => (
                            <SelectItem key={tipoCurso.id} value={tipoCurso.id.toString()}>
                                {tipoCurso.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}