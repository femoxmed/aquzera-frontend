"use client";
import { toast } from "sonner";import { Button } from "@/components/ui/button";import { Input } from "@/components/ui/input";
export default function VerificationPage(){return <div className="container max-w-md py-16"><h1 className="mb-3 text-3xl font-bold">Verification</h1><p className="mb-6 text-muted-foreground">Enter the verification code sent to your email.</p><div className="space-y-4"><Input placeholder="Verification code"/><Button className="w-full" onClick={()=>toast.success('Account verified')}>Verify Account</Button></div></div>}
