"use client"

import { addProduct, updateProduct } from "@/app/admin/_actions/products"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/lib/formatters"
import { Product } from "@prisma/client"
import Image from "next/image"
import { useState } from "react"
import { useFormState, useFormStatus } from "react-dom"

export function ProductForm({product}: {product? :Product | null}){
    const [error, action] = useFormState(product == null ? addProduct : updateProduct.bind(null, product.id),{})
    const [priceInCents, setPriceInCents] = useState<number|undefined>(product?.priceInCents)

    return (
        <>
        <form action={action} className="space-y-8">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input name="name" id="name" type="text" required defaultValue={product?.name}></Input>
                {error.name && <div className="text-destructive">{error.name}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="priceInCents">Price In Cents</Label>
                <Input name="priceInCents" id="priceInCents" type="number" required value={priceInCents} onChange={ e=>setPriceInCents(Number(e.target.value))}></Input>
                <div className="textMutedForground">
                    {formatCurrency((priceInCents||0)/100)}
                </div>
                {error.priceInCents && <div className="text-destructive">{error.priceInCents}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea name="description" id="description" required defaultValue={product?.description}></Textarea>
                {error.description && <div className="text-destructive">{error.description}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="file">File</Label>
                <Input name="file" id="file" type="file" required={product==null}></Input>
                { product != null && <div className="text-muted-forground">{product.filePath}</div>}
                {error.file && <div className="text-destructive">{error.file}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input name="image" id="image" type="file" required={product==null}></Input>
                { product != null && (<Image src={product.imagePath} width="300" height="300" alt="Product Image"/> )}
                {error.image && <div className="text-destructive">{error.image}</div>}
            </div>
            <SubmitButton></SubmitButton>
        </form>
        </>
    )
}

function SubmitButton(){
    const { pending } = useFormStatus()
    return (
        <Button type="submit" disabled={pending}>
            {pending? "Saving..." : "Save"}
        </Button>
    )
}