import {
    useToast
} from '@chakra-ui/react'
export const toastError = (title, desc) => {
    const toast = useToast()
    toast({
        title: title,
        description: desc,
        status: "error",
        duration: 5000,
        isClosable: true,
      })
}