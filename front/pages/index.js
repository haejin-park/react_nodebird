import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {END} from 'redux-saga';
import axios from 'axios';
import AppLayout from '../components/AppLayout';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { LOAD_POSTS_REQUEST }  from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from  '../store/configureStore';
const Home = () => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const mainPosts = useSelector((state) => state.post.mainPosts);
    const { hasMorePosts, loadPostsLoading,retweetError } = useSelector((state) => state.post);
    // console.log("pages/index에서 mainPosts",mainPosts);
    useEffect(()=> {
        if(retweetError) {
            alert(retweetError);
        }
    }, [retweetError]);
    useEffect(() => {
        function onScroll() {
            if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                if(hasMorePosts && !loadPostsLoading) {
                    const lastId = mainPosts[mainPosts.length -1]?.id; 
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                        lastId,
                    });
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [hasMorePosts, loadPostsLoading, mainPosts]);

    return (
        <AppLayout>
            {me && <PostForm />}
            {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
        </AppLayout>
    );
};
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req? context.req.headers.cookie: '';
    axios.defaults.headers.Cookie = '';
    if(context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
        type: LOAD_POSTS_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});
export default Home;