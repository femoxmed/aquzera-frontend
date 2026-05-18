'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { CircleHelp, Loader2 } from 'lucide-react';

export default function VerificationPage() {
    const [code, setCode] = useState(['', '', '', '', '', '']);

    return (
        <section className="px-4 py-10 sm:px-6 sm:py-12 md:py-14 lg:py-16">
            <div className="mx-auto w-full max-w-[330px] sm:max-w-[390px] md:max-w-[430px] lg:max-w-[470px]">
                <p className="font-montserrat text-[12px] text-[#a7ff18] sm:text-[13px]">
                    Step 2 of 2
                </p>

                <h1 className="mt-3 font-mona text-[32px] font-black leading-none tracking-[-0.05em] text-white sm:text-[38px] md:text-[44px]">
                    Verify Your Email
                </h1>

                <p className="mt-4 font-montserrat text-[12px] leading-[1.3] text-white/45 sm:text-[13px]">
                    Enter Verification code sent to{' '}
                    <span className="text-[#a7ff18] underline underline-offset-2">
                        ajasa@gmail.com
                    </span>
                </p>

                <div className="mt-8">
                    <label className="mb-4 block font-mona text-[11px] font-black uppercase tracking-[0.24em] text-white sm:text-[12px]">
                        Enter Code
                    </label>

                    <div className="grid grid-cols-6 gap-2 sm:gap-4">
                        {code.map((value, index) => (
                            <input
                                key={index}
                                value={value}
                                maxLength={1}
                                onChange={(e) => {
                                    const next = [...code];
                                    next[index] = e.target.value.slice(-1);
                                    setCode(next);
                                }}
                                className="h-[50px] w-full border border-white/35 bg-transparent text-center font-mona text-[18px] font-black text-white outline-none focus:border-white sm:h-[62px]"
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-between font-montserrat text-[12px] text-white/45 sm:text-[13px]">
                    <p>Verification code expires in 6 mins</p>
                    <p className="text-[#a7ff18]">6:59</p>
                </div>

                <button
                    onClick={() => toast.success('Account verified')}
                    className="mt-8 flex h-[50px] w-full items-center justify-center gap-3 bg-[#1738e6] font-mona text-[12px] font-black uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-90 sm:h-[58px] sm:text-[13px]"
                >
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Awaiting Verification..
                </button>

                <p className="mt-9 font-montserrat text-[12px] text-white/45 sm:text-[13px]">
                    I did not receive any verification Email
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button className="h-[48px] border border-white/70 px-5 font-mona text-[11px] font-black uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-black sm:h-[52px] sm:text-[12px]">
                        Resend Email
                    </button>

                    <Link
                        href="/contact"
                        className="flex h-[48px] items-center justify-center gap-3 border border-white/70 px-5 font-mona text-[11px] font-black uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-black sm:h-[52px] sm:text-[12px]"
                    >
                        <CircleHelp className="h-4 w-4" />
                        Get Help
                    </Link>
                </div>
            </div>
        </section>
    );
}