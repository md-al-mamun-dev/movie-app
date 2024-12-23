"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Register() {
  const router = useRouter()
  // firstname, 
  // lastname,
  // email,
  // password: hashedPassword,
  async function onFormSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const firstname = formData.get("firstname")
    const lastname = formData.get("lastname")
    const email = formData.get("email")
    const password = formData.get("password")
    const confirmPassword = formData.get("confirmPassword")



    const payload = {
                    firstname,
                    lastname,
                    email,
                    password,
                    confirmPassword
                };
    try {
        // const response = await fetch(`/api/auth/login`, {
        const response = await fetch(`${process.env.BASE_URL}/api/auth/signup`, {            
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const resJson  = await response.json()

        if(resJson.success){
          console.log(resJson)
            // setUser(data?.user)
            router.push('/user/login')
        }
    } catch (error) {
        
    }
  }


  return (
    <div
    class="bg-moviedb-black min-h-screen flex items-center justify-center p-4"
  >
    <div class="w-full max-w-md bg-black/70 rounded-lg p-8 shadow-xl">
      <div class="text-center">
        <h1 class="text-white text-3xl font-bold mb-6">Create Your Account</h1>

        <form onSubmit={onFormSubmit} id="signupForm" class="space-y-4">
          <input
            name="firstname"
            type="text"
            placeholder="First Name"
            class="w-full p-3 bg-moviedb-gray text-black rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
            required
          />
          <input
            name="lastname"
            type="text"
            placeholder="Last Name"
            class="w-full p-3 bg-moviedb-gray text-black rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            class="w-full p-3 bg-moviedb-gray text-black rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Create Password"
            class="w-full p-3 bg-moviedb-gray text-black rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
            required
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            class="w-full p-3 bg-moviedb-gray text-black rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
            required
          />

          <div class="text-left text-moviedb-gray text-sm">
            <label class="flex items-center">
              <input type="checkbox" class="mr-2" required />
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>

          <button
            type="submit"
            class="w-full bg-moviedb-red text-white py-3 rounded hover:bg-red-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <div class="mt-6 text-moviedb-gray">
          Already have an account?
          <Link href="/user/login" class="text-white hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  </div>
  )
}
