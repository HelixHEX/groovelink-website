import { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

const CheckAccount = () => {
    const router = useRouter()
    const [session] = useSession()
    useEffect(() => {
        const main = async () => {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/check-account`, {
                spotifyId: session.user.id,
                name: session.user.name,
                email: session.user.email,
                picture: session.user.picture ? session.user.picture : null
            }).then(res => {
                if (res.status === 200) router.push('/')
            })
        }
        main()
    }, [])

    return null
}

export default CheckAccount