import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  favorites: string[];
  deletefavorites: (id: string) => void;
  updatefavorites: (id: string) => void;
  clearFavorites:()=>void;
}

export const useFavoritesStore = create<State>()(
  persist(
    (set, get) => ({
      favorites: [],

      updatefavorites: (id: string) =>
        set((state) => ({ favorites: [...state.favorites, id] })),

      deletefavorites: (id: string) => {
        const { favorites } = get();
        const updatefavoritesProduct = favorites.filter(
          (dataId) => dataId !== id
        );
        set({ favorites: updatefavoritesProduct });
      },
      clearFavorites:()=>set({favorites:[]})
    }),
    { name: "favorites-product" }
  )
);
