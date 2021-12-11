import { Request, Response, NextFunction } from "express";
import {
    getAllUsersTransfer, makeTransfer, updateTransfer,
    deleteAllTransfer,
    deleteTransferById,
} from "../services/transaction.service";
import { get } from "lodash"
import { v4 as uuidv4 } from 'uuid';
import log from "../logger";

const makeTransaction = async (req: Request, res: Response) => {
    try {
        const data = { ...req.body, referenceId: uuidv4(), created_at: Date.now() };
        var returnModel = await makeTransfer(data);
        res.send(returnModel)
    } catch (e) {
        res.statusCode = 401;
        res.send({ message: e })
    }

}

const updateTransaction = async (req: Request, res: Response) => {
    try {
        const refId: string = get(req.body, "referenceId");
        if (refId) {
            var returnModel = await updateTransfer({ referenceId: refId }, { ...req.body });
            res.send(returnModel)
        } else {
            throw new Error("unsaved Transaction");
        }

    } catch (e) {
        res.statusCode = 401;
        res.send({ message: e })
    }

}

const getAllTransactions = async (req: Request, res: Response) => {
    try {
        const user: string = get(req, "user");
        const refId = get(user, "_id");
         if (refId) {
            var returnModel = await getAllUsersTransfer(refId);
            res.send(returnModel)
        } else {
            throw new Error("unsaved Transaction");
        }

    } catch (e) {
        log.error(e + "")
        res.statusCode = 401;
        res.send({ message: e })
    }
}

const deleteAllTransactions = async (req: Request, res: Response) => {
    try {
        const user: string = get(req, "user");
        const refId = get(user, "_id");
         if (refId) {
            var returnModel = await deleteAllTransfer({ to: refId, from:refId });
            res.send(returnModel)
        } else {
            throw new Error("unsaved Transaction");
        }

    } catch (e) {
        log.error(e + "")
        res.statusCode = 401;
        res.send({ message: e })
    }
}


// deleteAllTransfer
// deleteTransferBbyId



const deleteTransactionById = async (req: Request, res: Response) => {
    try {
        // const user: string = get(req, "user");
        const id: string = req.query?.id as string;  
        // const refId = get(user, "_id");
        console.log(id)
        if (id) {
            var returnModel = await deleteTransferById({ _id: id });
            res.send(returnModel)
        } else {
            throw new Error("unsaved Transaction");
        }

    } catch (e) {
        log.error(e + "===transaction controler");
        res.statusCode = 401;
        res.send({ message: e })
    }
}


export {
    deleteTransactionById,
    updateTransaction,
    makeTransaction,
    getAllTransactions,
    deleteAllTransactions,
}