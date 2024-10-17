import { RequestHandler } from "express";
import Loan from "../models/loan";

export const getLoans:RequestHandler = async (req, res) => {
    try{
        const loans = await Loan.find().exec();
        res.status(200).json(loans);
    }
    catch(error){
        console.log(error);
        res.status(500);
    }
}

export const createLoan: RequestHandler = async (req,res) => {
    const username = req.body.username;
    const name = req.body.name;
    const amount= req.body.amount;
    const tenure= req.body.tenure;
    const employmentStatus= req.body.employmentStatus;
    const reason = req.body.reason;
    const isVerified= req.body.isVerified;
    const  isApproved= req.body.isApproved;
    const  isRejected= req.body.isRejected;
    const date= req.body.date;
    try{
        

        const newLoan = await Loan.create({
            username: username,
            name : name,
            amount: amount,
            tenure: tenure,
            employmentStatus: employmentStatus,
            reason : reason,
            isVerified: isVerified,
            isApproved: isApproved,
            isRejected: isRejected,
            date: date,
        });

        res.status(201).json(newLoan);
    }
    catch(error){
        console.log(error);
        res.status(500);
    }
};