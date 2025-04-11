import mongoose, { Schema } from 'mongoose';

interface IShop extends Document {
    name: string;
    email: string;
    password: string;
    status: 'active' | 'inactive';
    verify: boolean;
    roles: string[];
}
const DOCUMENT_NAME = 'Shop';
const COLLECTION_NAME = 'Shops';

const shopSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 150
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    verify: {
        type: Schema.Types.Boolean,
        default: false
    },
    roles: {
        type: [String],
        default: []
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})
const ShopModel = mongoose.model<IShop>(DOCUMENT_NAME, shopSchema);
export default ShopModel;