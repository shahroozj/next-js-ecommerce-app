import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/pageHeader";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "@/app/db/db";

export default function AdminProductPage(){
    return (<>
        <div className="flex justify-between items-center">
        <PageHeader>Products</PageHeader>
        <Button asChild>
            <Link href="/admin/products/new">              
                Add Product
            </Link>
        </Button>
        </div>
        <ProductsTable />
        </>
    )
}

async function ProductsTable(){
    const products = await db.product.findMany({
        select: {
            id: true,
            name: true,
            priceInCents: true,
            isAvalaileForPurchase: true,
            _count: { select: { orders: true } }
        },
        orderBy: {
            name: "asc"
        }
    })

    if (products.length === 0) return <p>No products found</p>

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-0">
                        <span className="sr-only">Available For Purchase</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    products.map(product => (
                        <TableRow key={product.id}>
                            <TableCell className="border-0 text-sm whitespace-nowrap">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={product.isAvalaileForPurchase}
                                        disabled
                                    />
                                    <span className="ml-2">{product.name}</span>
                                </div>
                            </TableCell>
                            <TableCell className="border-0 text-sm whitespace-nowrap">${product.priceInCents / 100}</TableCell>
                            <TableCell className="border-0 text-sm whitespace-nowrap"></TableCell>
                        </TableRow>))    
                }
            </TableBody>
        </Table>
    )
}