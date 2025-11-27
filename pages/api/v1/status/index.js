function status(request, response) {
    response.status(200).json(
        {chave: "Tudo certo, ta funcionando!"}
    )
}

export default status