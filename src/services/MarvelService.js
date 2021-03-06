class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=75c1619b24dc98589bec1bbaf49e0be6';

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error (`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?${this._apiKey}`); 
        return res.data.results[0].map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`); 
        return this._transformCharacter(res.data.results[0]);
        
    }

    // updateChar = () => {
    //     const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    //     this.marvelService
    //         .getCharacter(id)
    //         .then(this.onChatLoaded)
    // }

    _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
        }
    }
}

export default MarvelService