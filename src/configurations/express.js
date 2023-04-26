import express from 'express'
import 'express-async-errors'
import cors from 'cors'

export async function configure (app) {
    app.use(cors())
    app.use(express.static('public'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    console.log('Express Initialized.')
}