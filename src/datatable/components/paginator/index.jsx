import Pagination from 'react-bootstrap/Pagination';
import { PaginationStyled } from './styles';

const Paginator = (props) => {
    const totalPageCount = () => {
        return Math.ceil(props.dataCount / props.config.rowsPerPage)
    }

    const jumpToPage = (last) => {
        props.changeConfig(state => {
            return {
                ...state, page: last ? totalPageCount() : 1
            }
        })
    }

    const changePage = (next) => {
        if(next && disableNextPage()){
            return;
        }

        if(!next && disablePreviusPage()){
            return;
        }

        props.changeConfig(state => {
            return {
                ...state, page: props.config.page + (next ? 1 : -1)
            }
        })
    }

    const disableNextPage = () => totalPageCount() < props.config.page + 1;
    const disablePreviusPage = () => props.config.page - 1 < 1;

    return (
        <PaginationStyled>
            <Pagination.First disabled={disablePreviusPage()} onClick={() => jumpToPage(false)}/>
            <Pagination.Prev disabled={disablePreviusPage()} onClick={() => changePage(false)}/>
            <Pagination.Item active>{props.config.page}</Pagination.Item>
            <Pagination.Next disabled={disableNextPage()} onClick={() => changePage(true)}/>
            <Pagination.Last disabled={disableNextPage()} onClick={() => jumpToPage(true)}/>
        </PaginationStyled>
    );
}

export default Paginator;