import mongoose,{InferSchemaType, model} from "mongoose";

const loanSchema = new mongoose.Schema({
    username:{
        type: String,
        
    },
    name: {
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    tenure:{
        type: Number,
        required: true,
    },
    employmentStatus:{
        type: String,
        deafult: "Employed",
    },
    reason:{
        type: String,
        default : "Personal",
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    isApproved:{
        type: Boolean,
        default: false,
    },
    isRejected:{
        type: Boolean,
        default: false,
    },
    date:{
        type: Date,
        default: Date.now,
    }
})


type Loan = InferSchemaType<typeof loanSchema>;
export default model<Loan>("Loan", loanSchema);