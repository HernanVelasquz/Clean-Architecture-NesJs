import { UseGuards } from '@nestjs/common';
import { Query, Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { from, Observable } from 'rxjs';

import {
  GetHistoryTransferUseCase,
  RegisterTransferUseCase,
} from 'src/application';
import { TransferDtoInput } from './dto/input';
import { TransferOutputDto } from './dto/output';

@ApiTags('Transfer')
// @UseGuards(AuthGuard('jwt'))
@Resolver()
export class TransferResolver {
  constructor(
    private readonly registerTransferUseCase: RegisterTransferUseCase,
    private readonly getHistoryTransferUseCase: GetHistoryTransferUseCase,
  ) {}

  /**
   * Registra una nueva transferencia de fondos.
   * @method registerTransfer
   * @param {TransferDto} createUserDto - DTO de transferencia que contiene la información de la transferencia.
   * @returns {Observable<TransferEntity>} Observable que emite la entidad de transferencia registrada.
   */
  @ApiResponse({
    status: 201,
    description: 'Transferencia registrada',
  })
  @ApiResponse({
    status: 400,
    description: 'Fondos insuficientes en la cuenta',
  })
  @ApiResponse({
    status: 500,
    description:
      'Al usuario que quiere realizar la transferencia no tiene cuenta registrada',
  })
  @Mutation(() => TransferOutputDto)
  registerTransfer(
    @Args('createTransferDto') createTransferDto: TransferDtoInput,
  ): Observable<TransferOutputDto> {
    return from(
      this.registerTransferUseCase.registerTransfer(createTransferDto),
    );
  }
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
