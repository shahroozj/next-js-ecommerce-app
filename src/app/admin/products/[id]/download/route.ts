import db from "@/app/db/db";
import { notFound } from "next/navigation";
import { NextRequest } from "next/server";
import fs from "fs/promises";

export async function GET(req: NextRequest, {params: {id}}: {params: {id: string}}){
    const product = await db.product.findUnique({
        where: { id },
        select:{filePath: true, name:true}
    });

    if (product==null)  return notFound();

    const {size} = await fs.stat(product.filePath);
    const file = await fs.readFile(product.filePath);
    const extension = product.filePath.split('.').pop();

    return new Response(file, {
        headers: {
            'Content-Type': `application/${extension}`,
            'Content-Disposition': `attachment; filename="${product.name}.${extension}"`,
            'Content-Length': size.toString()
        }
    });

}