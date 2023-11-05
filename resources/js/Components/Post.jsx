import React, { useState, useRef } from "react";
import Dropdown from "@/Components/Dropdown";
import { useForm, usePage } from "@inertiajs/react";
import PostForm from "@/Components/PostForm";
import { router } from "@inertiajs/react";

export default function Post({ post }) {
    const { auth } = usePage().props;
    const [editing, setEditing] = useState(false);
    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        titulo: post.titulo,
        conteudo: post.conteudo,
        imagem_destaque: post.imagem_destaque,
    });



    const cancel = () => {
        if (window.confirm("Tem certeza de que deseja cancelar?")) {
            setEditing(false);
            reset();
            clearErrors();
        }
    };

    const inputRef = useRef();

    return (
        <div className="p-6 flex flex-col">
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
                                    &nbsp;&middot; edited
                                </small>
                            )}
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
}
