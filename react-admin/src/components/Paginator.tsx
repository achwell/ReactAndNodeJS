import React, {FC} from 'react'

interface PaginatorProps {
    page: number
    lastPage: number
    pageChanged: (page: number) => void
}

const Paginator: FC<PaginatorProps> = ({page, lastPage, pageChanged}) => {
    const next = () => {
        if (page < lastPage) {
            pageChanged(page + 1)
        }
    }

    const prev = () => {
        if (page >= 1) {
            pageChanged(page - 1);
        }
    }

    return (
        <nav>
            <ul className="pagination">
                <li className="page-item">
                    <a href="#" className="page-link" onClick={prev}>Previous</a>
                </li>
                <li className="page-item">
                    <a href="#" className="page-link" onClick={next}>Next</a>
                </li>
            </ul>
        </nav>
    )
}

export default Paginator