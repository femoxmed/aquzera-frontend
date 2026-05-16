"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, addItem, clearCart } = useCartStore();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isEmpty = items.length === 0;

  function decreaseQty(id: string, currentQty: number) {
    if (currentQty <= 1) {
      removeItem(id);
    } else {
      // Replace with updated quantity
      removeItem(id);
      const item = items.find((i) => i.id === id);
      if (item) addItem({ ...item, quantity: currentQty - 1 });
    }
  }

  function increaseQty(id: string, currentQty: number) {
    removeItem(id);
    const item = items.find((i) => i.id === id);
    if (item) addItem({ ...item, quantity: currentQty + 1 });
  }

  return (
    <>
      <section className="bg-white min-h-[60vh] flex flex-col items-center justify-center py-20 px-4">
        <div className="w-full max-w-xl text-center">
          <ShoppingCart
            className="mx-auto mb-4 text-gray-300"
            style={{ width: 48, height: 48 }}
            strokeWidth={1.2}
          />
          <h1
            className="text-3xl md:text-4xl font-black text-gray-900"
            style={{ fontFamily: "'Mona Sans','Montserrat',sans-serif", fontStretch: "125%" }}
          >
            My Cart
          </h1>

          {isEmpty ? (
            <>
              <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                Opps!! your Cart is Currently empty you can use the
                <br />
                button below to navigate to the product page
              </p>
              <Link
                href="/product"
                className="mt-8 inline-block bg-primary text-white text-xs font-bold tracking-[0.22em] px-10 py-4 hover:bg-blue-700 transition-colors"
              >
                PRODUCT PAGE
              </Link>
            </>
          ) : (
            <div className="mt-8 text-left">
              {/* Cart items */}
              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-5">
                    {/* Image placeholder */}
                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <Image
                        src={
                          item.id === "neo-sense-filter"
                            ? "/images/neo-sense-filter.png"
                            : "/images/purifier-black.png"
                        }
                        alt={item.name}
                        width={60}
                        height={60}
                        className="object-contain"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        ₦{item.price.toLocaleString()} each
                      </p>
                    </div>

                    {/* Qty controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQty(item.id, item.quantity)}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-500 transition-colors"
                      >
                        <Minus className="w-3 h-3 text-gray-600" />
                      </button>
                      <span className="text-sm font-bold text-gray-900 w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQty(item.id, item.quantity)}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-500 transition-colors"
                      >
                        <Plus className="w-3 h-3 text-gray-600" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <p className="text-sm font-black text-gray-900 w-28 text-right">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t-2 border-gray-900 pt-5 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-700 tracking-wider uppercase">Total</span>
                <span
                  className="text-xl font-black text-gray-900"
                  style={{ fontFamily: "'Mona Sans','Montserrat',sans-serif" }}
                >
                  ₦{total.toLocaleString()}
                </span>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={clearCart}
                  className="flex-1 border-2 border-gray-300 text-gray-600 text-[10px] font-bold tracking-widest py-3 hover:border-gray-500 transition-colors"
                >
                  CLEAR CART
                </button>
                <Link
                  href="/shipping"
                  className="flex-1 bg-primary text-white text-[10px] font-bold tracking-widest py-3 text-center hover:bg-blue-700 transition-colors"
                >
                  PROCEED TO CHECKOUT
                </Link>
              </div>

              <div className="mt-4 text-center">
                <Link
                  href="/product"
                  className="text-[11px] text-primary font-semibold hover:underline tracking-wider"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
