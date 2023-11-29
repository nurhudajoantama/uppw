import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function openDb() {
  return open({
    filename: "./db.sqlite",
    driver: sqlite3.Database,
  });
}

(async () => {
  const db = await openDb();

  // create table on first run
  await db.all(`
        CREATE TABLE IF NOT EXISTS mahasiswa (
        npm VARCHAR(10) PRIMARY KEY,
        nama VARCHAR(100),
        kelas VARCHAR(7),
        jurusan VARCHAR(20)
        );
    `);
})();
