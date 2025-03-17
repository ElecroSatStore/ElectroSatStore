import Credentials from "next-auth/providers/credentials";


const authConfig = {
    providers: [
        Credentials({
          credentials: {
            email: {},
            password: {},
          },
          authorize: async (credentials) => {
            console.log(credentials)
            try {
              const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
              console.log(API_URL)
              const res = await fetch(API_URL+'/api/login/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: credentials.email,
                  password: credentials.password,
                }),
              });
          
              if (!res.ok) {
                console.error(`Error: ${res.statusText} (${res.status})`);
                const error = await res.json()
                console.log(error.message);
                throw new Error(error.message);
    
              }
          
              const data = await res.json();
              if (!data || !data.user) {
                return null; 
              }
              console.log(data);
              return data.user; 
          
            } catch (err) {
              console.error("Authorization error:", err);
              return null; 
            }
          }
          
        }),
      ],
};

export default authConfig;
