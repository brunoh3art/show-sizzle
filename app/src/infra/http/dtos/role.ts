import { ArrayMinSize, IsNotEmpty, IsString } from 'class-validator';

export class RoleDTOS {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class RolePermission {
  @IsString({ each: true })
  @ArrayMinSize(1)
  permissions: string[];
}
