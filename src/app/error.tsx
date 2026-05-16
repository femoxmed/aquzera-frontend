"use client";
import { Button } from "@/components/ui/button";
export default function Error({error,reset}:{error:Error&{digest?:string};reset:()=>void}){return <div className="container flex min-h-[70vh] flex-col items-center justify-center text-center"><h1 className="text-3xl font-bold">Something went wrong</h1><p className="mt-2 text-muted-foreground">{error.message || 'An unexpected error occurred.'}</p><Button className="mt-6" onClick={reset}>Try again</Button></div>}
