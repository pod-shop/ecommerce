import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Sign In',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Username' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' }
      },
      async authorize(credentials, req) {
        const jwt = (await axios.post<{ token: string; }>('http://localhost:8080/auth/login', credentials)).data;
        console.log('jwt:', jwt.token);

        const user = await (await axios.get('http://localhost:8080/auth/details', {
          headers: {
            Authorization: `Bearer ${jwt.token}`
          }
        })).data;

        if (user) {
          user.token = jwt.token;
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  jwt: {
    // secret: process.env.SECRET
  },
  pages: {
    // signIn: '/auth/signin',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) { return true },
    // async redirect({ url, baseUrl }) { return baseUrl },
    // async session({ session, token, user }) { return session },
    // async jwt({ token, user, account, profile, isNewUser }) { return token }
    
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   console.log('async jwt:', { token, user, account, profile, isNewUser })
    //   // if (token?.token) {
    //   //   token.token = token.token;
    //   // }
    //   return token;
    // },
    // async session({ session, token }) {
    //   console.log('session:', { session, token })
    //   return session;
    // }
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV !== 'production',
});
