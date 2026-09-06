import { MapPin, Phone, User, Mail, UserCircle } from "lucide-react";
import type { OrderByIdAdmin } from "@/features/orders/types";

export function ViewOrderCustomerShipping({ order }: { order: OrderByIdAdmin }) {
  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="border-b bg-muted/30 px-4 py-3">
        <h2 className="text-sm font-semibold">Customer & Shipping</h2>
      </div>

      <div className="grid divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        {/* Customer Information */}
        <div className="p-5 flex flex-col h-full">
          <div className="mb-4 flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-xs font-bold  tracking-wider text-muted-foreground">
              Customer Contact
            </h3>
          </div>

          <div className="space-y-4 flex-1">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Email Address</p>
              <a
                href={`mailto:${order.email}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-800 hover:text-black hover:underline break-all"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" />
                {order.email}
              </a>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Phone Number</p>
              <a
                href={`tel:${order.phoneNumber}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-800 hover:text-black hover:underline"
              >
                <Phone className="h-3.5 w-3.5 shrink-0" />
                {order.phoneNumber}
              </a>
            </div>
          </div>

          {order.users && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center gap-2 mb-2">
                <UserCircle className="h-4 w-4 text-gray-600" />
                <h3 className="text-xs font-bold  tracking-wider text-gray-700">
                  Registered Account
                </h3>
              </div>
              <p className="text-sm font-semibold text-gray-900">{order.users.name}</p>
              <a
                href={`mailto:${order.users.email}`}
                className="text-xs text-blue-600 hover:underline inline-block mt-0.5"
              >
                {order.users.email}
              </a>
            </div>
          )}
        </div>

        {/* Shipping Information */}
        <div className="p-5">
          <div className="mb-4 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-xs font-bold  tracking-wider text-muted-foreground">
              Shipping Details
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-0.5">City</p>
              <p className="text-sm font-semibold text-gray-900">{order.city}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground mb-0.5">Street Address</p>
              <p className="text-sm font-medium text-gray-900">
                {order.streetAddress}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground mb-0.5">Building Number</p>
              <p className="text-sm font-medium text-gray-900">
                {order.buildingNumber}
              </p>
            </div>

            {order.additionalNote && (
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1.5">Additional Note</p>
                <div className="text-sm font-medium text-gray-800 bg-amber-50/80 p-3 rounded-md border border-amber-100">
                  {order.additionalNote}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
