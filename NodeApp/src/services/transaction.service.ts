import Transaction, { TransactionDocument } from "../schemas/transaction.schema";
import {UpdateQuery,DocumentDefinition,FilterQuery } from "mongoose"

export async function makeTransfer(input: DocumentDefinition<TransactionDocument>) {
    try {
        return await Transaction.create(input);
    } catch (e) {
        throw new Error(e + "");
    }
}

export async function updateTransfer(query: FilterQuery<TransactionDocument>, update: UpdateQuery<TransactionDocument>) {
    try {
        return await Transaction.updateOne(query, update);
    } catch (e) {
        throw new Error(e + "");
    }
}

export async function getAllUsersTransfer(query: string) {
    try {
        return await Transaction.find({}).$where("from").equals(query);
        
    } catch (e) {
        throw new Error(e + "");
    }
}

export async function deleteAllTransfer(query: FilterQuery<TransactionDocument>) {
    try {
        
        return await Transaction.deleteMany(query);
    } catch (e) {
        throw new Error(e + "");
    }
}


export async function deleteTransferById(query: FilterQuery<TransactionDocument>) {
    try {
        
        return await Transaction.findByIdAndDelete(query);
    } catch (e) {
        throw new Error(e + "");
    }
}



