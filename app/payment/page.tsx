"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function PaymentPage() {

  const searchParams = useSearchParams();

  const submissionId = searchParams.get("id");


  const [method, setMethod] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);



  const paymentDetails: any = {
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
      alert("Please select payment method and upload screenshot.");
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



    const { data: urlData } = supabase.storage
      .from("payment-screenshots")
      .getPublicUrl(fileName);



    const screenshotUrl = urlData.publicUrl;




    const { error: updateError } = await supabase
      .from("submissions")
      .update({
        payment_method: method,
        payment_screenshot: screenshotUrl,
        status: "Pending Review",
      })
      .eq("id", submissionId);



    setLoading(false);



    if (updateError) {
      alert(updateError.message);
      return;
    }



    setDone(true);

  }




  if (done) {

    return (

      <main className="min-h-screen bg-gradient-to-br from-blue-700 to-blue-950 flex items-center justify-center px-6">


        <div className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-lg">


          <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-4xl font-bold text-blue-700 mb-6">
            ✓
          </div>



          <h1 className="text-3xl font-black text-blue-700">
            Payment Submitted
          </h1>



          <p className="text-gray-700 mt-5 text-lg">
            Your profile is under review. You'll be featured within an hour and notified on Instagram.
          </p>



          <p className="mt-6 text-sm text-gray-500">
            Thank you for choosing Roommate Connect.
          </p>



        </div>


      </main>

    );

  }





  return (

    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-6 py-16">


      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-10">


        <div className="text-center">

          <h1 className="text-4xl font-black text-blue-700">
            Complete Your Feature
          </h1>


          <p className="text-gray-600 mt-3">
            Choose payment method and submit proof of payment.
          </p>


        </div>





        <div className="mt-10 space-y-4">


          {Object.keys(paymentDetails).map((item)=>(


            <button

              key={item}

              onClick={()=>setMethod(item)}

              className={`w-full p-4 rounded-xl border font-bold text-left transition ${
                method === item
                ? "bg-blue-700 text-white"
                : "bg-white text-gray-900 hover:border-blue-500"
              }`}

            >

              {item}

            </button>


          ))}


        </div>






        {method && (

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-6">


            <h3 className="font-bold text-gray-900 text-lg">
              Send $8 using {method}
            </h3>



            <p className="mt-3 text-blue-700 font-bold break-all">
              {paymentDetails[method]}
            </p>


          </div>


        )}






        <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">


          <h2 className="text-xl font-bold text-gray-900 mb-2">
            📄 Payment Proof
          </h2>



          <p className="text-gray-700 mb-5">
            Upload your payment screenshot to complete your submission.
          </p>





          <label className="flex flex-col items-center justify-center bg-white border-2 border-dashed border-blue-500 rounded-2xl py-10 cursor-pointer hover:bg-blue-50 transition">


            <span className="text-4xl mb-3">
              📤
            </span>


            <span className="font-bold text-blue-700">
              Click to upload screenshot
            </span>


            <span className="text-gray-600 mt-2">
              JPG or PNG format
            </span>



            <input

              type="file"

              accept="image/*"

              onChange={(e)=>
                setScreenshot(e.target.files?.[0] || null)
              }

              className="hidden"

            />


          </label>





          {screenshot && (

            <p className="mt-4 font-bold text-green-700">
              ✓ Screenshot selected
            </p>

          )}



        </div>






        <button

          onClick={handleSubmit}

          disabled={loading}

          className="w-full mt-8 bg-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-800 transition"

        >

          {loading ? "Submitting..." : "Submit Payment"}

        </button>





      </div>


    </main>

  );

}