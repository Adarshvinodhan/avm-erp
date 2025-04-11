import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ItemFormPopup from "../components/forms/ItemForm";
import SubcategoryTablePopup from "./ItemDetailPopup";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const initialItems = [
  {
    id: 1,
    name: "Cordless Drill",
    brand: "Bosch",
    price: 4500,
    gst: "18%",
    subcategories: [{ color: "Blue", quantity: 10, model: "GSR120", size: "Standard", price: 4500 }],
  },
  {
    id: 2,
    name: "Hammer",
    brand: "Stanley",
    price: 600,
    gst: "12%",
    subcategories: [{ color: "Black", quantity: 25, model: "STHT", size: "M", price: 600 }],
  },
  {
    id: 3,
    name: "Screwdriver Set",
    brand: "Taparia",
    price: 350,
    gst: "12%",
    subcategories: [{ color: "Green", quantity: 40, model: "812", size: "6-in-1", price: 350 }],
  },
  {
    id: 4,
    name: "Wrench",
    brand: "JK Tools",
    price: 280,
    gst: "12%",
    subcategories: [
      { color: "Silver", quantity: 30, model: "W12", size: "12mm", price: 280 },
      { color: "Silver", quantity: 20, model: "W14", size: "14mm", price: 300 },
    ],
  },
  {
    id: 5,
    name: "Measuring Tape",
    brand: "Freemans",
    price: 150,
    gst: "5%",
    subcategories: [{ color: "Yellow", quantity: 50, model: "F5M", size: "5m", price: 150 }],
  },
  {
    id: 6,
    name: "Pliers",
    brand: "Taparia",
    price: 220,
    gst: "12%",
    subcategories: [{ color: "Red", quantity: 40, model: "P1620", size: '6"', price: 220 }],
  },
  {
    id: 7,
    name: "Adjustable Spanner",
    brand: "Taparia",
    price: 320,
    gst: "12%",
    subcategories: [{ color: "Metallic", quantity: 35, model: "1170-8", size: '8"', price: 320 }],
  },
  {
    id: 8,
    name: "Chisel",
    brand: "Stanley",
    price: 180,
    gst: "12%",
    subcategories: [{ color: "Yellow", quantity: 60, model: "SC24", size: '1"', price: 180 }],
  },
  {
    id: 9,
    name: "Toolbox",
    brand: "Bosch",
    price: 1200,
    gst: "18%",
    subcategories: [{ color: "Blue", quantity: 15, model: "TBX24", size: "Large", price: 1200 }],
  },
  {
    id: 10,
    name: "Allen Key Set",
    brand: "Taparia",
    price: 260,
    gst: "12%",
    subcategories: [{ color: "Black", quantity: 45, model: "AK20", size: "Set of 10", price: 260 }],
  },
  {
    id: 11,
    name: "Hammer",
    brand: "Stanley",
    price: 600,
    gst: "12%",
    subcategories: [{ color: "Black", quantity: 25, model: "STHT", size: "M", price: 600 }],
  },
  {
    id: 12,
    name: "Screwdriver Set",
    brand: "Taparia",
    price: 350,
    gst: "12%",
    subcategories: [{ color: "Green", quantity: 40, model: "812", size: "6-in-1", price: 350 }],
  },
  {
    id: 13,
    name: "Wrench",
    brand: "JK Tools",
    price: 280,
    gst: "12%",
    subcategories: [
      { color: "Silver", quantity: 30, model: "W12", size: "12mm", price: 280 },
      { color: "Silver", quantity: 20, model: "W14", size: "14mm", price: 300 },
    ],
  },
  {
    id: 14,
    name: "Measuring Tape",
    brand: "Freemans",
    price: 150,
    gst: "5%",
    subcategories: [{ color: "Yellow", quantity: 50, model: "F5M", size: "5m", price: 150 }],
  },
  {
    id: 15,
    name: "Pliers",
    brand: "Taparia",
    price: 220,
    gst: "12%",
    subcategories: [{ color: "Red", quantity: 40, model: "P1620", size: '6"', price: 220 }],
  },
  {
    id: 16,
    name: "Adjustable Spanner",
    brand: "Taparia",
    price: 320,
    gst: "12%",
    subcategories: [{ color: "Metallic", quantity: 35, model: "1170-8", size: '8"', price: 320 }],
  },
  {
    id: 17,
    name: "Chisel",
    brand: "Stanley",
    price: 180,
    gst: "12%",
    subcategories: [{ color: "Yellow", quantity: 60, model: "SC24", size: '1"', price: 180 }],
  },
  {
    id: 18,
    name: "Toolbox",
    brand: "Bosch",
    price: 1200,
    gst: "18%",
    subcategories: [{ color: "Blue", quantity: 15, model: "TBX24", size: "Large", price: 1200 }],
  },
];

export default function InventoryPage() {
  interface Item {
    id: number;
    name: string;
    brand: string;
    price: number;
    gst: string;
    subcategories: {
      color: string;
      quantity: number;
      model: string;
      size: string;
      price: number;
    }[];
  }

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showSubPopup, setShowSubPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  const filteredItems = initialItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>

      <div className="flex items-center gap-4 mb-4">
        <Input
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button
          className="flex items-center gap-2 font-bold"
          onClick={() => setFormOpen(true)}
        >
          <Plus className="w-4 h-4" /> Add Item
        </Button>
      </div>

      <div className="border border-gray-200 rounded overflow-hidden">
        <div className="overflow-y-auto">
          <Table>
            <TableHeader className="bg-gray-100 sticky top-0 z-10">
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>GST</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    No items found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item) => (
                  <TableRow
                    key={item.id}
                    onClick={() => {
                      setSelectedItem(item);
                      setShowSubPopup(true);
                    }}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.brand}</TableCell>
                    <TableCell>₹{item.price}</TableCell>
                    <TableCell>{item.gst}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Subcategory Table as Popup */}
      {selectedItem && (
        <SubcategoryTablePopup
          open={showSubPopup}
          onClose={() => setShowSubPopup(false)}
          itemName={selectedItem.name}
          subcategories={selectedItem.subcategories.map((sub, idx) => ({
            id: idx + 1,
            ...sub,
          }))}
        />
      )}

      <ItemFormPopup open={formOpen} setOpen={setFormOpen} />
    </div>
  );
}
