import { IDataServices, TransferEntity, UserEntity } from '../../../../domain';
import { TransferFactoryService } from '../../factories';
import { GetHistoryTransferUseCase } from '../getHistoryTransfer.use-case';
import { Observable } from 'rxjs';
describe('Get History Transfer Use Case', () => {
  let getHistoryTransferUseCase: GetHistoryTransferUseCase;
  let dataService: IDataServices;

  beforeEach(() => {
    dataService = {
      transfer: {
        getAll: jest.fn(),
      },
    } as any as IDataServices;

    const userFactoryService = {
      createNewTransfer: jest.fn(),
    } as any as TransferFactoryService;

    getHistoryTransferUseCase = new GetHistoryTransferUseCase(
      dataService,
      userFactoryService,
    );
  });

  it('should return list history transfer', (done) => {
    const idUser = '56a3203d-facf-436d-9faa-e2f739c4fb90';
    const arrTransfer: TransferEntity[] = [
      {
        id: 'a0818ec2-51c8-4553-9615-2d6c162b6e6f',
        toEmail: 'hernan.velasquez@sofka.com.co',
        fromEmail: 'maria.barretog@cecar.edu.co',
        valueTransfer: 500,
        date: new Date(),
        user: {
          id: '56a3203d-facf-436d-9faa-e2f739c4fb90',
          fullName: 'MARIA FERNANDA BARRETO GOMEZ',
          typeDocument: 'CC',
          numberDocument: '10055620934',
          email: 'maria.barretog@cecar.edu.co',
          deposit: 0,
        } as UserEntity,
      },
      {
        id: 'faceabdd-fced-4ea9-b840-555f6fd64831',
        toEmail: 'hernan.velasquez@sofka.com.co',
        fromEmail: 'maria.barretog@cecar.edu.co',
        valueTransfer: 500,
        date: new Date(),
        user: {
          id: '56a3203d-facf-436d-9faa-e2f739c4fb90',
          fullName: 'MARIA FERNANDA BARRETO GOMEZ',
          typeDocument: 'CC   ',
          numberDocument: '10055620934',
          email: 'maria.barretog@cecar.edu.co',
          deposit: 0,
        } as UserEntity,
      },
      {
        id: 'e2ddff42-0866-4512-9605-f135d398ce45',
        toEmail: 'hernan.velasquez@sofka.com.co',
        fromEmail: 'maria.barretog@cecar.edu.co',
        valueTransfer: 500,
        date: new Date(),
        user: {
          id: '56a3203d-facf-436d-9faa-e2f739c4fb90',
          fullName: 'MARIA FERNANDA BARRETO GOMEZ',
          typeDocument: 'CC   ',
          numberDocument: '10055620934',
          email: 'maria.barretog@cecar.edu.co',
          deposit: 0,
        } as UserEntity,
      },
      {
        id: '79d99614-21c6-48a3-be03-e6e9ec536997',
        toEmail: 'hernan.velasquez@sofka.com.co',
        fromEmail: 'maria.barretog@cecar.edu.co',
        valueTransfer: 500,
        date: new Date(),
        user: {
          id: '56a3203d-facf-436d-9faa-e2f739c4fb90',
          fullName: 'MARIA FERNANDA BARRETO GOMEZ',
          typeDocument: 'CC   ',
          numberDocument: '10055620934',
          email: 'maria.barretog@cecar.edu.co',
          deposit: 0,
        } as UserEntity,
      },
    ];

    const arrExpect: TransferEntity[] = [
      {
        id: 'a0818ec2-51c8-4553-9615-2d6c162b6e6f',
        toEmail: 'hernan.velasquez@sofka.com.co',
        fromEmail: 'maria.barretog@cecar.edu.co',
        valueTransfer: 500,
        date: new Date(),
        user: {
          id: '56a3203d-facf-436d-9faa-e2f739c4fb90',
          fullName: 'MARIA FERNANDA BARRETO GOMEZ',
          typeDocument: 'CC',
          numberDocument: '10055620934',
          email: 'maria.barretog@cecar.edu.co',
          deposit: 0,
        } as UserEntity,
      },
      {
        id: 'faceabdd-fced-4ea9-b840-555f6fd64831',
        toEmail: 'hernan.velasquez@sofka.com.co',
        fromEmail: 'maria.barretog@cecar.edu.co',
        valueTransfer: 500,
        date: new Date(),
        user: {
          id: '56a3203d-facf-436d-9faa-e2f739c4fb90',
          fullName: 'MARIA FERNANDA BARRETO GOMEZ',
          typeDocument: 'CC   ',
          numberDocument: '10055620934',
          email: 'maria.barretog@cecar.edu.co',
          deposit: 0,
        } as UserEntity,
      },
      {
        id: 'e2ddff42-0866-4512-9605-f135d398ce45',
        toEmail: 'hernan.velasquez@sofka.com.co',
        fromEmail: 'maria.barretog@cecar.edu.co',
        valueTransfer: 500,
        date: new Date(),
        user: {
          id: '56a3203d-facf-436d-9faa-e2f739c4fb90',
          fullName: 'MARIA FERNANDA BARRETO GOMEZ',
          typeDocument: 'CC   ',
          numberDocument: '10055620934',
          email: 'maria.barretog@cecar.edu.co',
          deposit: 0,
        } as UserEntity,
      },
      {
        id: '79d99614-21c6-48a3-be03-e6e9ec536997',
        toEmail: 'hernan.velasquez@sofka.com.co',
        fromEmail: 'maria.barretog@cecar.edu.co',
        valueTransfer: 500,
        date: new Date(),
        user: {
          id: '56a3203d-facf-436d-9faa-e2f739c4fb90',
          fullName: 'MARIA FERNANDA BARRETO GOMEZ',
          typeDocument: 'CC   ',
          numberDocument: '10055620934',
          email: 'maria.barretog@cecar.edu.co',
          deposit: 0,
        } as UserEntity,
      },
    ];

    jest.spyOn(dataService.transfer, 'getAll').mockImplementation(
      () =>
        new Observable((subscribe) => {
          subscribe.next(arrTransfer);
          subscribe.complete();
        }),
    );

    const $result = getHistoryTransferUseCase.historyTransferUseCase(idUser);

    $result.subscribe({
      next: (history) => {
        expect(history).toEqual(arrExpect);
      },
      complete: () => done(),
    });
  });
});
