module.exports = app => {
    const { existsOrError } = app.api.validator

    const post = async (req, res) => {
        const timeSlot = req.body

        try {
            existsOrError(timeSlot.day, "O dia não foi especificado")
            existsOrError(timeSlot.time, "O horário não foi especificado")
            existsOrError(timeSlot.class_id, "A turma não foi especificada")
            
            const timeSlotSaved = await app.db('time_room')
                .insert({day: timeSlot.day, time: timeSlot.time, class_id: timeSlot.class_id, room_id: timeSlot.room_id})
            
            res.status(201).json({timeSlotSaved, msg: "Horário salvo!"})
        }
        catch(err) {
            res.status(400).send(err)
        }

    }

    const get = async (req, res) => {
        try {
            const timeSlots = await app.db('time_room')
            res.status(200).json(timeSlots)
        }
        catch(err) {
            res.status(500).json({err, msg: "não foi possivel mostrar todos os horários, tente novamente mais tarde!"})
        }
    }

    const put = async (req, res) => {
        const timeSlot = req.body
        const timeSlot_id = req.params.id
        try {
            const timeSlotUpdated = await app.db('time_room')
                .update({day: timeSlot.day, time: timeSlot.time, class_id: timeSlot.class_id, room_id: timeSlot.room_id})
                .where({time_room_id: timeSlot_id})
            
            res.status(201).json({timeSlotUpdated, msg: "Horário atualizado!"})
        }
        catch(err) {
            res.status(400).json({err, msg: "Não foi possível salvar"})
        }
    }

    const remove = async (req, res) => {
        const timeSlot_id = req.params.id

        try {
            await app.db('time_room').where({time_room_id: timeSlot_id}).del()
            res.status(204).send()
        }
        catch(err) {
            res.status(400).json({err, msg: "Não foi possível encontrar o horário a ser excluído"})
        }
    }

    return { post, get, put, remove }
}