
module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validator
    const get = async (req, res) => {
        try {
            const rooms = await app.db('room').where({deleted_at: null})

            res.status(200).send(rooms)
        }
        catch (err) {
            res.status(500).send({ msg: err, error: true })
        }
    }

    const getById = async (req, res) => {
        const roomId = req.params.id
        try {
            const room = await app.db('room').where({id: roomId}).first()

            res.status(200).send(room)
        }
        catch (err) {
            res.status(500).send({ msg: err, error: true })
        }
    }

    const post = async (req, res) => {
        const room = req.body
        try {
            existsOrError(room.name, "nome indefinido")
            existsOrError(room.capacity, "capacidade não informada")
            existsOrError(room.terminals_quantity, "numero de terminais não informado")
            existsOrError(room.type, "tipo indefinido")
            
            const roomFromDB = await app.db('room').where({ name: room.name, deleted_at: null }).first()
            
            notExistsOrError(roomFromDB, "Sala já foi cadastrada anteriormente!")
            console.log(room)

            const roomSaved = await app.db('room')
                .insert({ name: room.name, capacity: room.capacity, type: room.type, terminals_quantity: room.terminals_quantity, created_at: new Date().toISOString().replace('Z', '').replace('T', ' ') })

            res.status(201).json({ msg: 'Sala gravada com sucesso!', roomSaved })
        }
        catch (err) {
            res.status(400).json({ msg: err, error: true })
        }
    }

    const put = async (req, res) => {
        const room = req.body
        const roomId = req.params.id

        console.log(room)

        try {
            const updatedRoom = await app.db('room')
                .update({ name: room.name, capacity: room.capacity, type: room.type, terminals_quantity: room.terminals_quantity, updated_at: new Date().toISOString().replace('Z', '').replace('T', ' ') })
                .where({ room_id: roomId })

            res.status(200).json({ msg: 'Sala atualizada com sucesso!', updatedRoom })
        }
        catch (err) {
            res.status(400).json({ msg: err, error: true })
        }
    }

    const remove = async (req, res) => {
        const roomId = req.params.id
        try {
            const removedRoom = await app.db('room')
                .update({deleted_at: new Date().toISOString().replace('Z', '').replace('T', ' ')})
                .where({ room_id: roomId })

            existsOrError(removedRoom, 'Sala não encontrada!')

            res.status(204).send()
        }
        catch (err) {
            res.status(400).json({ msg: err, error: true })
        }
    }

    return { get, getById, post, put, remove }
}