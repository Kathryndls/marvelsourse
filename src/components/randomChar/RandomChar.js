import { Component } from 'react'
import mjolnir from '../../resources/img/mjolnir.png';
import './randomChar.scss'
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMesage';


class RandomChar extends Component {

    state = {
        char: {},
        loading: true,
        error: false,
    }

    marvelService = new MarvelService();

    componentDidMount () {
        this.updateChar();
        // this.timerId = setInterval(this.updateChar, 3000);
    }

    componentWillUnmount () {
        // clearInterval(this.timerId)
    }

    onChatLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            // loadingChar: false
        })
    }

    onEror = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService
            .getCharacter(id)
            .then(this.onChatLoaded)
    }
    // https://developer.marvel.com/docs#!/public/getCreatorCollection_get_0
    render () {
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : loading;
        // const loadingChar = this.updateChar? console.log('ere') : loading;
        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                {/* {loadingChar} */}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner" onClick={this.updateChar}>try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;

    let shortdescription;
    if (description && description.length > 115) {
        shortdescription = `${description.substring(0, 115)}...`;
    } 
    const urlImgNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    const changeNotFoundImg = thumbnail === urlImgNotFound ? 'contain' : 'cover';

    return (
        <div className="randomchar__block">
            <img 
                src={thumbnail} 
                style={{objectFit: changeNotFoundImg}} 
                alt="Random character" 
                className="randomchar__img"
            />
            <div className="randomchar__info">
                <p className="randomchar__name">{name? name: 'нет имени'}</p>
                <p className="randomchar__descr">
                    {description
                    ? shortdescription
                    :
                    'Описания нет'}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar