import "dotenv/config";
import express from 'express';
import loansRoutes from "./routes/loans";
import userRoutes from "./routes/users";

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/loans", loansRoutes);





// //Single loan
// app.get("/:loanId", async (req, res) => {
//     const loanId= req.params.loanId;
//     try{
//         const loan = await Loan.findById(loanId).exec();
//         if(!loan) {
//             throw Error("Loan Not found");
//         }
//         res.status(200).json(loan);
//     }
//     catch(error){
//         console.log(error);
//         res.status(500);
//     }
// });



// //Update


// app.patch("/:loanId", async (req,res) => {
//     const loanId = req.params.loanId;

//     const username = req.body.username;
//     const name = req.body.name;
//     const amount= req.body.amount;
//     const tenure= req.body.tenure;
//     const employmentStatus= req.body.employmentStatus;
//     const reason = req.body.reason;
//     const isVerified= req.body.isVerified;
//     const  isApproved= req.body. isApproved;
    
//     try{
//         const loan = await Loan.findById(loanId).exec();

        
//         if(loan!.username != null) loan!.username= username;
//        if(loan!.name!=null) loan!.name = name;
//         if( loan!.amount != null) loan!.amount= amount;
//         if(loan!.tenure != null)    loan!.tenure= tenure;
//          if(loan!.employmentStatus != null)   loan!.employmentStatus= employmentStatus;
//          if(loan!.reason != null)   loan!.reason = reason;
//         if(loan!.isVerified != null)    loan!.isVerified= isVerified;
//          if(loan!.isApproved != null)   loan!.isApproved= isApproved;
        

//         const updatedLoan = await loan!.save();
//         res.status(200).json(updatedLoan);
//     }
//     catch(error){
//         console.log(error);
//         res.status(500);
//     }
// });

export default app;