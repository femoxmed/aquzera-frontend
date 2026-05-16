import { create } from "zustand";
type User={id:string;name:string;email:string};type AuthState={user:User|null;accessToken:string|null;setAuth:(user:User,accessToken:string)=>void;logout:()=>void};
export const useAuthStore=create<AuthState>((set)=>({user:null,accessToken:null,setAuth:(user,accessToken)=>set({user,accessToken}),logout:()=>set({user:null,accessToken:null})}));
