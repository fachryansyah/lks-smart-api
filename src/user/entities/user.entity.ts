import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', name: 'tipe_user' })
  tipeUser: string;

  @Column({ type: 'varchar', name: 'nama' })
  nama: string;

  @Column({ type: 'text', name: 'alamat' })
  alamat: string;

  @Column({ type: 'text', name: 'email' })
  email: string;

  @Column({ type: 'varchar', name: 'username' })
  username: string;

  @Column({ type: 'varchar', name: 'telepon' })
  telepon: string;

  @Column({ type: 'varchar', name: 'password' })
  password: string;
}
