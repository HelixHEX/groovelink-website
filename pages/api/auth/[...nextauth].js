import NextAuth from "next-auth";
import Providers from "next-auth/providers";

// const options = {
//     providers: [
//         Providers.Spotify({
//             clientId: process.env.SPOTIFY_CLIENT_ID,
//             clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
//             scope:
//                 "user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state user-read-currently-playing user-follow-read playlist-read-private user-read-email user-read-private user-library-read playlist-read-collaborative",
//             profile(profile) {
//                 return {
//                     id: profile.id,
//                     name: profile.display_name,
//                     email: profile.email,
//                     image: profile.images?.[0]?.url
//                 }
//             },
//             // accessTokenUrl: "https://accounts.spotify.com/api/token",
//         }),
//     ],
//     callbacks: {
//         jwt: async (token, _, account) => {
//             if (account) {
//                 token.id = account.id;
//                 token.accessToken = account.accessToken;
//             }
//             return token;
//         },
//         session: async (session, user) => {
//             session.user = user;
//             return session;
//         },
//     },
//     theme: 'light',
//     debug: true
// }

// export default (req, res) => NextAuth(req, res, options)

export default NextAuth({
    providers: [
        Providers.Spotify({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            scope:
                "user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state user-read-currently-playing user-follow-read playlist-read-private user-read-email user-read-private user-library-read playlist-read-collaborative",
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.display_name,
                    email: profile.email,
                    image: profile.images?.[0]?.url
                }
            },
            // accessTokenUrl: "https://accounts.spotify.com/api/token",
        }),
    ],
    callbacks: {
        jwt: async (token, _, account) => {
            if (account) {
                token.id = account.id;
                token.accessToken = account.accessToken;
            }
            return token;
        },
        session: async (session, user) => {
            session.user = user;
            return session;
        },
    },
    theme: 'light',
    debug: true,
    pages: {
        signIn: '/login'
    }
})