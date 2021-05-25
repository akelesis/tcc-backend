
module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validator
    const get = async (req, res) => {
        try {
            const subjects = await app.db('subject')

            res.status(200).send(subjects)
        }
        catch (err) {
            res.status(500).send({ msg: err, error: true })
        }
    }

    const getById = async (req, res) => {
        const subjectId = req.params.id
        try {
            const subject = await app.db('subject').where({ id: subjectId }).first()

            res.status(200).send(subject)
        }
        catch (err) {
            res.status(500).send({ msg: err, error: true })
        }
    }

    const post = async (req, res) => {
        const subject = req.body
        try {
            existsOrError(subject.name, "nome indefinido")
            existsOrError(subject.semester, "semestre não informado")
            existsOrError(subject.workload, "carga horária indefinida")
            existsOrError(subject.credits, "quantidade de créditos indefinida")
            existsOrError(subject.subject_code, "código da disciplina não informado")

            const subjectFromDB = await app.db('subject').where({ name: subject.name }).first()

            notExistsOrError(subjectFromDB, "Disciplina já foi cadastrada anteriormente!")

            const subjectSaved = await app.db('subject')
                .insert({ name: subject.name, semester: subject.semester, workload: subject.workload, credits: subject.credits, subject_code: subject.subject_code, created_at: new Date().toISOString().replace('Z', '').replace('T', ' ') })

            res.status(201).json({ msg: 'Disciplina gravada com sucesso!', subjectSaved })
        }
        catch (err) {
            res.status(400).json({ msg: err, error: true })
        }
    }

    const put = async (req, res) => {
        const subject = req.body
        const subjectId = req.params.id

        try {
            const updatedSubject = await app.db('subject')
                .update({ name: subject.name, semester: subject.semester, workload: subject.workload, credits: subject.credits, updated_at: new Date().toISOString().replace('Z', '').replace('T', ' ') })
                .where({ id: subjectId })

            res.status(200).json({ msg: 'Disciplina atualizada com sucesso!', updatedSubject })
        }
        catch (err) {
            res.status(400).json({ msg: err, error: true })
        }
    }

    const remove = async (req, res) => {
        const subjectId = req.params.id

        try {
            const removedsubject = await app.db('subject')
                .update({deleted_at: new Date().toISOString().replace('Z', '').replace('T', ' ')})
                .where({ id: subjectId })

            existsOrError(removedsubject, 'Sala não encontrada!')

            res.status(204).send()
        }
        catch (err) {
            res.status(400).json({ msg: err, error: true })
        }
    }

    return { get, getById, post, put, remove }
}