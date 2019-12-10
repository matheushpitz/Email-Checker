import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {GetAllLists} from './list.service';
import {Get} from '../../store/store';

const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
`;

const TBody = styled.tbody``;

const TR = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2;
    }
`;

const TH = styled.th`
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
`;

const TD = styled.td`
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
`;

class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lists: []
        };   

        let key = Get('key');
        if(key === undefined || key.length < 1)
            window.location.pathname = '/';

        GetAllLists(key).then(data => {
            this.setState({lists: data});
        });
    }

    getRenderedList() {
        return this.state.lists.map(elem => {
            return (
                <TR>
                    <TD>{elem.id}</TD>
                    <TD>{elem.name}</TD>
                    <TD><Link to={'list/'+elem.id}>Check emails</Link></TD>
                </TR>
            );
        });
    }

    render() {
        return (
            <Table>
                <TBody>
                    <TR>
                        <TH>ID</TH>
                        <TH>Name</TH>
                        <TH>Action</TH>
                    </TR>
                    {this.getRenderedList()}
                </TBody>
            </Table>
        );
    }

}

export default List;