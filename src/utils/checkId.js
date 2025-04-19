import mongoose from "mongoose"
import thorwIf from "./throwif.js"

const checkId = (id, msg) => {
    thorwIf(!mongoose.Types.ObjectId.isValid(id), 400, `incoorect ${msg} Format`)
}

export default checkId;