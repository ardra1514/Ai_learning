import fs from "fs/promises";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export const extractTextFromPDF = async (filepath) => {
    try {

        const data = new Uint8Array(
            await fs.readFile(filepath)
        );

        const pdf = await pdfjsLib.getDocument({ data }).promise;

        let text = "";

        for (let i = 1; i <= pdf.numPages; i++) {

            const page = await pdf.getPage(i);

            const content = await page.getTextContent();

            const strings = content.items.map(
                (item) => item.str
            );

            text += strings.join(" ") + "\n";
        }

        return {
            text,
            numPages: pdf.numPages
        };

    } catch (error) {

        console.error("PDF parsing error", error);

        throw new Error(
            "Failed to extract text from PDF"
        );
    }
};