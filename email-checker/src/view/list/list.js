import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {GetAllLists} from './list.service';
import {Get} from '../../store/store';

const Title = styled.h1`
    text-align: center;
`

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
        // initialize state
        this.state = {
            lists: [],
            visible: true
        };   
        // get key
        let key = Get('key');
        // check key integrity
        if(key == null || key.length < 1) {
            window.location.pathname = '/';
            this.state.visible = false;
            return;
        }
        // Get all lists.
        GetAllLists(key).then(data => {
            this.setState({lists: data});
        });
    }

    getRenderedList() {
        return this.state.lists.map((elem) => {
            return (
                <TR key={elem.id}>
                    <TD>{elem.id}</TD>
                    <TD>{elem.name}</TD>
                    <TD><Link to={`list/${elem.name}/${elem.id}`}>Check emails</Link></TD>
                </TR>
            );
        });
    }

    render() {
        if(!this.state.visible)
            return null;

        return (
            <div>
                <Title>All Lists</Title>
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
            </div>
        );
    }

}

export default List;