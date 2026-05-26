import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/8801968634181"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 grid place-items-center text-white shadow-[0_0_40px_oklch(0.75_0.18_150/0.6)] hover:scale-110 transition-transform animate-pulse-glow"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
