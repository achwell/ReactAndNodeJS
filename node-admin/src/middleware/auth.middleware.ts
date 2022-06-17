import {Request, Response} from "express";
import {verify} from "jsonwebtoken";
import {User} from "../entity/user.entity";
import {AppDataSource} from "../../data-source";

export const AuthMiddleware = async (req: Request, res: Response, next: Function) => {
    try {
        const jwt = req.cookies['jwt']
        const payload: any = verify(jwt, process.env.SECRET_KEY)
        if (!payload) {
            return res.status(401).send({message: 'Unauthenticated'})
        }
        const repository = AppDataSource.getRepository(User)
        const id = payload.id;
        req["user"] = await repository.findOne({where: {id:payload.id}, relations: ['role', 'role.permissions']})
        next()
    } catch (e) {
        console.log({e})
        return res.status(401).send({message: 'unauthenticated'})
    }
}
