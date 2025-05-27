import { useState } from "react";

const marketplaces = [
  "Amazon", "Doba", "eBay", "Temu", "Macys", "Wayfair", "Reverb", "Shopify B2C",
  "Aliexpress", "eBay Variation", "Shopify B2B(Wh)", "eBay 2", "Sears", "Appscenic",
  "FB Shop", "Instagram Shop", "Amazon FBA", "Walmart", "Yamibuy", "DHGate",
  "Shein", "TikTok", "Costco", "Etsy", "Kohls", "Target", "Overstock", "Newegg",
  "Best Buy", "LightInTheBox", "Banggood", "BigCommerce", "WooCommerce",
  "Wish", "Coppel", "Mercado Libre", "Shopline", "Rakuten", "Lazada"
];

export default function MarketplaceSelector() {
  const [selected, setSelected] = useState([]);
  const [status, setStatus] = useState("");

  const toggleMarketplace = (marketplace) => {
    setSelected((prev) =>
      prev.includes(marketplace)
        ? prev.filter((m) => m !== marketplace)
        : [...prev, marketplace]
    );
  };

  const handleSubmit = async () => {
    if (selected.length === 0) {
      setStatus("Please select at least one marketplace.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/marketplaces", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ marketplaces: selected }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("Marketplaces saved successfully.");
        setSelected([]); // Optionally clear selection
      } else {
        setStatus(data.error || "Failed to save.");
      }
    } catch (err) {
      setStatus("Network error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-200 via-orange-300 to-orange-400 p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-center mb-1">Select Marketplaces</h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          All Shipping Cleared up to 3:30 PM Ohio Time
        </p>

        <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2">
          {marketplaces.map((marketplace) => (
            <label
              key={marketplace}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition ${
                selected.includes(marketplace)
                  ? "bg-purple-100"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <input
                type="checkbox"
                checked={selected.includes(marketplace)}
                onChange={() => toggleMarketplace(marketplace)}
                className="h-4 w-4 accent-blue-500"
              />
              <span className="text-gray-800">{marketplace}</span>
            </label>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full px-6 py-2 bg-green-700 text-white font-semibold rounded-md"
        >
          Submit
        </button>

        <p className="mt-2 text-sm font-medium text-center text-gray-700">
          {`${selected.length}/${marketplaces.length} selected (${Math.round(
            (selected.length / marketplaces.length) * 100
          )}%)`}
        </p>

        {status && (
          <p className="mt-3 text-center text-sm text-blue-700">{status}</p>
        )}
      </div>
    </div>
  );
}
