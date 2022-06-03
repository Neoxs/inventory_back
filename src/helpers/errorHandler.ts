import { Request, Response } from 'express'
import { ApiError } from '../helpers/types'

const errorHandler = (err: Error, req?: Request, res?: Response) => {
    
    if (err.name === 'UnauthorizedError')
        // jwt authentication error
        return res.status(401).json({ status: 'error', message: 'unauthorized' })

    if (err instanceof ApiError){
        // custom application error
        return res.status(400).json({ status: 'error', message: err.message })
    }

    // default to 500 server error
    return res.status(500).json({ status: 'error', message: "something went wrong" })
}

export default errorHandler