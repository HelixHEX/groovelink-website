import { useSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

import {
    Button,
    Flex
} from '@chakra-ui/react';

const Login = () => {
    const router = useRouter()
    const [session] = useSession();

    if (session) router.push('/')

    const handleLogin = () => {
        signIn("spotify", { callbackUrl: "http://localhost:3000/checkaccount" });
    };

    return (
        <Flex w='100%' h='100vh' justifyContent='center' alignContent='center'>
            <Button _hover={{bg: 'white.200', color: 'white.800'}} bg='green.400' color='white' rounded={70} w={300} h={70} alignSelf='center' onClick={() => handleLogin()}>Login with Spotify</Button>
        </Flex>
        // <button onClick={() => handleLogin()}>login</button>
    )
}
export default Login