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


interface FormData {
  name: string;
  price: string; // keep as string for input, parse later
  brand: string;
  gst: string;
}

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ItemFormPopup: React.FC<Props> = ({ open, setOpen }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: "",
    brand: "",
    gst: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
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
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <Label>Brand</Label>
            <Input name="brand" value={formData.brand} onChange={handleChange} />
          </div>
          <div>
            <Label>Price</Label>
            <Input name="price" type="number" value={formData.price} onChange={handleChange} />
          </div>
          <div>
            <Label>Gst</Label>
            <Input name="gst " value={formData.gst} onChange={handleChange} />
          </div>
          <Button type="submit" className="w-full">
            Add Item
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ItemFormPopup;
