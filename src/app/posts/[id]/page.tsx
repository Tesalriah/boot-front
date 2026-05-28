'use client'
import { apiFetch } from '@/lib/client';
import { PostDto } from '@/types/post';
import { use, useEffect, useState } from 'react';

export default function Page({params} : {params: Promise<{id: number}>}){
    const {id} = use(params);

    const [posts, setPosts] = useState<PostDto | null>(null);

    useEffect(() => {
            apiFetch(`/api/v1/posts/${id}`)
            .then((data) => setPosts(data));
        }, [])

    if(posts === null)return <div>로딩중...</div>
    
        
    return (
        <>
            <h1>게시글 상세페이지</h1>
            <div>게시글 번호: {posts?.id}</div>
            <div>게시글 제목: {posts?.title}</div>
            <div>게시글 내용: {posts?.content}</div>
        </>
    )
}
