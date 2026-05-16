"use client";
import { toast } from "sonner";import { Button } from "@/components/ui/button";import { Input } from "@/components/ui/input";
export default function ResetPasswordPage(){return <div className="container max-w-md py-16"><h1 className="mb-3 text-3xl font-bold">Reset Password</h1><p className="mb-6 text-muted-foreground">Enter your email to receive a reset link.</p><div className="space-y-4"><Input placeholder="Email"/><Button className="w-full" onClick={()=>toast.success('Reset link sent')}>Send Reset Link</Button></div></div>}
