import { useMemo, useState } from "react";
import {
  Search,
  LayoutGrid,
  Salad,
  Milk,
  Sandwich,
  Coffee,
  Cookie,
  Plus,
  Minus,
  Trash2,
  StickyNote,
  Printer,
} from "lucide-react";
import "../styles/Dashboard.css";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  emoji: string;
  tint: string;
}

interface CartItem extends Product {
  qty: number;
  note: string;
}

const CATEGORIES = [
  { id: "all", label: "All Items", icon: LayoutGrid },
  { id: "produce", label: "Produce", icon: Salad },
  { id: "dairy", label: "Dairy", icon: Milk },
  { id: "bakery", label: "Bakery", icon: Sandwich },
  { id: "beverages", label: "Beverages", icon: Coffee },
  { id: "snacks", label: "Snacks", icon: Cookie },
];

const PRODUCTS = [
  {
    id: 1,
    name: "Fuji Apples (1kg)",
    price: 3.49,
    category: "produce",
    emoji: "🍎",
    tint: "green",
  },
  {
    id: 2,
    name: "Bananas (1kg)",
    price: 1.29,
    category: "produce",
    emoji: "🍌",
    tint: "green",
  },
  {
    id: 3,
    name: "Roma Tomatoes (1kg)",
    price: 2.19,
    category: "produce",
    emoji: "🍅",
    tint: "green",
  },
  {
    id: 4,
    name: "Whole Milk 1L",
    price: 2.99,
    category: "dairy",
    emoji: "🥛",
    tint: "blue",
  },
  {
    id: 5,
    name: "Greek Yogurt 500g",
    price: 4.49,
    category: "dairy",
    emoji: "🥣",
    tint: "blue",
  },
  {
    id: 6,
    name: "Cheddar Cheese 200g",
    price: 5.99,
    category: "dairy",
    emoji: "🧀",
    tint: "blue",
  },
  {
    id: 7,
    name: "Sourdough Bread",
    price: 4.29,
    category: "bakery",
    emoji: "🍞",
    tint: "amber",
  },
  {
    id: 8,
    name: "Croissant (4-pack)",
    price: 2.49,
    category: "bakery",
    emoji: "🥐",
    tint: "amber",
  },
  {
    id: 9,
    name: "Orange Juice 1L",
    price: 3.79,
    category: "beverages",
    emoji: "🧃",
    tint: "sky",
  },
  {
    id: 10,
    name: "Sparkling Water 6-pack",
    price: 1.49,
    category: "beverages",
    emoji: "💧",
    tint: "sky",
  },
  {
    id: 11,
    name: "Ground Coffee 250g",
    price: 8.99,
    category: "beverages",
    emoji: "☕",
    tint: "sky",
  },
  {
    id: 12,
    name: "Potato Chips 150g",
    price: 2.99,
    category: "snacks",
    emoji: "🍟",
    tint: "rose",
  },
  {
    id: 13,
    name: "Chocolate Bar",
    price: 1.99,
    category: "snacks",
    emoji: "🍫",
    tint: "rose",
  },
  {
    id: 14,
    name: "Mixed Nuts 250g",
    price: 6.49,
    category: "snacks",
    emoji: "🥜",
    tint: "rose",
  },
];

export default function Dashboard() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [openNoteId, setOpenNoteId] = useState<number | null>(null);
  const [discountPct, setDiscountPct] = useState(0);
  const [toast, setToast] = useState("");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory =
        activeCategory === "all" || p.category === activeCategory;
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const taxAmt = subtotal * 0.05;
  const discountAmt = subtotal * (discountPct / 100);
  const total = Math.max(0, subtotal + taxAmt - discountAmt);

  function addToCart(product: Product) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { ...product, qty: 1, note: "" }];
    });
  }

  function changeQty(id: number, delta: number) {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    );
  }

  function removeItem(id: number) {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }

  function updateNote(id: number, note: string) {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, note } : i)));
  }

  function fireToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  }

  function handlePrint() {
    if (cart.length === 0) return;
    window.print();
  }

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Search products, build the sale, and print the receipt.</p>
      </div>

      <div className="dashboard">
        {/* Middle: search + catalog */}
        <section className="dashboard-main">
          <div className="dashboard-search-row">
            <div className="search-input-wrap">
              <Search size={16} />
              <input
                className="search-input"
                placeholder="Search products"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="category-row">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`category-pill${active ? " active" : ""}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <Icon size={18} />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              Nothing matches that search — try another term.
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="product-card"
                  onClick={() => addToCart(p)}
                >
                  <div className="product-price">${p.price.toFixed(2)}</div>
                  <div className={`product-image tint-${p.tint}`}>
                    {p.emoji}
                  </div>
                  <div className="product-footer">
                    <span className="product-name">{p.name}</span>
                    <button
                      type="button"
                      className="product-add-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(p);
                      }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Right: receipt */}
        <aside className="receipt-panel">
          <div className="receipt-header">
            <div>
              <h3 className="receipt-title">Receipt</h3>
              <p className="receipt-subtitle">
                {cart.length} item{cart.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              type="button"
              className="receipt-clear-btn"
              onClick={() => setCart([])}
              disabled={cart.length === 0}
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div className="receipt-items">
            {cart.length === 0 && (
              <div className="empty-state">
                No items yet — tap a product to add it.
              </div>
            )}
            {cart.map((item) => (
              <div key={item.id} className="receipt-item">
                <div className={`receipt-item-thumb tint-${item.tint}`}>
                  {item.emoji}
                </div>
                <div className="receipt-item-body">
                  <div className="receipt-item-top">
                    <span className="receipt-item-name">{item.name}</span>
                    <button
                      type="button"
                      className="receipt-item-remove"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="receipt-item-price">
                    ${item.price.toFixed(2)} × {item.qty} ={" "}
                    <strong>${(item.price * item.qty).toFixed(2)}</strong>
                  </p>
                  <div className="receipt-item-controls">
                    <div className="qty-control">
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => changeQty(item.id, -1)}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="qty-value">{item.qty}</span>
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => changeQty(item.id, 1)}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="note-btn"
                      onClick={() =>
                        setOpenNoteId(openNoteId === item.id ? null : item.id)
                      }
                    >
                      <StickyNote size={12} />
                      {item.note ? "Edit note" : "Add note"}
                    </button>
                  </div>
                  {openNoteId === item.id && (
                    <input
                      autoFocus
                      className="note-input"
                      placeholder="e.g. substitute if unavailable"
                      value={item.note}
                      onChange={(e) => updateNote(item.id, e.target.value)}
                    />
                  )}
                  {item.note && openNoteId !== item.id && (
                    <p className="note-display">Note: {item.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="receipt-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (5%)</span>
              <span>${taxAmt.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Discount</span>
              <span className="discount-field">
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="discount-input"
                  value={discountPct}
                  onChange={(e) => setDiscountPct(Number(e.target.value) || 0)}
                />
                %
              </span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span className="summary-total-value">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="receipt-actions">
            <button
              type="button"
              className="btn-outline"
              disabled={cart.length === 0}
              onClick={() => fireToast("Sale held")}
            >
              Hold Sale
            </button>
            <button
              type="button"
              className="btn-outline"
              disabled={cart.length === 0}
              onClick={() => setCart([])}
            >
              Clear
            </button>
            <button
              type="button"
              className="btn-primary"
              disabled={cart.length === 0}
              onClick={() => fireToast("Sale checked out")}
            >
              Checkout
            </button>
            <button
              type="button"
              className="btn-success"
              disabled={cart.length === 0}
              onClick={handlePrint}
            >
              <Printer size={14} />
              Print Receipt
            </button>
          </div>
        </aside>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
