import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import db from "../db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { wait } from "@/lib/utils";

async function getSalesData(){
    const data = await db.order.aggregate({
        _sum: {pricePaidInCents: true},
        _count: true
    })

    // test loading pages
    // await wait(1000)

    return {
        amount: (data._sum.pricePaidInCents || 0) / 100,
        numberOfSales: data._count
    }
}

async function getUsersData(){
    const [userCount, orderData] = await Promise.all([
        db.user.count(),
        db.order.aggregate({
            _sum: {pricePaidInCents: true}
        })
    ])

    return {
        userCount,
        averageValuePerUser: userCount === 0 ? 0 : (orderData._sum.pricePaidInCents || 0) / userCount / 100
    }
}

async function getProductsData(){
    const [activeCount, inactiveCount] = await Promise.all([
        db.product.count({ where: { isAvailableForPurchase: true } }),
        db.product.count({ where: { isAvailableForPurchase: false } }),
    ])

    return {
        activeCount,
        inactiveCount
    }
}

export default async function AdminDashboard(){
    const [sales, users, products] =await Promise.all([
        getSalesData(),
        getUsersData(),
        getProductsData()
    ])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DashboardCard title="Sales" subtite={`${formatNumber(sales.numberOfSales)} Orders`} body={formatCurrency(sales.amount)}></DashboardCard>
            <DashboardCard title="Customers" subtite={`${formatCurrency(users.averageValuePerUser)} Avrage Value`} body={formatNumber(users.userCount)}></DashboardCard>
            <DashboardCard title="Active Products" subtite={`${formatNumber(products.inactiveCount)} Inactive`} body={formatNumber(products.activeCount)}></DashboardCard>
        </div>
    )
}

type DashboardCardProbs = {
    title: String
    subtite: String
    body: String
}

function DashboardCard({title, subtite, body}: DashboardCardProbs){
    return(
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subtite}</CardDescription>
            </CardHeader>
            <CardContent>
                {body}
            </CardContent>
        </Card>
    )
}