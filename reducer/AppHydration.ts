"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hydrateFromStorage } from "./menuSlice";

export default function AppHydration() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hydrateFromStorage());

    const handler = () => dispatch(hydrateFromStorage());
    window.addEventListener("menu_items_updated", handler);
    return () => window.removeEventListener("menu_items_updated", handler);
  }, []);

  return null;
}
