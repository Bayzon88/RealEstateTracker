import express from 'express';
const router = express.Router();
import SQLService from "../Services/SQLService.js"
const sqlService = new SQLService()
router.get('/units', async (req, res) => {
    try {

        const response = await sqlService.executeQuery()
        res.send(response).status(200)
    } catch (err) {
        console.info("THERE WAS AN ERROR RETRIEVING DATA", err.message)
        res.send("ERROR").status(500)
    }

});

router.post('/units', async (req, res) => {

    try {

        const params = req.body
        const response = await sqlService.addNewUnit(params.unit)
        res.send(response).status(200)
    } catch (err) {
        console.info("THERE WAS AN ERROR", err.message)
        res.send("ERROR").status(500)
    }
})

router.delete('/units/:unitId', async (req, res) => {
    try {
        const { unitId } = req.params; // Extract ID from URL
        const response = await sqlService.deleteUnit(unitId);
        console.log(response)
        if (response) {
            res.status(200).send({ message: `Unit ${unitId} deleted successfully.` });
        } else {
            res.status(404).send({ message: "Unit not found." });
        }
    } catch (err) {
        console.error("THERE WAS AN ERROR", err.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
});


export default router; // Ensure the router is exported
