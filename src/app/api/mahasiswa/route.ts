import { getAllMahasiswa, createMahasiswa } from "@/data/mahasiswa";
import { Mahasiswa } from "@/types/Mahasiswa";
import Response from "@/types/Respones";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() : Promise<NextResponse<Response<Mahasiswa[]>>> {
  const mahasiswa = await getAllMahasiswa();
  const data: Response<Mahasiswa[]> = {
    message: "Data mahasiswa berhasil diambil",
    data: mahasiswa,
  };

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) : Promise<NextResponse<Response<Mahasiswa>>> {
  const { npm, nama, kelas, jurusan } = await req.json();
  const newMahasiswa: Mahasiswa = { npm, nama, kelas, jurusan };

  const createdMahasiswa = await createMahasiswa(newMahasiswa);
  const responseData: Response<Mahasiswa> = {
    message: "Data mahasiswa berhasil ditambahkan",
    data: createdMahasiswa,
  };

  return NextResponse.json(responseData);
}
