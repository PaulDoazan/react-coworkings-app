import logo from '../assets/images/logo.svg'

const Logo = () => {
    return <div className='logo-container'>
        <img src={logo} alt="bx- coworkings" className='logo' /><span>Coworkings</span>
    </div>
}

export default Logo