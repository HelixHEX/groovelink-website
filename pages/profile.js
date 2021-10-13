import {
    Flex,
    Text
} from '@chakra-ui/react'

import Nav from '../components/nav'

const Profile = () => {
    return (
        <>
            <Flex w='100vw' h='100vh' p={3}>
                <Nav />
            </Flex>
        </>
    )
}

export default Profile