const prisma = require('../prisma');

async function criarPost(req, res) {
    try {
        const { titulo, conteudo, autorId } = req.body;

        const novoPost = await prisma.post.create({
            data: {
                titulo: titulo,
                conteudo: conteudo,
                autorId: Number(autorId)
            }
        });

        return res.status(201).json(novoPost);

    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao criar postagem. Verifique se o autorId existe." });
    }
}

async function listarPosts(req, res) {
    try {
        const posts = await prisma.post.findMany({
            include: {
                autor: true
            }
        });

        return res.status(200).json(posts);

    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao listar postagens." });
    }
}

async function buscarPostPorId(req, res) {
    try {
        const { id } = req.params;

        const post = await prisma.post.findUnique({
            where: { id: Number(id) },
            include: { autor: true }
        });

        if (!post) {
            return res.status(404).json({ erro: "Postagem não encontrada." });
        }

        return res.status(200).json(post);

    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao buscar a postagem." });
    }
}

async function atualizarPost(req, res) {
    try {
        const { id } = req.params;
        const { titulo, conteudo } = req.body;

        const postAtualizado = await prisma.post.update({
            where: { id: Number(id) },
            data: {
                titulo: titulo,
                conteudo: conteudo
            }
        });

        return res.status(200).json(postAtualizado);

    } catch (erro) {
        return res.status(404).json({ erro: "Registro não encontrado para atualização." });
    }
}

async function apagarPost(req, res) {
    try {
        const { id } = req.params;

        await prisma.post.delete({
            where: { id: Number(id) }
        });

        return res.status(204).send();

    } catch (erro) {
        return res.status(404).json({ erro: "Registro não encontrado para exclusão." });
    }
}

module.exports = {
    criarPost,
    listarPosts,
    buscarPostPorId,
    atualizarPost,
    apagarPost
}; 