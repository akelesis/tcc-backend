module.exports = app => {
    const getPeriods = async (req, res) => {
        try {
            const periods = await app.db('class').distinct('college_semester')
            res.status(200).json(periods)
        }
        catch(err) {
            res.status(500).json(err)
        }
    }

    return {getPeriods}
}