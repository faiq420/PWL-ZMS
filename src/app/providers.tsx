"use client";

import AppHydration from "@/reducer/AppHydration";
import store from "@/reducer/store";
import { Provider } from "react-redux";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AppHydration />
      {children}
    </Provider>
  );
}
