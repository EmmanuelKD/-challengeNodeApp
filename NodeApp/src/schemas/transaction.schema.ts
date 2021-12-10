import mongoose from "mongoose"


enum TransactionStatus {
    complete = "complete",
    fail = "fail",
    unknown = "unknown",
    // draft = "draft",
    // pending = "pending",
}


export interface TransactionDocument extends mongoose.Document {
    referenceId: String;
    amount: String;
    from: string;
    to: string;
    deleted_at: Date;
    updated_at: Date;
    created_at: Date;
    status: any;
}

const TransactionScheme = new mongoose.Schema(
    {
        referenceId: { type: String, required: true, },
        amount: { type: String, required: true, },
        deleted_at: { type: Date, required: false, },
        from: { type: String, required: true, },
        to: { type: String, required: true, },
        updated_at: { type: Date, required: false, },
        created_at: { type: Date, required: true, },
        status: {
            enum:['complete', 'fail', 'unknown'],
            default: 'unknown',
            type: String,
            required:true,
        } 
    },
    { timestamps: true }
)

export default mongoose.model<TransactionDocument>("Transaction", TransactionScheme)

