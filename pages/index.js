import { useSession, signOut } from "next-auth/client"

import {
  Text,
  Button,
  Flex,
} from '@chakra-ui/react'

import Nav from '../components/nav'
import RightNav from "../components/rigthnav"
import UserCards from '../components/usercards'

export default function Home() {
  const [session] = useSession()
  return (
    <>
      {/* <Text>Welcome {session.user.id}</Text> */}
      {/* <Button onClick={signOut}>Sign out</Button> */}
      <Flex w='100%' h='100vh' p={3}>
        <Nav session={session} />
        <Flex flexDir='column' w='70%' h='100%' >
          <Text alignSelf='center' fontSize={50} color='#032F95'>Discover</Text>
          <Flex mt={10} alignSelf='center'>
            <Button right={10} margin='auto' color='#00F3F8' bg='#032F95'>Skip</Button>
            <UserCards />
            <Button left={10} margin='auto' color='#00F3F8' bg='#032F95'>Add</Button>
          </Flex>
        </Flex>
        <RightNav />
      </Flex>
    </>
  )
}
