import { Box, AbsoluteCenter, Spinner } from '@chakra-ui/react'

function MSpinner() {
  return (
    <Box  position="relative" h="90vh">
      <AbsoluteCenter p="4" color="transparent" axis="both">
        <Spinner
          size="xl"
          thickness="8px"
          speed="0.65s"
          emptyColor="teal.200"
          color="teal.500"
        />
      </AbsoluteCenter>
    </Box>
  );
}

export default MSpinner;
