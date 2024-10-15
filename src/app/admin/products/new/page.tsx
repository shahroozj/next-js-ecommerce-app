import { PageHeader } from "../../_components/pageHeader";
import { ProductForm } from "../_components/productForm";

export default function NewProduct(){
    return (
        <>
            <PageHeader>Create a new product</PageHeader>
            <ProductForm></ProductForm>
        </>
    )
}