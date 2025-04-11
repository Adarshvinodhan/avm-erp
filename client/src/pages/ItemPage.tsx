import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function SubcategoryTablePopup({
  open,
  onClose,
  itemName,
  subcategories,
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
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Subcategories of {itemName}</DialogTitle>
        </DialogHeader>

        {(!subcategories || subcategories.length === 0) ? (
          <p className="text-gray-500">No subcategories available.</p>
        ) : (
          <div>
            <div className="grid grid-cols-6 bg-gray-100 text-sm font-medium text-gray-700 px-4 py-2 rounded">
              <div>Model</div>
              <div>Color</div>
              <div>Size</div>
              <div>Price (₹)</div>
              <div>Quantity</div>
              <div>Total (₹)</div>
            </div>

            {subcategories.map((sub) => (
              <div
                key={sub.id}
                className="grid grid-cols-6 text-sm px-4 py-2 border-t items-center"
              >
                <div>{sub.model}</div>
                <div>{sub.color}</div>
                <div>{sub.size}</div>
                <div>₹{sub.price}</div>
                <div>{sub.quantity}</div>
                <div>₹{sub.price * sub.quantity}</div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
