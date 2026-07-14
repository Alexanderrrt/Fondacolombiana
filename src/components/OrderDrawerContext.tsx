"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { OrderDrawer } from "./OrderDrawer";

interface OrderDrawerContextValue {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const OrderDrawerContext = createContext<OrderDrawerContextValue | null>(null);

/**
 * Provides a single, app-wide "choose your location to order" drawer.
 * Any conversion entry point (top-nav button, floating mobile CTA, hero, cards)
 * can call openDrawer() — there is exactly one drawer instance, so the checkout
 * confusion of the old site is structurally impossible.
 */
export function OrderDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = useCallback(() => setIsOpen(true), []);
  const closeDrawer = useCallback(() => setIsOpen(false), []);

  return (
    <OrderDrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer }}>
      {children}
      <OrderDrawer isOpen={isOpen} onClose={closeDrawer} />
    </OrderDrawerContext.Provider>
  );
}

export function useOrderDrawer() {
  const ctx = useContext(OrderDrawerContext);
  if (!ctx) {
    throw new Error("useOrderDrawer must be used within an OrderDrawerProvider");
  }
  return ctx;
}
