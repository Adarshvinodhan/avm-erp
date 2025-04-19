import { Router } from "express";
import { createItem, deleteItem, getAllItems, updateItem } from "../controllers/itemControllers.js";

const itemRouter = Router();

itemRouter.post('/item',createItem);
itemRouter.get('/items',getAllItems);
itemRouter.put('/item/:id',updateItem);
itemRouter.delete('/item/:id',deleteItem);

export default itemRouter;