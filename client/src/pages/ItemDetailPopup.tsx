import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

export default function ItemDetailPopup({
  open,
  onClose,
  itemName,
  subcategories,
  onEdit,
  onDelete,
}: {
  open: boolean;
  onClose: () => void;
  itemName: string;
  subcategories: {
    id: number;
    model: string;
    color: string;
    size: string;
    price: number;
    quantity: number;
  }[];
  onEdit?: (subcategoryId: number) => void;
  onDelete?: (subcategoryId: number) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-full sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{itemName}</DialogTitle>
        </DialogHeader>

        {(!subcategories || subcategories.length === 0) ? (
          <p className="text-gray-500 text-sm">No subcategories available.</p>
        ) : (
          <div className="w-full overflow-x-auto">
            <div className="min-w-[750px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Model</TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Price (₹)</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total (₹)</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subcategories.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell>{sub.model}</TableCell>
                      <TableCell>{sub.color}</TableCell>
                      <TableCell>{sub.size}</TableCell>
                      <TableCell>₹{sub.price}</TableCell>
                      <TableCell>{sub.quantity}</TableCell>
                      <TableCell>₹{sub.price * sub.quantity}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEdit?.(sub.id)}
                          >
                            <Pencil className="w-4 h-4 text-blue-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDelete?.(sub.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
