import { useState, useEffect } from "react";
import api from '../api'
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


export default function InventoryPage() {
  interface Item {
    _id: number;
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

  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showSubPopup, setShowSubPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get('http://localhost:3000/items');
        setItems(res.data);
      }
      catch (err) {
        console.log(err)
      }
    }
    fetchItems();
  }, [items])

  return (
    <div>
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
        <div className="sm:max-h-[400px] max-h-[70vh] overflow-y-auto">
          <Table>
            <TableHeader className="bg-gray-100 sticky top-0 z-10">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>GST</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    No items found.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item) => (
                  <TableRow
                    key={item._id}
                    onClick={() => {
                      setSelectedItem(item);
                      setShowSubPopup(true);
                    }}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
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
