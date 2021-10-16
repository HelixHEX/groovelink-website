import { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { useToast } from '@chakra-ui/toast'

const CheckAccount = () => {
    const router = useRouter()
    const [session] = useSession()
    const toast = useToast()
    useEffect(() => {
        const main = async () => {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/check-account`, {
                spotifyId: session.user.id,
                name: session.user.name,
                email: session.user.email,
                picture: session.user.picture ? session.user.picture : null
            }).then(res => {
                if (res.data.success) router.push('/')
                else if (res.data.error === 'Create account') router.push('/onboard')
                else toast({
                    title: 'Uh Oh :(',
                    description: res.data.error,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
            })
        }
        main()
    }, [router, session.user.email, session.user.id, session.user.name, session.user.picture, toast])

    return null
}

export default CheckAccount