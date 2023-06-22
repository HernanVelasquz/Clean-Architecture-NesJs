import { TransferEntity } from '../transfer.entity';

describe('Transfer Entity', () => {
  it('test_create_user_with_required_fields', () => {
    const transfer = new TransferEntity();
    transfer.id = '1';
    transfer.toEmail = 'recipient@example.com';
    transfer.fromEmail = 'sender@example.com';
    transfer.valueTransfer = 100;
    transfer.date = new Date();

    expect(transfer.id).toBe('1');
    expect(transfer.toEmail).toBe('recipient@example.com');
    expect(transfer.fromEmail).toBe('sender@example.com');
    expect(transfer.valueTransfer).toBe(100);
    expect(transfer.date).toBeInstanceOf(Date);
  });
});
