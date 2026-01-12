"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { sendContactForm, ContactState } from "@/actions/sendEmail";
import { useFormStatus } from "react-dom";
import { useToast } from "@/components/ui/ToastProvider";
import { useTranslations } from "@/context/LocaleContext";

const initialState: ContactState = {
  success: false,
  message: "",
};

function SubmitButton() {
  const tForm = useTranslations("form");
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-label={pending ? tForm("processing") : tForm("send")}
      className={`
        w-full py-4 font-mono font-bold tracking-widest uppercase transition-all duration-300 relative overflow-hidden group border border-white/20
        ${pending ? "bg-black text-gray-400 cursor-wait" : "bg-white text-black hover:bg-accent hover:text-black"}
      `}
    >
      {pending ? (
        <span className="flex items-center justify-center gap-2">
           <span className="w-2 h-2 bg-accent animate-ping" /> {tForm("processing")}
        </span>
      ) : (
        <>
            <span className="relative z-10">{tForm("send")}</span>
            <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-0" />
        </>
      )}
    </button>
  );
}

export default function ContactForm() {
  const tForm = useTranslations("form");
  const tBanner = useTranslations("banner");
  const [state, formAction] = useActionState(sendContactForm, initialState);
  const [logs, setLogs] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const [mounted, setMounted] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (state.success) {
      setLogs([tForm("success")]);
      formRef.current?.reset();
      showToast(tForm("success"), "success");
    } else if (state.message) {
        setLogs([`Error: ${state.message}`]);
        showToast(state.message || tForm("error"), "error");
    }
  }, [state, showToast, tForm]);

  // Prevent Hydration Mismatch from Browser Extensions (SharkLocker, etc.)
  if (!mounted) {
      return (
          <div className="space-y-6">
              <div className="w-full h-[58px] bg-white/5 border border-white/10 animate-pulse" />
              <div className="w-full h-[58px] bg-white/5 border border-white/10 animate-pulse" />
              <div className="w-full h-[150px] bg-white/5 border border-white/10 animate-pulse" />
              <div className="w-full h-[56px] bg-white/10 animate-pulse" />
          </div>
      );
  }

  return (
    <div className="relative">
        <div
            className="mb-6 p-4 border border-accent/30 bg-accent/10 text-accent text-sm font-mono rounded-sm"
            role="status"
            aria-live="polite"
        >
            {tBanner("emailNoticePrefix")}{" "}
            <a
                href="mailto:abdulazizz.dev@gmail.com"
                className="underline hover:text-white"
            >
                abdulazizz.dev@gmail.com
            </a>{" "}
            {tBanner("emailNoticeSuffix")}
        </div>
        <form ref={formRef} action={formAction} className="space-y-6">
            {/* Name Input */}
            <div className="relative group mb-2">
                <label htmlFor="name" className="absolute left-0 -top-6 text-gray-300 text-[10px] font-mono uppercase transition-all duration-200 peer-focus:text-accent peer-not-placeholder-shown:text-accent pointer-events-none z-10">
                    {tForm("name")}
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder=" "
                    className="w-full bg-black/50 border border-white/10 pt-4 pb-4 px-4 text-white placeholder-transparent focus:outline-none focus:border-transparent peer backdrop-blur-md transition-all"
                    aria-label="Name"
                />
                {/* Glowing Border Gradient */}
                <div className="absolute inset-0 -z-10 rounded-sm p-[1px] opacity-0 peer-focus:opacity-100 transition-opacity">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50 blur-sm" />
                </div>
                {state.errors?.name && <p className="text-red-500 text-xs mt-1 font-mono">{state.errors.name[0]}</p>}
            </div>

            {/* Email Input */}
            <div className="relative group mb-2">
                <label htmlFor="email" className="absolute left-0 -top-6 text-gray-300 text-[10px] font-mono uppercase transition-all duration-200 peer-focus:text-accent peer-not-placeholder-shown:text-accent pointer-events-none z-10">
                    {tForm("email")}
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder=" "
                    className="w-full bg-black/50 border border-white/10 pt-4 pb-4 px-4 text-white placeholder-transparent focus:outline-none focus:border-transparent peer backdrop-blur-md transition-all"
                    aria-label="Email"
                />
                 <div className="absolute inset-0 -z-10 rounded-sm p-[1px] opacity-0 peer-focus:opacity-100 transition-opacity">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50 blur-sm" />
                </div>
                {state.errors?.email && <p className="text-red-500 text-xs mt-1 font-mono">{state.errors.email[0]}</p>}
            </div>

            {/* Message Input */}
            <div className="relative group mb-2">
                <label htmlFor="message" className="absolute left-0 -top-6 text-gray-300 text-[10px] font-mono uppercase transition-all duration-200 peer-focus:text-accent peer-not-placeholder-shown:text-accent pointer-events-none z-10">
                    {tForm("message")}
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder=" "
                    className="w-full bg-black/50 border border-white/10 pt-4 pb-4 px-4 text-white placeholder-transparent focus:outline-none focus:border-transparent peer resize-none backdrop-blur-md transition-all"
                    aria-label="Message"
                />
                 <div className="absolute inset-0 -z-10 rounded-sm p-[1px] opacity-0 peer-focus:opacity-100 transition-opacity">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50 blur-sm" />
                </div>
                {state.errors?.message && <p className="text-red-500 text-xs mt-1 font-mono">{state.errors.message[0]}</p>}
            </div>

            <SubmitButton />
        </form>

        {/* Terminal Feedback Overlay */}
        {logs.length > 0 && (
            <div className="mt-8 p-4 bg-black border border-white/10 font-mono text-xs text-accent">
                {logs.map((log, i) => (
                    <div key={i} className="mb-1 animate-pulse">
                        <span className="opacity-50">{`>`}</span> {log}
                    </div>
                ))}
            </div>
        )}
    </div>
  );
}
