import {Request, Response} from "express"
import bcyptjs from "bcryptjs";
import {sign} from "jsonwebtoken";
import {RegisterValidation} from "../validation/register.validation";
import {AppDataSource} from "../../data-source";
import {User} from "../entity/user.entity";
import {Role} from "../entity/role.entity";

export const Register = async (req: Request, res: Response) => {
    const body = req.body
    const {error} = RegisterValidation.validate(body)
    if (error) {
        return res.status(400).send(error.details)
    }
    if (body.password !== body.password_confirm) {
        return res.status(400).send({"message": "\"password_confirm\" must be equal to \"password\""})
    }

    const entity = new User()
    entity.first_name = body.first_name
    entity.middle_name = body.middle_name
    entity.last_name = body.last_name
    entity.email = body.email
    entity.password = await bcyptjs.hash(body.password, 10)
    entity.role = await AppDataSource.getRepository(Role).findOneBy({name: "Viewer"})

    const user = await AppDataSource.manager.save(entity)

    res.send(user)
}

export const Login = async (req: Request, res: Response) => {
    const body = req.body
    const email = body.email

    const user = await AppDataSource.getRepository(User).findOneBy({email})

    if (!user) {
        return res.status(401).send({message: "Invalid Credentials"})
    }

    if(!await bcyptjs.compare(body.password, user.password)) {
        return res.status(401).send({message: "Invalid Credentials"})
    }

    const token = sign({id: user.id}, process.env.SECRET_KEY)

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1day
    })

    res.send({message: 'success'})
}

export const AuthenticatedUser = async (req: Request, res: Response) => {
    const {password, ...user} = req['user']
    res.send(user)
}

export const Logout = async (req: Request, res: Response) => {
    res.cookie('jwt', '', {maxAge: 0});
    res.send({message: 'success'})
}

function getUserData(req: Request) {
    let {password, id, ...updateData} = req.body
    return {...req['user'], ...updateData};
}

export const UpdateInfo = async (req: Request, res: Response) => {
    const {id, ...user} = getUserData(req);
    const repository = AppDataSource.getRepository(User)
    await repository.update(id, user);
    const {password, ...data} = await repository.findOneBy({id: user.id})
    res.send(data)
}

export const UpdatePassword = async (req: Request, res: Response) => {
    const user = req['user']
    if (req.body.password !== req.body.password_confirm) {
        return res.status(400).send({
            message: "Password's do not match"
        })
    }
    const repository = AppDataSource.getRepository(User)
    await repository.update(user.id, {
        password: await bcyptjs.hash(req.body.password, 10)
    })
    const {password, ...data} = user
    res.send(data)
}