"use client";

import { Mahasiswa } from "@/types/Mahasiswa";
import { AddIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Mahasiswa() {
  const [dataMahasiswa, setDataMahasiswa] = useState<Mahasiswa[]>([]);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [npm, setNpm] = useState<String>("");

  useEffect(() => {
    fetch("http://localhost:3000/api/mahasiswa")
      .then((response) => response.json())
      .then((data) => setDataMahasiswa(data.data));
  }, []);

  function handleDelete(e: any) {
    fetch(`http://localhost:3000/api/mahasiswa/${npm}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        const newDataMahasiswa = dataMahasiswa.filter((mahasiswa) => mahasiswa.npm !== npm);
        setDataMahasiswa(newDataMahasiswa);
        toast({
          title: "Data berhasil dihapus",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
      } else {
        toast({
          title: "Data gagal dihapus",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    });
  }

  function handleDeleteButton(npm: String) {
    setNpm(npm);
    onOpen();
  }

  return (
    <Container maxW="container.xl" pt={12}>
      <Text fontSize="xl">Data Mahasiswa</Text>

      <Flex justifyContent="end">
        <Link href="/mahasiswa/create">
          <Button colorScheme="green">
            <AddIcon /> Add Data
          </Button>
        </Link>
      </Flex>

      <TableContainer mt={7}>
        <Table variant="simple">
          <TableCaption>Data Mahasiswa</TableCaption>
          <Thead>
            <Tr>
              <Th>NPM</Th>
              <Th>Nama</Th>
              <Th>Kelas</Th>
              <Th>Jurusan</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataMahasiswa.map((mahasiswa, i) => (
              <Tr key={i}>
                <Td>{mahasiswa.npm}</Td>
                <Td>{mahasiswa.nama}</Td>
                <Td>{mahasiswa.kelas}</Td>
                <Td>{mahasiswa.jurusan}</Td>
                <Td>
                  <Box>
                    <Link href={`/mahasiswa/${mahasiswa.npm}/edit`}>
                      <Button colorScheme="blue" mr={2}>
                        Edit
                      </Button>
                    </Link>
                    <Button colorScheme="red" onClick={() => handleDeleteButton(mahasiswa.npm)}>
                      Delete
                    </Button>
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* MODAL */}
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef as any} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Mahasiswa
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You cant undo this action afterwards.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef as any} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
}
