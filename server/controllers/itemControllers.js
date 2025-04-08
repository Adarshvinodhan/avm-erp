import { Item } from "../models/item";

export const createItem = async (req, res) => {
    try {
        const { name, price, description, subcategories, category } = req.body;
        const item = new Item({
            name,
            price,
            description,
            subcategories,
            category,
        });
        const savedItem = await item.save();
        res.status(201).json(savedItem);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating item" });
    }
};

export const getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching items" });
    }
};

export const getItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json(item);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching item" });
    }
};  

export const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, subCategory, category } = req.body;
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        item.name = name;
        item.price = price;
        item.description = description;
        item.subcategories = subCategory;
        item.category = category;
        const updatedItem = await item.save();
        res.status(200).json(updatedItem);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating item" });
    }
};  