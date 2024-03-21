/* eslint-disable react/prop-types */
import { Box, Flex, Icon, chakra } from "@chakra-ui/react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";



function Paginator({ pagination, setPage, page }) {
  const totalItems = getItemsCount(pagination)
  const maxPages = 7;

  let startPage = Math.max(1, page - Math.floor(maxPages / 2));
  let endPage = Math.min(totalItems, startPage + maxPages - 1);

  if (endPage - startPage + 1 < maxPages) {
    startPage = Math.max(1, endPage - maxPages + 1);
  }

  if(Math.floor(totalItems/maxPages)+1< endPage){
      endPage=Math.floor(totalItems/maxPages)+1
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <Flex
      bg="#edf3f8"
      _dark={{
        bg: "#3e3e3e",
      }}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Flex height={"4rem"}>
        <PagButton disabled={page === 1} fireClick={() => setPage(page - 1)}>
          <Icon
            as={IoIosArrowBack}
            color="gray.700"
            _dark={{
              color: "gray.200",
            }}
            boxSize={4}
          />
        </PagButton>
        {pageNumbers.map((pageNumber) => (
          <PagButton
            key={pageNumber}
            active={pageNumber === page}
            p={2}
            fireClick={() => {
              setPage(pageNumber);
            }}
          >
            {pageNumber}
          </PagButton>
        ))}

        <PagButton
          disabled={!pagination.next}
          fireClick={() => setPage(page + 1)}
        >
          <Icon
            as={IoIosArrowForward}
            color="gray.700"
            _dark={{
              color: "gray.200",
            }}
            boxSize={4}
          />
        </PagButton>
        <Box p={10} m={3}>
          <span>{page}</span>/<span>{Math.max((totalItems/maxPages),Math.floor(totalItems/maxPages)+1)}</span>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Paginator;

const PagButton = ({ children, active, disabled, p, fireClick }) => {
  const activeStyle = {
    bg: "teal.600",
    _dark: {
      bg: "teal.500",
    },
    color: "white",
  };
  return (
    <chakra.button
      onClick={fireClick}
      mx={1}
      px={4}
      py={2}
      rounded="md"
      bg="white"
      _dark={{
        bg: "gray.800",
      }}
      color="gray.700"
      disabled={disabled}
      _hover={activeStyle}
      {...(active && activeStyle)}
      cursor={disabled && "not-allowed"}
      display={
        p &&
        !active && {
          base: "none",
          sm: "block",
        }
      }
    >
      {children}
    </chakra.button>
  );
};


function getItemsCount(pagination){
  if(Object.keys(pagination).length === 0) return 0;
  if(pagination.next!== undefined) return pagination.next.count;
  if(pagination.previous !== undefined) return pagination.previous.count
}
