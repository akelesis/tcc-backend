
module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validator
    const get = async (req, res) => {
        try {
            const professors = await app.db('professor')

            res.status(200).send(professors)
        }
        catch (err) {
            res.status(500).send({ msg: err, error: true })
        }
    }

    const getById = async (req, res) => {
        const professorId = req.params.id
        try {
            const professor = await app.db('professor').where({id: professorId}).first()

            res.status(200).send(professor)
        }
        catch (err) {
            res.status(500).send({ msg: err, error: true })
        }
    }

    const post = async (req, res) => {
        const professor = req.body
        try {
            existsOrError(professor.name, "nome indefinido")
            existsOrError(professor.department, "departamento não informado")

            const professorFromDB = await app.db('professor').where({ name: professor.name }).first()

            notExistsOrError(professorFromDB, "Professor já foi cadastrado anteriormente!")

            const professorSaved = await app.db('professor')
                .insert({ name: professor.name, department: professor.department, email: professor.email, created_at: new Date().toISOString().replace('Z', '').replace('T', ' ') })

            res.status(201).json({ msg: 'Professor gravado com sucesso!', professorSaved })
        }
        catch (err) {
            res.status(400).json({ msg: err, error: true })
        }
    }

    const put = async (req, res) => {
        const professor = req.body
        const professorId = req.params.id

        console.log(professor)

        try {
            const updatedProfessor = await app.db('professor')
                .update({ name: professor.name, department: professor.department, email: professor.email, updated_at: new Date().toISOString().replace('Z', '').replace('T', ' ') })
                .where({ id: professorId })

            res.status(200).json({ msg: 'Professor atualizado com sucesso!', updatedProfessor })
        }
        catch (err) {
            res.status(400).json({ msg: err, error: true })
        }
    }

    const remove = async (req, res) => {
        const professorId = req.params.id

        try {
            const removedProfessor = await app.db('professor')
                .update({deleted_at: new Date().toISOString().replace('Z', '').replace('T', ' ')})
                .where({ id: professorId })

            existsOrError(removedProfessor, 'Professor não encontrado!')

            res.status(204).send()
        }
        catch (err) {
            res.status(400).json({ msg: err, error: true })
        }
    }

    return { get, getById, post, put, remove }
}