import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";

import Paginator from "./Paginator";
import {
  Text,
  Table,
  TableCaption,
  TableContainer,
  Tfoot,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import {
  Flex,
  HStack,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import MSpinner from "./MSpinner";
function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearch] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({});

  console.log(setPage, setLimit, setSearch);

  useEffect(() => {
    const getArticles = async (_page, _limit, _searchTerm) => {
      setisLoading(true);
      fetch(
        `http://localhost:3000/api/v1/articles?page=${_page}&limit=${_limit}&searchTerm=${_searchTerm}`
      )
        .then((response) => response.json())
        .then((json) => {
          setArticles(json.payload.data);
          setPagination(json.payload?.info);
        })
        .catch((error) => setError(error))
        .finally(() => setisLoading(false));
    };

    getArticles(page, limit, searchTerm);
  }, [page, limit, searchTerm]);

  if (isLoading) return <MSpinner />;
  if (error) return <h1 style={{ color: "red" }}>{error.message}</h1>;

  return (
    <>
      <Text color={"gray.800"}>List Articles</Text>
      <Flex alignItems="center" justifyContent="flex-end" mx="auto">
        <HStack spacing={3} alignItems="center">
          <InputGroup
            display={{
              base: "none",
              lg: "block",
            }}
            ml="auto"
          >
            <InputLeftElement pointerEvents="none">
              <AiOutlineSearch />
            </InputLeftElement>
            <Input type="tel" placeholder="Search..." 
                value={searchTerm}
            onChange={
              e=>{
               e.preventDefault()
                setSearch(e.target.value)
              } 
            }/>
          </InputGroup>
        </HStack>
      </Flex>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Articles {articles?.length}</TableCaption>
          <Thead>
            <Tr>
              <Th>Code</Th>
              <Th>Libelle</Th>
              <Th>Unité</Th>
              <Th>Type</Th>
              <Th>Taux TVA</Th>
              <Th>Prix 1</Th>
              <Th>Prix 2</Th>
              <Th>Prix 3</Th>
              <Th>Prix 4</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {articles.map((article) => {
              return (
                <Tr key={article.code}>
                  <Td>{article.code}</Td>
                  <Td>{article.libelle}</Td>
                  <Td>{article.unite}</Td>
                  <Td>{article.type}</Td>
                  <Td>{article.tauxtva?.toFixed(2)}</Td>
                  <Td>{article.prix1?.toFixed(3)}</Td>
                  <Td>{article.prix2?.toFixed(3)}</Td>
                  <Td>{article.prix3?.toFixed(3)}</Td>
                  <Td>{article.prix4?.toFixed(3)}</Td>
                  <Td>
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "4px",
                      }}
                    >
                      <FaRegTrashAlt />
                      <FaEdit />
                    </span>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
      <div style={{ height: "50px" }}>
        <Paginator pagination={pagination} page={page} setPage={setPage} />
      </div>
    </>
  );
}

export default ArticleList;
