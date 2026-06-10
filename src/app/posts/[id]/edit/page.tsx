"use client";

import { apiFetch } from "@/lib/client";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [post, setPost] = useState<PostDto | null>(null);

  useEffect(() => {
    apiFetch(`/api/v1/posts/${id}`).then(setPost);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target;
    const titleInput = form.elements.namedItem("title") as HTMLInputElement;
    const contentInput = form.elements.namedItem(
      "content",
    ) as HTMLTextAreaElement;

    if (titleInput.value.trim() === "" || contentInput.value.trim() === "") {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    apiFetch(`/api/v1/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: titleInput.value,
        content: contentInput.value,
      }),
    }).then((data) => {
      alert(data.msg);
      router.replace(`/posts/${id}`);
    });
  };

  if (post === null) return <div>로딩중...</div>;

  return (
    <>
      <h1>{id}번 글 수정 페이지</h1>

      <form className="flex flex-col gap-2 p-2" onSubmit={handleSubmit}>
        <input
          className="border p-2 rounded"
          type="text"
          name="title"
          placeholder="제목"
          autoFocus
          defaultValue={post.title}
        />
        <textarea
          className="border p-2 rounded"
          name="content"
          placeholder="내용"
          defaultValue={post.content}
        />
        <button className="border p-2 rounded" type="submit">
          저장
        </button>
      </form>
    </>
  );
}
