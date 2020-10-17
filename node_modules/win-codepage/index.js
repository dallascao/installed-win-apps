"use strict"

const isWindows = require("is-windows")()
const commandExists = require("command-exists")
const execa = require("execa")
const { default: is } = require("@sindresorhus/is")
const { default: ow } = require("ow")

module.exports = async (page) => {
	if (!isWindows) throw new Error("Only Windows is supported!")
	if (!(await commandExists("chcp"))) throw new Error("chcp doesn't exist!")
	ow(page, ow.any(ow.number, ow.undefined))

	if (is.number(page)) {
		try {
			await execa("chcp", [page])
			return
		} catch (err) {
			if (err.stderr === "Invalid code page") throw new TypeError("`page` is not a valid code page.")
			throw err
		}
	} else {
		const { stdout } = await execa("chcp")
		return Number(stdout.match(/Active code page: (.+)/)[1])
	}
}

module.exports.sync = (page) => {
	if (!isWindows) throw new Error("Only Windows is supported!")
	if (!commandExists.sync("chcp")) throw new Error("chcp doesn't exist!")
	ow(page, ow.any(ow.number, ow.undefined))

	if (is.number(page)) {
		try {
			execa.sync("chcp", [page])
			return
		} catch (err) {
			if (err.stderr === "Invalid code page") throw new TypeError("`page` is not a valid code page.")
			throw err
		}
	} else {
		const { stdout } = execa.sync("chcp")
		return Number(stdout.match(/Active code page: (.+)/)[1])
	}
}
