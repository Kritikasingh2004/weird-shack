import { Button } from "@/components/ui/button";
import { BadgeIndianRupee, Package, Users } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-grid border-t-4 border-black">
      <div className=" mx-auto flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <aside className="w-full md:w-64 border-r-4 border-black bg-main p-6 space-y-4">
          <h2 className="font-heading text-2xl uppercase italic underline">
            Admin Page
          </h2>
          <nav className="flex flex-col gap-2">
            <Link href="/admin">
              <Button className="w-[200px]">
                <Package /> Inventory
              </Button>
            </Link>
            <Link href="/admin/transactions">
              <Button className="w-[200px]">
                <BadgeIndianRupee /> Transactions
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button className="w-[200px]">
                <Users /> Users
              </Button>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-background">{children}</main>
      </div>
    </div>
  );
}
