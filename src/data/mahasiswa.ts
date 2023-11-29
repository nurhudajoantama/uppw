import { openDb } from "@/data/db";
import { Mahasiswa } from "@/types/Mahasiswa";
import SQL from "sql-template-strings";


// get all data
export async function getAllMahasiswa(): Promise<Mahasiswa[]> {
    const db = await openDb();
    return db.all("SELECT * FROM mahasiswa");
}

// get data by npm
export async function getMahasiswaByNpm(npm: string): Promise<Mahasiswa | undefined> {
    const db = await openDb();
    const sql = SQL`SELECT * FROM mahasiswa WHERE npm = ${npm}`;
    return db.get(sql);
}

// create data
export async function createMahasiswa(data: Mahasiswa): Promise<Mahasiswa> {
    const db = await openDb();
    const sql = SQL`INSERT INTO mahasiswa (npm, nama, kelas, jurusan) VALUES (${data.npm}, ${data.nama}, ${data.kelas}, ${data.jurusan})`;
    await db.run(sql);
    return data;
}

// update data
export async function updateMahasiswa(data: Mahasiswa): Promise<Mahasiswa | undefined> {
    const db = await openDb();
    const sql = SQL`UPDATE mahasiswa SET nama = ${data.nama}, kelas = ${data.kelas}, jurusan = ${data.jurusan} WHERE npm = ${data.npm}`;
    await db.run(sql);
    return data;
}

// delete data
export async function deleteMahasiswa(npm: string): Promise<boolean> {
    const db = await openDb();
    const sql = SQL`DELETE FROM mahasiswa WHERE npm = ${npm}`;
    // return result
    await db.run(sql);
    return true;
}