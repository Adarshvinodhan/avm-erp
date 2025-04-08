import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Type definitions
interface SubCategory {
  color: string;
  quantity: string; // keep as string for input, parse later
  model: string;
  size: string;
}

interface FormData {
  name: string;
  price: string; // keep as string for input, parse later
  description: string;
  image: string;
  subcategories: SubCategory[];
}

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ItemFormPopup: React.FC<Props> = ({ open, setOpen }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: "",
    description: "",
    image: "",
    subcategories: [],
  });

  const [subCategory, setSubCategory] = useState<SubCategory>({
    color: "",
    quantity: "",
    model: "",
    size: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubCategory({ ...subCategory, [e.target.name]: e.target.value });
  };

  const handleAddSubCategory = () => {
    setFormData({
      ...formData,
      subcategories: [...formData.subcategories, subCategory],
    });
    setSubCategory({ color: "", quantity: "", model: "", size: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        subcategories: formData.subcategories.map((sub) => ({
          ...sub,
          quantity: parseInt(sub.quantity),
        })),
      };

      // Replace with your axios call
      console.log("Submitting item:", payload);

      setOpen(false);
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <Label>Price</Label>
            <Input name="price" type="number" value={formData.price} onChange={handleChange} />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea name="description" value={formData.description} onChange={handleChange} />
          </div>
          <div>
            <Label>Image URL</Label>
            <Input name="image" value={formData.image} onChange={handleChange} />
          </div>

          {/* SubCategory Section */}
          <div className="border rounded-lg p-4 space-y-3">
            <h4 className="font-medium">Add Subcategory</h4>
            <div className="grid grid-cols-2 gap-2">
              <Input name="color" placeholder="Color" value={subCategory.color} onChange={handleSubChange} />
              <Input name="quantity" type="number" placeholder="Quantity" value={subCategory.quantity} onChange={handleSubChange} />
              <Input name="model" placeholder="Model" value={subCategory.model} onChange={handleSubChange} />
              <Input name="size" placeholder="Size" value={subCategory.size} onChange={handleSubChange} />
            </div>
            <Button type="button" onClick={handleAddSubCategory}>
              Add Subcategory
            </Button>
          </div>

          <div className="space-y-1">
            {formData.subcategories.map((sub, idx) => (
              <div key={idx} className="text-sm border p-2 rounded">
                {sub.color} | {sub.quantity} | {sub.model} | {sub.size}
              </div>
            ))}
          </div>

          <Button type="submit" className="w-full">
            Submit Item
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ItemFormPopup;
