import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ItemFormPopup from "../components/forms/ItemForm";
import SubcategoryTablePopup from "./ItemPage"; // Make sure this file is created as per earlier instructions

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
    id:13,
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
    id:14,
    name: "Measuring Tape",
    brand: "Freemans",
    price: 150,
    gst: "5%",
    subcategories: [{ color: "Yellow", quantity: 50, model: "F5M", size: "5m", price: 150 }],
  },
  {
    id:15,
    name: "Pliers",
    brand: "Taparia",
    price: 220,
    gst: "12%",
    subcategories: [{ color: "Red", quantity: 40, model: "P1620", size: '6"', price: 220 }],
  },
  {
    id:16,
    name: "Adjustable Spanner",
    brand: "Taparia",
    price: 320,
    gst: "12%",
    subcategories: [{ color: "Metallic", quantity: 35, model: "1170-8", size: '8"', price: 320 }],
  },
  {
    id:17,
    name: "Chisel",
    brand: "Stanley",
    price: 180,
    gst: "12%",
    subcategories: [{ color: "Yellow", quantity: 60, model: "SC24", size: '1"', price: 180 }],
  },
  {
    id:18,
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
    <div className="max-w-6xl mx-auto p-4">
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

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b">#</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Brand</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">GST</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr
                key={item.id}
                onClick={() => {
                  setSelectedItem(item);
                  setShowSubPopup(true);
                }}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-4 py-2 border-b">{item.id}</td>
                <td className="px-4 py-2 border-b">{item.name}</td>
                <td className="px-4 py-2 border-b">{item.brand}</td>
                <td className="px-4 py-2 border-b">₹{item.price}</td>
                <td className="px-4 py-2 border-b">{item.gst}</td>
              </tr>
            ))}
            {filteredItems.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-2 text-center text-gray-500">
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Subcategory Table as Popup */}
      {selectedItem && (
        <SubcategoryTablePopup
          open={showSubPopup}
          onClose={() => setShowSubPopup(false)}
          itemName={selectedItem.name}
          subcategories={selectedItem.subcategories as { id: number; model: string; color: string; size: string; price: number; quantity: number; }[]}
        />
      )}

      <ItemFormPopup open={formOpen} setOpen={setFormOpen} />
    </div>
  );
}
