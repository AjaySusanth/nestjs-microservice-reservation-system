import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "@app/common";

@Schema({versionKey:false})

export class UserDocument extends AbstractDocument {

    @Prop()
    email:string
    @Prop()
    password:string
    
}

export const UserSchema = SchemaFactory.createForClass(UserDocument)
//SchemaFactory.createForClass(YourClass) convert the class to a Mongoose schema.