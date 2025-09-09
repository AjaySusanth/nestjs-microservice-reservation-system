import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "@app/common";

export class Reservation {}
@Schema({versionKey:false})

export class ReservationDocument extends AbstractDocument {
    @Prop()
    timestamp:Date
    @Prop()
    startDate:Date
    @Prop()
    endDate:Date
    @Prop()
    userId:string
    
    @Prop() // @Prop() = “Make this property a field in the MongoDB document.”
    
    invoiceId:string
}

export const ReservationSchema = SchemaFactory.createForClass(ReservationDocument)
//SchemaFactory.createForClass(YourClass) convert the class to a Mongoose schema.