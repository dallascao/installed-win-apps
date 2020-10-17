declare const codePage: {
	/**
	* Get and set the current Windows terminal code page.
	* @param page The page number to set.
	* @example
	* ```
	* const codePage = require("win-codepage");
	*
	* (async () => {
	* 	await codePage()
	* 	//=> 850
	*
	* 	await codePage(65001) // Set to unicode
	*
	* 	await codePage()
	* 	//=> 65001
	* })()
	```
	*/
	(): Promise<number>
	(page: number): Promise<void>

	/**
	* Get and set the current Windows terminal code page.
	* @param page The page number to set.
	* @example
	* ```
	* const codePage = require("win-codepage");
	*
	* codePage.sync()
	* //=> 850
	*
	* codePage.sync(65001) // Set to unicode
	*
	* codePage.sync()
	* //=> 65001
	```
	*/
	sync(): number
	sync(page: number): void
}

export = codePage;
