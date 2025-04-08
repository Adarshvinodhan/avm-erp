import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ItemFormPopup from "../components/forms/ItemForm";

const initialItems = [
  { id: 1, name: "Screwdriver" },
  { id: 2, name: "Hammer" },
  { id: 3, name: "Wrench" },
  { id: 4, name: "Drill Machine" },
  { id: 5, name: "Measuring Tape" },
];

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  const filteredItems = initialItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <p className="text-lg font-medium">{item.name}</p>
            </CardContent>
          </Card>
        ))}
        {filteredItems.length === 0 && (
          <p className="text-gray-500 col-span-full">No items found.</p>
        )}
      </div>

      <ItemFormPopup open={formOpen} setOpen={setFormOpen} />
    </div>
  );
}
