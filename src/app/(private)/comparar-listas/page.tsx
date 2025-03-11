"use client";

import { useState } from "react";
import { getDocument} from "pdfjs-dist";
import { Input } from "@/components/ui/input";


export default function CompararListasPage() {
    const [pdfText, setPdfText] = useState<string>("");

    async function extractTextFromPDF(pdfData: Uint8Array) {
        const pdf = await getDocument({ data: pdfData }).promise;
        let text = "";

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const pageText = content.items.map(item => item).join(" ");
            text += pageText + "\n";
        }

        return text;
    }

    function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async function () {
            if (reader.result instanceof ArrayBuffer) {
                const text = await extractTextFromPDF(new Uint8Array(reader.result));
                setPdfText(text);
            }
        };
        reader.readAsArrayBuffer(file);
    }

    return (
        <div>
            <Input type="file" accept="application/pdf" onChange={handleFile} />
            <pre>{pdfText}</pre> {/* Exibe o texto extraído do PDF */}
        </div>
    );
}