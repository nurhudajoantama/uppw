"use client";

import { useToast } from "@chakra-ui/react";
import { Mahasiswa } from "@/types/Mahasiswa";
import { Button, FormControl, FormHelperText, FormLabel, Input, Text } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home({ params : { npm } } : any) {
  const toast = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Mahasiswa>();

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/api/mahasiswa/${npm}`)
      .then((response) => response.json())
      .then((data) => {
        reset(data.data)
        setShowForm(true);
    });
  }, []);

  function onSubmit(data: Mahasiswa) {
    fetch(`http://localhost:3000/api/mahasiswa/${npm}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        toast({
          title: "Data berhasil diubah",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        router.push("/mahasiswa");
      } else {
        toast({
          title: "Data gagal diubah",
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

      <form onSubmit={handleSubmit(onSubmit)} style={{
        display: showForm ? "block" : "none"
      }}>
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
          Update
        </Button>
      </form>
    </Container>
  );
}