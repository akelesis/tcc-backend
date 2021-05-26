module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validator

    const post = async (req, res) => {
        const professorClass = req.body
        try {
            existsOrError(professorClass.professor_id, "professor indefinido")
            existsOrError(professorClass.class_id, "departamento não informado")

            const professorClassFromDB = await app.db('professor_class')
                .where({ professor_id: professorClass.professor_id, class_id: professorClass.class_id }).first()

            notExistsOrError(professorClassFromDB, "Professor já foi cadastrado na turma anteriormente!")

            const professorClassSaved = await app.db('professor_class')
                .insert({ professor_id: professorClass.professor_id, class_id: professorClass.class_id })

            res.status(201).json({ msg: 'Professor gravado em turma com sucesso!', professorClassSaved })
        }
        catch (err) {
            res.status(400).json({ msg: err, error: true })
        }
    }


    return { post }
}