import img from './error.gif'

const ErrorMessage = () => {
    return (
        // <img src={process.env.PUBLIC_URL + '/public/logo192.png'}/>
        <img 
        style={{display: 'block', width: "250px", height: '250px', ObjectFit: 'contain', margin: '0 auto'}}
        src={img} alt="Error"/>
    )
}

export default ErrorMessage