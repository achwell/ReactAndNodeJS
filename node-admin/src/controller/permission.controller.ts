import {Request, Response} from "express"
import {Permission} from "../entity/permission.entity"
import {AppDataSource} from "../../data-source";

export const Permissions = async (req: Request, res: Response) => {
    const repository = AppDataSource.getRepository(Permission);

    res.send(await repository.find());
}