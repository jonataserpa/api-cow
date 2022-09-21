import { PartialType } from '@nestjs/swagger';
import { CreateCattleDto } from './create-cattle.dto';

export class UpdateCattleDto extends PartialType(CreateCattleDto) {}
