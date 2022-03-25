import { Component } from 'react';
import './charList.scss' 
// import abyss from '../../resources/img/abyss.jpg';
import CharListServises from '../../services/CharListServises'

class CharList extends Component {
    state = {
        char: [],
        offset: 0
    }

    charListServises = new CharListServises();

    onChatListLoaded = (char) => {
        this.setState({
            char
        })
    }

    componentDidMount () {
        this.updateChar();
    }

    updateChar = () => {
        // const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.charListServises
            .getCharacters()
            .then(data => this.onChatListLoaded(data))
            .catch(this.onError)
    }

    longerCharList = () => {
            this.setState((prevState)=> {
                return {
                    ...prevState,
                    offset: prevState.offset + 9}
            })

            this.charListServises
                .getCharacters(this.state.offset)
                .then(data => {
                    // console.log('DATA', ...data);
                    this.setState((prevState) => {
                        return {
                            ...prevState,
                            char: prevState.char.push(data).flat()
                        }
                    })
                })
        };
    
    render () {
        // const {char} = this.state;
        // console.log(this.longerCharList);
        return (
            <div>
                <ViewList chars={this.state.char}/>
                <button className="button button__main button__long">
                    <div className="inner" onClick={this.longerCharList}>load more</div>
                </button>
            </div>
        )    
    }
}

const ViewList = ({chars}) => {
    // const urlListNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    // const changeNotFoundImg = thumbnail === urlListNotFound ? 'contain' : 'cover';
    console.log('CARS', chars);
    return (
        <div className="char__list">
            <ul className="char__grid">
                {chars.map(char => 
                    <li key={char.id} className="char__item char__item_selected">
                        <img 
                            src={char.thumbnail} 
                            style={{objectFit: char.changeNotFoundImg}}
                            alt="abyss"
                        />
                        <div className="char__name">{char.name}</div>
                    </li>
                )}
            </ul>
        </div>
    )
}


export default CharList

