import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPositive } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

/**
 * @class TransferDto
 * @classdesc DTO para transferencias de fondos entre usuarios.
 * @extends UserEntity
 */
@InputType()
export class TransferDtoInput {
  /**
   * Correo electrónico del destinatario de la transferencia.
   * @member {string}
   */
  @ApiProperty()
  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  toEmail: string;

  /**
   * Correo electrónico del remitente de la transferencia.
   * @member {string}
   */
  @ApiProperty()
  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  fromEmail: string;

  /**
   * Valor de la transferencia.
   * @member {number}
   */
  @ApiProperty()
  @Field(() => Number)
  @IsPositive()
  @IsNotEmpty()
  valueTransfer: number;
}
