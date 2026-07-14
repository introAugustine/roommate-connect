"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

function PaymentContent() {
  const searchParams = useSearchParams();
  const submissionId = searchParams.get("id");

  const [method, setMethod] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const paymentDetails: Record<string, string> = {
    "Cash App": "$Nickvlsm",
    "Venmo": "https://venmo.com/u/NickLsm06",
    "PayPal": "Nikvalsamakicollege@gmail.com",
    "Zelle / Apple Pay": "+1 (253) 266-7322",
  };

  async function handleSubmit() {
    if (!submissionId) {
      alert("Missing submission ID");
      return;
    }

    if (!method || !screenshot) {
      alert("Please select a payment method and upload a screenshot.");
      return;
    }

    setLoading(true);

    const fileName = `${Date.now()}-${screenshot.name}`;

    const { error: uploadError } = await supabase.storage
      .from("payment-screenshots")
      .upload(fileName, screenshot);

    if (uploadError) {
      alert(uploadError.message);
      setLoading(false);
      return;
    }

    const { data } = supabase.storage
      .from("payment-screenshots")
      .getPublicUrl(fileName);

    const { error } = await supabase
      .from("submissions")
      .update({
        payment_method: method,
        payment_screenshot: data.publicUrl,
        status: "Pending Review",
      })
      .eq("id", submissionId);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setDone(true);
  }

  if (done) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-700 to-blue-950 flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-lg">
          <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-blue-700 mt-6">
            Payment Submitted
          </h1>

          <p className="mt-4 text-gray-700">
            Your profile is under review and will be featured soon.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-10">
        <h1 className="text-4xl font-bold text-center text-blue-700">
          Complete Your Feature
        </h1>

        <p className="text-center text-gray-600 mt-3">
          Choose a payment method and upload your payment proof.
        </p>

        <div className="mt-8 space-y-3">
          {Object.keys(paymentDetails).map((item) => (
            <button
              key={item}
              onClick={() => setMethod(item)}
              className={`w-full rounded-xl border p-4 text-left font-bold transition ${
                method === item
                  ? "bg-blue-700 text-white"
                  : "bg-white text-gray-900"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {method && (
          <div className="mt-6 rounded-2xl bg-blue-50 border border-blue-200 p-6">
            <h2 className="font-bold text-lg">
              Send $8 via {method}
            </h2>

            <p className="mt-3 text-blue-700 font-bold break-all">
              {paymentDetails[method]}
            </p>
          </div>
        )}

        <div className="mt-8">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
            className="block w-full border rounded-xl p-4"
          />

          {screenshot && (
            <p className="mt-3 text-green-700 font-bold">
              ✓ Screenshot selected
            </p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-blue-700 py-4 text-lg font-bold text-white"
        >
          {loading ? "Submitting..." : "Submit Payment"}
        </button>
      </div>
    </main>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center">
          <p className="text-xl font-semibold">Loading...</p>
        </main>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}