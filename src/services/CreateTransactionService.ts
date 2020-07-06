import TransactionsRepository from '../repositories/TransactionsRepository';
import BalanceTransactionService from './BalanceTransactionService';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    if (!['income', 'outcome'].includes(type)) {
      throw Error('Invalid type, the transaction will not be create');
    }

    const transactions = this.transactionsRepository.all();

    if (type === 'outcome') {
      const balance = BalanceTransactionService.execute(transactions);

      const total = balance.total - value;

      if (total < 0) {
        throw Error('You do not have enough balance to outcome');
      }
    }
    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
