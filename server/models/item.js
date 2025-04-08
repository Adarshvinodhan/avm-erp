import mongoose, { model } from "mongoose";

const subCategorySchema = new mongoose.Schema({
    color: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    model: {
        type: String,
    },
    size: {
        type: String,
    }
});

const subCategory = mongoose.model('SubCategory', subCategorySchema);

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
    },
    description: {
        type: String,
    },
    subcategories: {
        type: [subCategory],
    },
    image: {
        type: String,
    }

});

export const Item = mongoose.model('Item', itemSchema);