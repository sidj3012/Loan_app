export interface Loan {
    _id: string,
    username?: string,
    name: String,
    amount:Number,
    tenure:Number,
    employmentStatus?: String,
    reason?: String,
    isVerified?:Boolean,
    isApproved?:Boolean,
    isRejected?:Boolean,
    date?: Date,
}