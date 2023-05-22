import {
   BelongsToMany,
   Column,
   DataType,
   HasMany,
   Model,
   Table,
} from 'sequelize-typescript';
import { RegistrationUserDto } from 'src/auth/dto';
import { Bot } from '../bots/bots.model';

@Table({ tableName: 'users' })
export class User extends Model<User, RegistrationUserDto> {
   @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
   })
   id: number;

   @Column({ type: DataType.STRING, allowNull: false, unique: true })
   email: string;

   @Column({ type: DataType.STRING, allowNull: false })
   username: string;

   @Column({ type: DataType.STRING, allowNull: false })
   password: string;

   @Column({ type: DataType.INTEGER, defaultValue: 0 })
   balance: number;

   @Column({ type: DataType.STRING, defaultValue: 'USER' })
   role: string;

   // @HasMany(() => Bot)
   // bots: Bot[];
}
