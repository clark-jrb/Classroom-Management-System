import { Document, model, Schema } from "mongoose";

interface IUser extends Document {
    firstname: string
    email: string
    password: string
    role: 'student' | 'teacher' | 'admin'
}

const UserSchema = new Schema<IUser>({
    firstname: { type: String, required: true },
    email: { type: String, required: true , unique: true },
    password: { type: String, requird: true },
    role: { type: String, enum: ['student', 'teacher', 'admin'], required: true }
})

const UserModel = model<IUser>('users', UserSchema) 

export { UserModel, IUser }