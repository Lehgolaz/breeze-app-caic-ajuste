import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";
import PostForm from "@/Components/PostForm";
import Post from "@/Components/Post";
import { router } from "@inertiajs/react";

export default function Index({ auth, posts }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        titulo: "",
        conteudo: "",
        imagem_destaque: null,
    });

    const inputRef = React.useRef();

    const submit = (e) => {
        e.preventDefault();

        post(route("posts.store"), {
            onSuccess: () => {
                reset();
                inputRef.current.value = "";
            },
        });
    };

    const cancel = () => {
        if (window.confirm("Tem certeza de que deseja cancelar?")) {
            reset();
        }
    };

    const handleEdit = (post) => {
        // Redirecione para a página de edição do post com base na rota
        router.visit(route("posts.edit", post.id));
    };

    const handleRemove = (post) => {
        if (window.confirm("Tem certeza de que deseja remover o post?")) {
            // Implemente a lógica para remover o post (por exemplo, fazendo uma solicitação de exclusão)
            // Após a exclusão, redirecione para a página inicial ou uma página apropriada
            router.delete(route("posts.destroy", post.id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Post" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <PostForm
                    data={data}
                    errors={errors}
                    setData={setData}
                    inputRef={inputRef}
                    submit={submit}
                    cancel={cancel}
                />

                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {posts.map((post) => (
                        <div key={post.id}>
                            <Post post={post} />
                            {auth.user.id === post.user.id && (
                                <div className="mt-2">
                                    <button
                                        onClick={() => handleEdit(post)}
                                        className="text-sm text-blue-500 ml-4"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleRemove(post)}
                                        className="text-sm text-red-500 ml-4"
                                    >
                                        Remover
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
