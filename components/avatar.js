import {
    Flex,
    Text,
    Image
} from '@chakra-ui/react'

const Avatar = (props) => {
    return (
        <>
            {props.src ? <Image {...props} /> :
                <Flex {...props} justifyContent='center' bg='blue.400' >
                    <Text alignSelf='center' color='white'>{props.name.charAt(0).toUpperCase()}</Text>
                </Flex>
            }
        </>
    )
}

export default Avatar