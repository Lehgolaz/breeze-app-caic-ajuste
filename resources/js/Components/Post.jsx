import React from "react";

export default function Post({ post }) {
    if (!post || !post.user || !post.user.name) {
        return <div>Postagem inválida</div>;
    }

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
                        </small>
                    </div>

                    <h1 className="text-xl font-semibold text-gray-900 mt-4">
                        {post.titulo}
                    </h1>

                    <p className="mt-4 text-lg text-gray-900">
                        {post.conteudo}
                    </p>
                </div>
            </div>
        </div>
    );
}
