'use client';

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Polo } from "@/types/polo"

interface Props {
    polos: Polo[]
}
export default function SearchGestor({ polos }: Props){
    return (
        <>
            <Input placeholder="Digite o nome ou e-mail" className="max-w-[800px]" />
            <Select>
                <SelectTrigger className="max-w-[200px]">
                    <SelectValue placeholder="Selecione o polo" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Polos</SelectLabel>
                        {polos.map((polo) => (
                            <SelectItem key={polo.id} value={polo.name}>
                                {polo.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}