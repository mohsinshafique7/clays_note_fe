"use client"
import { cn } from "@/lib/utils";
import { CreditCard, Home, Settings } from "lucide-react"
import Link from "next/link";
import { usePathname } from "next/navigation"

const navItems=[
    {name:'Home', href:'/dashboard',icon:Home},
    {name:'Settings', href:'/dashboard/settings',icon:Settings},
    {name:'Billing', href:'/dashboard/billing',icon:CreditCard}
]
export default function DashboardNav(){
    const pathName = usePathname();

    return <nav className="grid items-start gap-2">
        {
            navItems.map((items,index)=>(
                <Link key={index} href={items.href}>
                    <span className={cn('group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',pathName===items.href? 'bg-accent':'text-primary')}>
                <items.icon className="mr-2 h-4 w-4 text-primary"/>
                <span>{items.name}</span>
                    </span>
                </Link>
            ))
        }

    </nav>
}