import { Request, Response } from 'express';
import {SUCCESS,FAIL,ERROR} from '../utils/httpStatusText'
import asyncWrapper from '../middlewares/asyncWrapper';
import { addAdminService } from '../services/addAdmin.service';
import { getMedicineByName } from '../services/searchForMedicineByName';
import { getMedicineByMeidinalUse } from '../services/filterMedicineByMedicinalUse';

const Pharmacist = require('../schemas/pharmacist');
const { ObjectId } = require('mongodb');
const Joi = require('joi');

export const filterMedicineByMedicinalUse =async (req:Request, res: Response) => {
  const medicines = await  getMedicineByMeidinalUse(req.body.medicinalUse);
  if (medicines.length== 0)
  res.json("There's no available medicines with this medicinalUse");
else{
  res.json({success: SUCCESS, data: medicines});
}
  }
  

export const serachForMedicine =async (req:Request, res: Response) => {
  const medicine = await  getMedicineByName(req.body.name);
  if (medicine.length== 0)
  res.json("There's no available medicines with this name");
else{
  res.json({success: SUCCESS, data: medicine});
}
  }
  

export const addAdmin = asyncWrapper( async ( req: Request,res: Response) => { 
    const admin = await addAdminService(req.body);
    res.json({ success: SUCCESS, data: admin });
})


export const getAllPharmacists = async (req: Request, res: Response) => {
    Pharmacist.find() 
      .sort({ createdAt: -1 })
      .then((result: any[]) => { 
        res.send(result);
      })
      .catch((err: Error) => {
        console.log(err);
      });
};





export const getPendingPharmacists = async (req: Request, res: Response) => {
    Pharmacist.find({status: "Pending"}) 
    .sort({ createdAt: -1 })
    .then((result: any[]) => { 
      res.send(result);
    })
    .catch((err: Error) => { 
      console.log(err);
    });
};




export const getPharmacistByID = async (req: Request, res: Response) => {
    if (ObjectId.isValid(req.params.id)) {
        Pharmacist.findById(req.params.id)
          .then((result: any) => {
            res.send(result);
          })
          .catch((err: Error) => {
            console.log(err);
          });
        } else {
          res.status(400).send("Invalid ID");
        }

}