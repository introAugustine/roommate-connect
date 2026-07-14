"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function SubmitPage() {

  const router = useRouter();


  const [email,setEmail] = useState("");
  const [university,setUniversity] = useState("");
  const [instagram,setInstagram] = useState("");
  const [bio,setBio] = useState("");

  const [photos,setPhotos] = useState<File[]>([]);

  const [loading,setLoading] = useState(false);



  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {

    if(!e.target.files) return;


    const selected = Array.from(e.target.files);



    if(selected.length + photos.length > 10){

      alert("Maximum 10 photos allowed");

      return;

    }


    setPhotos([...photos,...selected]);

  }







  async function handleSubmit(e:React.FormEvent){

    e.preventDefault();



    if(!email || !university || !instagram || !bio || photos.length===0){

      alert("Please complete your profile and upload photos.");

      return;

    }



    setLoading(true);



    const uploadedPhotos:string[]=[];



    for(const photo of photos){


      const fileName = `${Date.now()}-${photo.name}`;



      const {error}=await supabase.storage
      .from("student-photos")
      .upload(fileName,photo);



      if(error){

        alert(error.message);

        setLoading(false);

        return;

      }





      const {data}=supabase.storage
      .from("student-photos")
      .getPublicUrl(fileName);



      uploadedPhotos.push(data.publicUrl);



    }







    const {data,error}=await supabase
    .from("submissions")
    .insert([

      {

        email,
        university,
        instagram,
        bio,

        photos:uploadedPhotos.join(","),

        payment_method:"",
        payment_screenshot:"",
        payment_amount:"$8",

        status:"Pending"

      }

    ])
    .select()
    .single();






    setLoading(false);





    if(error){

      alert(error.message);

      return;

    }



    router.push(`/payment?id=${data.id}`);



  }







  return (

    <main className="min-h-screen bg-slate-100 py-12 px-6">



      <div className="max-w-4xl mx-auto">





        {/* PROGRESS */}


        <div className="bg-white rounded-3xl shadow p-6 mb-8">


          <div className="flex justify-between items-center text-center">


            <div>

              <div className="w-12 h-12 mx-auto bg-blue-700 text-white rounded-full flex items-center justify-center font-black">
                1
              </div>

              <p className="font-bold mt-2 text-gray-900">
                Profile
              </p>

            </div>





            <div className="flex-1 h-1 bg-blue-200 mx-4"></div>






            <div>

              <div className="w-12 h-12 mx-auto bg-gray-300 text-gray-700 rounded-full flex items-center justify-center font-black">
                2
              </div>

              <p className="font-bold mt-2 text-gray-700">
                Photos
              </p>

            </div>






            <div className="flex-1 h-1 bg-gray-200 mx-4"></div>






            <div>

              <div className="w-12 h-12 mx-auto bg-gray-300 text-gray-700 rounded-full flex items-center justify-center font-black">
                3
              </div>

              <p className="font-bold mt-2 text-gray-700">
                Payment
              </p>

            </div>



          </div>


        </div>







        <div className="bg-white rounded-3xl shadow-xl p-10">



          <h1 className="text-4xl font-black text-center text-blue-700">

            Create Your Roommate Profile

          </h1>




          <p className="text-center text-gray-700 mt-3 mb-10">

            Connect with students before arriving on campus.

          </p>






          <form onSubmit={handleSubmit} className="space-y-6">          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full border-2 border-gray-300 p-4 rounded-xl text-gray-900"
          />



          <input
            placeholder="University"
            value={university}
            onChange={(e)=>setUniversity(e.target.value)}
            className="w-full border-2 border-gray-300 p-4 rounded-xl text-gray-900"
          />



          <input
            placeholder="Instagram Username"
            value={instagram}
            onChange={(e)=>setInstagram(e.target.value)}
            className="w-full border-2 border-gray-300 p-4 rounded-xl text-gray-900"
          />




          <textarea
            rows={7}
            placeholder="Tell students about yourself..."
            value={bio}
            onChange={(e)=>setBio(e.target.value)}
            className="w-full border-2 border-gray-300 p-4 rounded-xl text-gray-900"
          />








          {/* PHOTO UPLOAD */}


          <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-6">


            <h2 className="text-2xl font-black text-gray-900 mb-2">
              📸 Upload Your Photos
            </h2>


            <p className="text-gray-700 mb-5">
              Add up to 10 clear photos for your roommate profile.
            </p>




            <label className="flex flex-col items-center justify-center border-2 border-dashed border-blue-600 bg-white rounded-2xl py-10 cursor-pointer">


              <span className="text-5xl">
                📷
              </span>


              <span className="text-blue-700 font-black mt-3">
                Select Photos
              </span>


              <span className="text-gray-600">
                {photos.length}/10 uploaded
              </span>



              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoChange}
                className="hidden"
              />


            </label>






            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">


              {photos.map((photo,index)=>(


                <div key={index} className="relative">


                  <img
                    src={URL.createObjectURL(photo)}
                    alt="preview"
                    className="h-28 w-full object-cover rounded-xl"
                  />



                  <button
                    type="button"
                    onClick={() =>
                      setPhotos(
                        photos.filter((_,i)=>i!==index)
                      )
                    }
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-7 h-7 font-black"
                  >
                    ×
                  </button>



                </div>



              ))}



            </div>



          </div>









          {/* PROFILE PREVIEW */}


          <div className="bg-slate-50 border rounded-3xl p-6">


            <h2 className="text-2xl font-black text-gray-900 mb-5">
              Profile Preview
            </h2>



            <div className="space-y-3 text-gray-900">


              <p>
                🎓 University:
                <b className="ml-2">
                  {university || "Your university"}
                </b>
              </p>



              <p>
                📱 Instagram:
                <b className="ml-2">
                  {instagram || "Your username"}
                </b>
              </p>




              <p>
                ✍️ Bio:
              </p>


              <p className="text-gray-700">
                {bio || "Your introduction will appear here"}
              </p>



            </div>


          </div>









          {/* WHAT HAPPENS NEXT */}



          <div className="bg-blue-700 text-white rounded-3xl p-7">


            <h2 className="text-2xl font-black mb-4">
              What Happens Next?
            </h2>



            <ul className="space-y-3 font-medium">


              <li>
                ✅ Submit your profile
              </li>


              <li>
                ✅ Complete payment
              </li>


              <li>
                ✅ We review and prepare your feature
              </li>


              <li>
                ✅ Your profile goes live soon
              </li>



            </ul>


          </div>








          <button

            disabled={loading}

            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-5 rounded-xl text-xl font-black"

          >

            {loading
            ? "Uploading Profile..."
            : "Continue To Payment →"
            }


          </button>





        </form>


      </div>


    </div>


  </main>

  );

}