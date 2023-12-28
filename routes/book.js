const express = require('express') //import d'express
const router = express.Router() //création du router d'Express
const Book = require('../models/book') //import du model "book"

//ajoute un livre à la BDD
router.post('/', (req, res) => {
	const book = new Book({
		...req.body,
	}) //récupère de la requête le "body" pour l'intégrer à un nouveau document "book"

	book
		.save() //sauvegarde le livre en BDD
		.then(() =>
			res.status(201).json({
				message: 'Livre ajouté à la BDD !',
			})
		)
		.catch((error) => res.status(400).json({ error }))
})

//récupére tous les livres de la BDD
router.get('/', (req, res) => {
	Book.find() //va récupérer tous les livres de la BDD
		.then((books) => res.status(200).json(books)) //récupère la promesse pour afficher les livres sous un format json
		.catch((error) => res.status(400).json({ error }))
})

//récupére un livre via son "id"
router.get('/:id', (req, res, next) => {
	Book.findOne({ _id: req.params.id })
		.then((bookFound) => res.status(200).json(bookFound)) //récupère la promesse pour afficher le livre sous un format json
		.catch((error) => res.status(400).json({ error }))
})

//modifie un livre à la BDD via son "id"
router.put('/:id', (req, res) => {
	Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
		.then(() =>
			res.status(200).json({ message: 'Le livre a bien été modifié !' })
		)
		.catch((error) => res.status(400).json({ error }))
})

//supprime un livre à la BDD via son "id"
router.delete('/:id', (req, res) => {
	Book.deleteOne({ _id: req.params.id })
		.then(() => res.status(200).json({ message: 'Livre supprimé de la BDD !' }))
		.catch((error) => res.status(400).json({ error }))
})

//ajoute une notation à un livre à la BDD via son "id"
router.put('/:id/rating', (req, res) => {
	Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
		.then(() =>
			res
				.status(200)
				.json({ message: 'La notation a bien été prise en compte !' })
		)
		.catch((error) => res.status(400).json({ error }))
})

//renvoie le top 3 des livres les mieux évalués
router.get('/bestrating', (req, res) => {
	Book.find() //va récupérer tous les livres de la BDD
		.then((books) => res.status(200).json(books)) //récupère la promesse pour afficher les livres sous un format json
		.catch((error) => res.status(400).json({ error }))
})

module.exports = router //export du router
