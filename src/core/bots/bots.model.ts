import {
   Association,
   BelongsTo,
   Column,
   DataType,
   ForeignKey,
   Model,
   Table,
} from 'sequelize-typescript';
import { User } from 'src/core/users/users.model';
import { CreateBotDto } from './dto';

@Table({ tableName: 'bots' })
export class Bot extends Model<Bot, CreateBotDto> {
   @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
   })
   botId: number;

   // @Column({ type: DataType.STRING, allowNull: false })
   // username: string;

   // @Column({ type: DataType.STRING, allowNull: false })
   // server: string;

   @ForeignKey(() => User)
   @Column({ type: DataType.INTEGER })
   userId: number;

   @BelongsTo(() => User)
   user: User;
}
