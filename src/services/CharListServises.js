class CharListServises {

    getResource = async (url) => {
        let resources = await fetch(url);
        if (!resources.ok) {
            throw new Error (`Could not fetch ${url}, status: ${resources.status}`);
        }
        return await resources.json();
    }

    getCharacters = async (offset = 0) => {
        const resources = await this.getResource(`https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=${offset}&apikey=75c1619b24dc98589bec1bbaf49e0be6`);
        return resources.data.results.map(this._transformCharacters);
    }

    _transformCharacters = (char) => {
        return {
            id: char.id,
            name: char.name, 
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
        }
    }
    
}
export default CharListServises


