import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';

import UserProfile from "../components/UserProfile";
import LoginForm from "../components/LoginForm"
import {useSelector} from 'react-redux';
import Router from 'next/router';
import {createGlobalStyle} from 'styled-components';
import useInput from '../hooks/useInput';
const SearchInput = styled(Input.Search)`
    vertical-align:middle;
`;
const Global = createGlobalStyle`
    .ant-row {
        margin-right: 0 !important;
        margin-left: 0 !important;
    }

    .ant-col:first-child {
        padding-left: 0 !important;
    }

    .ant-col:last-child {
        padding-right: 0 !important;
    }
`
const AppLayout = ({ children }) => {
    const [searchInput, onChangeSearchInput] = useInput('');
    const {me} = useSelector((state) => state.user);
    const onSearch = useCallback(() => {
        Router.push(`/hashtag/${searchInput}`);
    }, [searchInput]);
    return(
        <div>
            {/* <Global /> */}
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/"><a>노드버드</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile"><a>프로필</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <SearchInput 
                        enterButton
                        value={searchInput}
                        onChange={onChangeSearchInput}
                        onSearch={onSearch}
                    />
                </Menu.Item>
            </Menu>    
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {me? <UserProfile/> : <LoginForm/>}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <a href="https://www.notion.so/3657aede348a4aa49de998ab73392cc2?pvs=4" target="_blank" rel="noreferer noopener">Made by Haejin</a>
                </Col>
            </Row>
        </div>
    );
};

AppLayout.propTypes = {
    children:PropTypes.node.isRequired,
};

export default AppLayout;