import { deleteMahasiswa, getMahasiswaByNpm, updateMahasiswa } from "@/data/mahasiswa";
import { Mahasiswa } from "@/types/Mahasiswa";
import Response from "@/types/Respones";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
    req: NextRequest,
    { params }: { params: { npm: string } }
) : Promise<NextResponse<Response<Mahasiswa | null>>> {
    const npm = params.npm;
    const mahasiswa = await getMahasiswaByNpm(npm);
    
    if (!mahasiswa) {
        const responseData: Response<null> = {
            message: "Data mahasiswa tidak ditemukan",
            data: null,
        };
        return NextResponse.json(responseData, { status: 404 });
    }

    const responseData: Response<Mahasiswa> = {
        message: "Data mahasiswa berhasil diambil",
        data: mahasiswa,
    };
    return NextResponse.json(responseData);}

export async function PUT(
    req: NextRequest,
    { params }: { params: { npm: string } }
) : Promise<NextResponse<Response<Mahasiswa | null>>> {
    const { nama, kelas, jurusan } = await req.json();
    const npm = params.npm;
    const newMahasiswa: Mahasiswa = { npm, nama, kelas, jurusan };

    const updatedMahasiswa = await updateMahasiswa(newMahasiswa);

    if (!updatedMahasiswa) {
        const responseData: Response<null> = {
            message: "Data mahasiswa tidak ditemukan",
            data: null,
        };

        return NextResponse.json(responseData, { status: 404 });
    }
        const responseData: Response<Mahasiswa> = {
            message: "Data mahasiswa berhasil diupdate",
            data: updatedMahasiswa,
        };

        return NextResponse.json(responseData);
    
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { npm: string } }
) : Promise<NextResponse<Response<null>>> {
    const npm = params.npm;
    const deletedMahasiswa = await deleteMahasiswa(npm);

    if (!deletedMahasiswa) {
        const responseData: Response<null> = {
            message: "Data mahasiswa tidak ditemukan",
            data: null,
        };

        return NextResponse.json(responseData, { status: 404 });
    } 
        const responseData: Response<null> = {
            message: "Data mahasiswa berhasil dihapus",
            data: null,
        };

        return NextResponse.json(responseData);
    
}