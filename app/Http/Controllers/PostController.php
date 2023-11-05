<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Posts/Index', [
            'posts' =>
            Post::with('user:id,name')->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Posts/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        $post = $request->validated();

        if ($request->hasFile('imagem_destaque')) {
            $filePath = Storage::disk('public')
                ->put('images/posts/featured-images', request()->file('imagem_destaque'));
            $post['imagem_destaque'] = $filePath;
        }

        $create = $request->user()->posts()->create($post);

        if ($create) {
            return redirect()->route('posts.index');
        }
        return abort(500);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('Posts/Show', [
            'post' => Post::findOrFail($id),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        return Inertia::render(
            'Posts/Edit',
            [
                'post' => Post::findOrFail($id),
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, string $id)
    {
        // Encontra o post a ser atualizado
        $post = Post::findOrFail($id);

        // Valida os dados do formulário usando UpdatePostRequest
        $validatedData = $request->validated();

        if ($request->hasFile('imagem_destaque')) {
            // Exclua a imagem anterior
            Storage::disk('public')->delete($post->imagem_destaque);

            $filePath = Storage::disk('public')
                ->put('images/posts/featured-images', request()->file('imagem_destaque'));

            // Atualize o campo 'imagem_destaque' no objeto Post
            $validatedData['imagem_destaque'] = $filePath;
        }

        // Atualize outros campos com os dados validados
        $post->update($validatedData);

        return redirect()->route('posts.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Post::findOrFail($id);

        Storage::disk('public')->delete($post->imagem_destaque);

        $delete = $post->delete();

        if ($delete) {
            return redirect()->route('posts.index');
        }

        return abort(500);
    }
}
