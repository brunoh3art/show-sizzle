import { ArrayMinSize, IsNotEmpty, IsString } from 'class-validator';

export class PermissionDTOS {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class Permission {
  @IsString({ each: true })
  @ArrayMinSize(1)
  permissions: string[];
}
