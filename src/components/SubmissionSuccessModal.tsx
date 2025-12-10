"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Check } from "lucide-react";

export default function SubmissionSuccessModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-5 border-b flex items-center gap-3 bg-gray-50">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-base font-semibold text-gray-800">Form Submitted Successfully</div>
        </div>
        <div className="p-5 text-sm text-gray-700">
          Your application has been submitted. Our team will contact you shortly.
        </div>
        <div className="p-4 border-t bg-gray-50 flex justify-end">
          <button onClick={onClose} className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">OK</button>
        </div>
      </div>
    </div>,
    document.body
  );
}

