import React from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

const PostForm = ({
    data,
    errors,
    setData,
    inputRef,
    submit,
    cancel,
    withImageUpload,
}) => {
    return (
        <form onSubmit={submit} encType="multipart/form-data">
            <div>
                <InputLabel htmlFor="titulo" value="Título" />
                <TextInput
                    id="titulo"
                    name="titulo"
                    value={data.titulo}
                    className="mt-1 block w-full"
                    autoComplete="titulo"
                    isFocused={true}
                    onChange={(e) => setData("titulo", e.target.value)}
                    required
                />
                <InputError message={errors.titulo} className="mt-2" />
            </div>
            <div>
                <InputLabel htmlFor="conteudo" value="Conteúdo" />
                <TextAreaInput
                    id="conteudo"
                    name="conteudo"
                    value={data.conteudo}
                    className="mt-1 block w-full"
                    autoComplete="conteudo"
                    isFocused={true}
                    onChange={(e) => setData("conteudo", e.target.value)}
                    required
                />
                <InputError message={errors.conteudo} className="mt-2" />
            </div>

            <div>
                <InputLabel
                    htmlFor="imagem_destaque"
                    value="Imagem Destacada"
                />
                <input
                    type="file"
                    id="imagem_destaque"
                    name="imagem_destaque"
                    className="mt-1 block w-full"
                    autoComplete="imagem_destaque"
                    onChange={(e) =>
                        setData("imagem_destaque", e.target.files[0])
                    }
                    ref={inputRef}
                    required
                />
                <InputError message={errors.imagem_destaque} className="mt-2" />
            </div>

            <div className="space-x-2">
                <PrimaryButton className="mt-4" type="submit">
                    Salvar
                </PrimaryButton>
                <button className="mt-4" onClick={cancel}>
                    Cancelar
                </button>
            </div>
        </form>
    );
};

export default PostForm;
