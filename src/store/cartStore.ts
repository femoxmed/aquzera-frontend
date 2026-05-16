import { create } from "zustand";
type CartItem={id:string;name:string;price:number;quantity:number};type CartState={items:CartItem[];addItem:(item:CartItem)=>void;removeItem:(id:string)=>void;clearCart:()=>void;total:()=>number};
export const useCartStore=create<CartState>((set,get)=>({items:[],addItem:(item)=>set((state)=>({items:[...state.items,item]})),removeItem:(id)=>set((state)=>({items:state.items.filter((item)=>item.id!==id)})),clearCart:()=>set({items:[]}),total:()=>get().items.reduce((sum,item)=>sum+item.price*item.quantity,0)}));
