import React, { useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import Post from "@/Components/Post";
import { useForm, Head } from "@inertiajs/react";
import PostForm from "@/Components/PostForm";

export default function Index({ auth, posts }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        titulo: "",
        conteudo: "",
        imagem_destaque: null, // Inicialize como null
    });

    const inputRef = useRef(); // Crie uma referência para o input de arquivo

    const submit = (e) => {
        e.preventDefault();
        post(route("posts.store"), {
            onSuccess: () => {
                reset();
                inputRef.current.value = ""; // Redefina o valor do input de arquivo
            },
        });
    };

    const cancel = () => {
        if (window.confirm("Tem certeza de que deseja cancelar?")) {
            reset();
            clearErrors();
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
                        <Post key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
