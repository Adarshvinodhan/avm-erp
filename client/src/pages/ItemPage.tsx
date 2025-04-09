import { Card, CardContent } from "@/components/ui/card";

export default function ItemDetails() {
  const item = {
    id: 1,
    name: "LLM Mat",
    brand: "Raco",
    gst: "5%",
    subcategories: [
      { id: 1, model: "verna", color: "red", size: "small", price: 100, quantity: 10 },
      { id: 2, model: "swift", color: "blue", size: "medium", price: 200, quantity: 20 },
    ],
  };

  if (!item) return <p>No item data available.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardContent className="p-4 space-y-4">
          {/* Header Info */}
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-sm text-gray-600">Brand: {item.brand || "N/A"}</p>
            <p className="text-sm text-gray-600">GST: {item.gst || "N/A"}</p>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-6 bg-gray-100 text-sm font-medium text-gray-700 px-4 py-2 rounded">
            <div>Model</div>
            <div>Color</div>
            <div>Size</div>
            <div>Price (₹)</div>
            <div>Quantity</div>
            <div>Total (₹)</div>
          </div>

          {/* Table Rows */}
          {item.subcategories.length > 0 ? (
            item.subcategories.map((sub) => (
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
            ))
          ) : (
            <p className="text-gray-500 px-4 py-2">No subcategories available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
