import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', name: 'kode_barang' })
  kodeBarang: string;

  @Column({ type: 'varchar', name: 'nama_barang' })
  namaBarang: string;

  @Column({ type: 'varchar', name: 'expired_date' })
  expiredDate: string;

  @Column({ type: 'varchar', name: 'jumlah_barang' })
  jumlahBarang: number;

  @Column({ type: 'varchar', name: 'satuan' })
  satuan: string;

  @Column({ type: 'numeric', name: 'harga_satuan', precision: 12, scale: 2 })
  hargaSatuan: number;
}
