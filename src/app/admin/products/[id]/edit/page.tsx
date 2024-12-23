import db from "@/app/db/db"
import { PageHeader } from "../../../_components/pageHeader";
import { ProductForm } from "../../_components/productForm";

export default async function EditProductPage({params: {id}} : { params: {id:string }}){
    const product = await db.product.findUnique({ where: {id}})
    return (
        <>
            <PageHeader>Edit product</PageHeader>
            <ProductForm product = {product}></ProductForm>
        </>
    )
}