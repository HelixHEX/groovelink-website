import { useSession, signOut } from "next-auth/client"

import {
  Text,
  Button,
  Flex,
} from '@chakra-ui/react'

import Nav from '../components/nav'
import RightNav from "../components/rigthnav"

export default function Home() {
  const [session] = useSession()
  return (
    <>
      {/* <Text>Welcome {session.user.id}</Text> */}
      {/* <Button onClick={signOut}>Sign out</Button> */}
      <Flex w='100%' h='100vh' p={3}>
        <Nav session={session} />
        <Flex w='70%' h='100%'>

        </Flex>
        <RightNav />
      </Flex>
    </>
  )
}
