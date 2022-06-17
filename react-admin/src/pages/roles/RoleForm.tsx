import React, {FC, useEffect, useState} from "react"
import {useForm} from "react-hook-form"
import axios from "axios"
import {Permission} from "../../models/permission"

export interface RoleData {
    name: string
    permissions: Array<Permission>
}

interface RoleFormProps {
    defaultValues?: RoleData
    submit: (data: RoleData) => Promise<void>
}

const RoleForm: FC<RoleFormProps> = ({defaultValues, submit}) => {
    const [permissions, setPermissions] = useState<Array<Permission>>([])
    const [selectedPermissions, setSelectedPermissions] = useState<Array<number>>([])
    const {register, formState: {errors}, handleSubmit, setValue} = useForm<RoleData>()
    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('permissions')
                setPermissions(data)
            }
        )()
    }, [])

    useEffect(() => {
        if (!!defaultValues) {
            setValue("name", defaultValues.name)
            setValue("permissions", defaultValues.permissions)
            setSelectedPermissions(defaultValues.permissions.map(p => p.id))
        }
    }, [defaultValues, setValue])

    function check(id: number) {
        if (selectedPermissions.some(s => s === id)) {
            setSelectedPermissions(selectedPermissions.filter(s => s !== id))
            return
        }
        setSelectedPermissions([...selectedPermissions, id]);
    }

    const preSubmit = (data: RoleData) => {
        submit({...data, permissions: permissions.filter(p => selectedPermissions.includes(p.id))})
    }

    return (
        <form onSubmit={handleSubmit(preSubmit)}>
            <div className="mb-3">
                <label htmlFor="name">First Name</label>
                <input id="name" className="form-control" placeholder="Name" {...register('name', {required: "Name is required"})} />
                {errors.name && <div>{errors.name.message}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="permissions">Permissions</label>
                {permissions.map((p: Permission, index: number) => {
                    return (
                        <div className="form-check form-check-inline col-3" key={p.id}>
                            <label className="form-check-label">{p.name}
                                <input className="form-check-input"
                                       type="checkbox"
                                       value={p.id}
                                       checked={selectedPermissions.some(s => s === p.id)}
                                       onChange={() => check(p.id)}
                                />{' '}
                            </label>
                        </div>
                    )
                })}
            </div>

            <button type="submit" className="btn btn-outline-secondary">Save</button>
        </form>
    )
}
export default RoleForm