import Link from "next/link";

export default function Home() {

  return (

    <main className="min-h-screen bg-white text-gray-900">



      {/* NAVBAR */}

      <header className="bg-white border-b shadow-sm">

        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-5">


          <h1 className="text-3xl font-black text-blue-700">
            🎓 Roommate Connect
          </h1>



          <nav className="hidden md:flex gap-8 font-semibold text-gray-800">

            <a href="#">
              Home
            </a>

            <a href="#how">
              How It Works
            </a>

            <a href="#universities">
              Universities
            </a>

            <a href="#why">
              Why Us
            </a>

          </nav>



        </div>

      </header>








      {/* HERO SECTION */}

      <section className="bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 text-white py-28 px-6">


        <div className="max-w-6xl mx-auto text-center">



          <p className="uppercase tracking-widest font-bold text-blue-200 mb-5">

            The easiest way to find your college roommate

          </p>





          <h2 className="text-5xl md:text-7xl font-black leading-tight">

            Find Your Perfect
            <br />

            College Roommate

          </h2>






          <p className="max-w-3xl mx-auto mt-8 text-xl text-blue-100 leading-relaxed">

            Create your student profile, share your personality,
            and connect with thousands of incoming students before move-in day.

          </p>







          <div className="flex flex-col md:flex-row justify-center gap-5 mt-10">


            <Link href="/submit">

              <button className="bg-yellow-400 text-black px-10 py-4 rounded-xl text-xl font-black hover:bg-yellow-300">

                Get Featured For $8

              </button>

            </Link>





            <button className="border-2 border-white px-10 py-4 rounded-xl text-xl font-bold hover:bg-white hover:text-blue-700">

              Learn More

            </button>




          </div>




        </div>


      </section>









      {/* STATS */}


      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6 py-16">


        <div className="bg-white shadow-xl rounded-3xl p-8 text-center border">


          <h3 className="text-5xl font-black text-blue-700">
            500+
          </h3>


          <p className="text-gray-700 font-semibold mt-3">
            Universities
          </p>


        </div>





        <div className="bg-white shadow-xl rounded-3xl p-8 text-center border">


          <h3 className="text-5xl font-black text-blue-700">
            10K+
          </h3>


          <p className="text-gray-700 font-semibold mt-3">
            Students Connected
          </p>


        </div>





        <div className="bg-white shadow-xl rounded-3xl p-8 text-center border">


          <h3 className="text-5xl font-black text-blue-700">
            &lt;1hr
          </h3>


          <p className="text-gray-700 font-semibold mt-3">
            Average Posting Time
          </p>


        </div>



      </section>









      {/* HOW IT WORKS */}


      <section id="how" className="bg-slate-50 py-24 px-6">


        <h2 className="text-5xl font-black text-center mb-16">

          How It Works

        </h2>





        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">



          <div className="bg-white rounded-3xl shadow-lg p-10 text-center">


            <div className="text-6xl mb-5">
              ✍️
            </div>


            <h3 className="text-2xl font-black">
              Create Profile
            </h3>


            <p className="text-gray-700 mt-4">
              Add your bio, university, Instagram and photos.
            </p>


          </div>





          <div className="bg-white rounded-3xl shadow-lg p-10 text-center">


            <div className="text-6xl mb-5">
              📸
            </div>


            <h3 className="text-2xl font-black">
              Get Featured
            </h3>


            <p className="text-gray-700 mt-4">
              Your profile is shared with incoming students.
            </p>


          </div>





          <div className="bg-white rounded-3xl shadow-lg p-10 text-center">


            <div className="text-6xl mb-5">
              🤝
            </div>


            <h3 className="text-2xl font-black">
              Connect
            </h3>


            <p className="text-gray-700 mt-4">
              Find roommates before arriving on campus.
            </p>


          </div>



        </div>


      </section>      {/* UNIVERSITIES */}

      <section id="universities" className="py-24 px-6">


        <h2 className="text-5xl font-black text-center mb-12">

          Students From Top Universities

        </h2>




        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-5">


          {[
            "LSU",
            "PVAMU",
            "University of Alabama",
            "Texas A&M",
            "Mizzou",
            "Ole Miss",
            "Georgia",
            "Auburn",
            "Florida State",
            "Arkansas",
            "Tennessee",
            "Mississippi State"
          ].map((school)=>(


            <div

              key={school}

              className="bg-white border-2 border-gray-200 shadow-md px-8 py-4 rounded-2xl font-bold text-gray-900"

            >

              {school}

            </div>


          ))}



        </div>



      </section>









      {/* WHY US */}


      <section id="why" className="bg-blue-50 py-24 px-6">


        <h2 className="text-5xl font-black text-center mb-16">

          Why Choose Roommate Connect?

        </h2>





        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">



          <div className="bg-white rounded-3xl shadow-lg p-10">


            <h3 className="text-2xl font-black mb-4">

              🎓 Student Focused

            </h3>


            <p className="text-gray-700">

              Built specifically to help college students find roommates before campus arrival.

            </p>


          </div>






          <div className="bg-white rounded-3xl shadow-lg p-10">


            <h3 className="text-2xl font-black mb-4">

              ⚡ Fast Posting

            </h3>


            <p className="text-gray-700">

              Profiles are reviewed and prepared quickly after submission.

            </p>


          </div>







          <div className="bg-white rounded-3xl shadow-lg p-10">


            <h3 className="text-2xl font-black mb-4">

              📱 Social Reach

            </h3>


            <p className="text-gray-700">

              Get your profile in front of students searching for roommates.

            </p>


          </div>





        </div>


      </section>









      {/* PRICING */}


      <section className="py-24 px-6 text-center">


        <h2 className="text-5xl font-black mb-6">

          Simple Pricing

        </h2>




        <p className="text-xl text-gray-700 mb-10">

          One profile feature. One simple payment.

        </p>





        <div className="max-w-md mx-auto bg-white shadow-2xl rounded-3xl border p-10">


          <h3 className="text-6xl font-black text-blue-700">

            $8

          </h3>


          <p className="text-gray-700 mt-3">

            Complete profile feature

          </p>




          <ul className="text-left mt-8 space-y-4 font-semibold text-gray-900">


            <li>
              ✅ Instagram feature
            </li>


            <li>
              ✅ Up to 10 photos
            </li>


            <li>
              ✅ Student visibility
            </li>


            <li>
              ✅ Fast review
            </li>


          </ul>





          <Link href="/submit">

            <button className="mt-8 w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl font-black text-lg">

              Start Your Profile

            </button>


          </Link>



        </div>


      </section>









      {/* FINAL CTA */}


      <section className="bg-blue-700 text-white py-24 px-6 text-center">


        <h2 className="text-5xl font-black mb-6">

          Find Your Roommate Before Move-In Day

        </h2>




        <p className="text-xl text-blue-100 mb-10">

          Join students already connecting across universities.

        </p>





        <Link href="/submit">


          <button className="bg-yellow-400 text-black px-12 py-5 rounded-xl text-xl font-black hover:bg-yellow-300">

            Get Featured Today

          </button>


        </Link>



      </section>









      {/* FOOTER */}


      <footer className="bg-slate-950 text-white py-12 text-center">


        <h3 className="text-3xl font-black">

          Roommate Connect

        </h3>



        <p className="text-gray-400 mt-3">

          Helping college students connect before campus life begins.

        </p>



        <p className="text-gray-500 mt-6 text-sm">

          © 2026 Roommate Connect. All rights reserved.

        </p>


      </footer>



    </main>

  );

}