import React from 'react';
import styled from 'styled-components';

import {Get} from '../../store/store';
import { GetAllMembers } from './list-members.service';

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

class ListMembers extends React.Component {
    constructor(props) {
        super(props);
        // initialize state
        this.state = {
            members: [],
            visible: true
        };
        // get key
        let key = Get('key');
        // check integrity
        if(key == null || key.length < 1) {
            window.location.pathname = '/';
            this.state.visible = false;
            return;
        }
            
        // get all members of the current list.
        GetAllMembers(key, this.props.match.params.id).then(data => {
            this.setState({members: data});
        });
    }

    getRenderedList() {
        return this.state.members.map((elem) => {
            return (
                <TR key={elem.id}>
                    <TD>{elem.id}</TD>
                    <TD>{elem.email}</TD>
                    <TD>{elem.user}</TD>
                    <TD>{elem.domain}</TD>
                    <TD>{elem.free ? 'Yes' : 'No'}</TD>
                    <TD>{elem.result}</TD>
                    <TD>{elem.reason}</TD>
                </TR>
            );
        });
    }

    render() {
        if(!this.state.visible)
            return null;

        return (
            <div>
                <Title>All members for the list {this.props.match.params.name}</Title>
                <Table>
                    <TBody>
                        <TR>
                            <TH>ID</TH>
                            <TH>Email</TH>
                            <TH>User</TH>
                            <TH>Domain</TH>
                            <TH>Free</TH>
                            <TH>Result</TH>
                            <TH>Reason</TH>
                        </TR>
                        {this.getRenderedList()}
                    </TBody>
                </Table>
            </div>
        );
    }
}

export default ListMembers;