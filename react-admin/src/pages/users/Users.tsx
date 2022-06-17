import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import {createTable, getCoreRowModel, getSortedRowModel, SortingState, useTableInstance} from '@tanstack/react-table'
import {User} from "../../models/user"
import Wrapper from "../../components/Wrapper"
import Paginator from "../../components/Paginator"

const Users = () => {
    const [users, setUsers] = useState<User[]>([])
    const [sorting, setSorting] = useState<SortingState>([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(0)

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`users?page=${page}`);

                setUsers(data.data)
                setLastPage(data.meta.last_page)
            }
        )()
    }, [page])

    const del = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            await axios.delete(`users/${id}`)
            setUsers(users.filter((u: User) => u.id !== id));
        }
    }

    const table = createTable().setRowType<User>()

    const defaultColumns = [
        table.createDataColumn('id', {cell: info => info.getValue(), header: "#", footer: props => props.column.id}),
        table.createDisplayColumn({id: "first_name", header: "Name", cell: props => props.row.original?.first_name + " " + props.row.original?.middle_name + " " + props.row.original?.last_name + " "}),
        table.createDataColumn('email', {cell: info => info.getValue(), header: "Email", footer: props => props.column.id}),
        table.createDisplayColumn({id: "role", header: "Role", cell: props => props.row.original?.role?.name}),
        table.createDisplayColumn({id: "action", header: "Action", cell: props => {
            const id = props.row.original?.id
                if (!id) {
                    return null
                }
                return <div className="btn-group mr-2">
                    <Link to={`/users/${id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                    <a tabIndex={0} className="btn btn-sm btn-outline-secondary" onClick={() => del(id)}>Delete</a>
                </div>
            }}),
    ]
    const [columns] = useState<typeof defaultColumns>(() => [
        ...defaultColumns,
    ])

    const instance = useTableInstance(table, {
        data: users,
        columns,
        state: {
            sorting
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel()
    })

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to="/users/create" className="btn btn-sm btn-outline-secondary">Add</Link>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    {instance.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder ? null : (
                                        <div
                                            {...{
                                                className: header.column.getCanSort()
                                                    ? 'cursor-pointer select-none'
                                                    : '',
                                                onClick: header.column.getToggleSortingHandler(),
                                            }}
                                        >
                                            {header.renderHeader()}
                                            {{
                                                asc: ' 🔼',
                                                desc: ' 🔽',
                                            }[header.column.getIsSorted() as string] ?? null}
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody>
                    {instance.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>{cell.renderCell()}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Paginator page={page} lastPage={lastPage} pageChanged={setPage}/>
        </Wrapper>
    )
}
export default Users
