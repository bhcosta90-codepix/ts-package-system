import { Transaction } from "../transaction.entity";
export interface TransactionRepository {
    insertNewTransaction(transaction: Transaction.Entity): Promise<void>;
    updateStatus(id: string, status: Transaction.Status): Promise<void>;
}
//# sourceMappingURL=transaction.repository.d.ts.map