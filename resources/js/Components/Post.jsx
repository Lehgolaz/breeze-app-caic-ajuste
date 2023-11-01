import React, { useState, useRef } from "react";
import Dropdown from "@/Components/Dropdown";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import { useForm, usePage } from "@inertiajs/react";
import PostForm from "@/Components/PostForm";

export default function Post({ post }) {
    const { auth } = usePage().props;

    const [editing, setEditing] = useState(false);

    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        titulo: post.titulo,
        conteudo: post.conteudo,
        imagem_destaque: post.imagem_destaque,
    });

    const submit = (e) => {
        e.preventDefault();

        console.log(data);

        patch(route("posts.update", post.id), {
            onSuccess: () => setEditing(false),
        });
    };

    const cancel = () => {
        if (window.confirm("Tem certeza de que deseja cancelar?")) {
            // Executar ação de cancelamento
            setEditing(false);
            reset();
            clearErrors();
        }
    };

    const inputRef = useRef(); // Crie uma referência para o input de arquivo

    return (
        <div className="p-6 flex flex-col">
            {" "}
            {/* Usando um contêiner de coluna */}
            {post.imagem_destaque && (
                <img
                    src={`/storage/${post.imagem_destaque}`}
                    alt="Imagem de Destaque"
                    className="w-100"
                />
            )}
            <div className="flex-1">
                <div>
                    <div>
                        <span className="text-gray-800">{post.user.name}</span>
                        <small className="ml-2 text-sm text-gray-600">
                            {new Date(post.created_at).toLocaleString()}
                            {post.created_at !== post.updated_at && (
                                <small className="text-sm text-gray-600">
                                    {" "}
                                    &middot; edited
                                </small>
                            )}
                        </small>
                    </div>
                    {post.user.id === auth.user.id && (
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <button
                                    className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"
                                    onClick={() => setEditing(true)}
                                >
                                    Edit
                                </button>
                            </Dropdown.Content>
                        </Dropdown>
                    )}

                    {editing ? (
                        <PostForm
                            data={data}
                            errors={errors}
                            setData={setData}
                            inputRef={inputRef}
                            submit={submit}
                            cancel={cancel}
                        />
                    ) : (
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900 mt-4">
                                {post.titulo}
                            </h1>

                            <p className="mt-4 text-lg text-gray-900">
                                {post.conteudo}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
