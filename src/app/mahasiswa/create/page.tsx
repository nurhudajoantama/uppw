"use client";

import { useToast } from "@chakra-ui/react";
import { Mahasiswa } from "@/types/Mahasiswa";
import { Button, FormControl, FormHelperText, FormLabel, Input, Text } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Home() {
  const toast = useToast();
    const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Mahasiswa>();

  function onSubmit(data: Mahasiswa) {
    fetch("http://localhost:3000/api/mahasiswa", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        reset();

        toast({
          title: "Data berhasil ditambahkan",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        router.push("/mahasiswa");
      } else {
        toast({
          title: "Data gagal ditambahkan",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    });
  }

  return (
    <Container maxW="container.xl" pt={12}>
      <Text fontSize="xl">Data Mahasiswa</Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mt={4}>
          <FormLabel>NPM</FormLabel>
          <Input type="text" {...register("npm", { required: true })} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Nama</FormLabel>
          <Input type="text" {...register("nama", { required: true })} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Kelas</FormLabel>
          <Input type="text" {...register("kelas", { required: true })} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Jurusan</FormLabel>
          <Input type="text" {...register("jurusan", { required: true })} />
        </FormControl>

        <Button type="submit" colorScheme="blue" mt={4}>
          Tambah
        </Button>
      </form>
    </Container>
  );
}
