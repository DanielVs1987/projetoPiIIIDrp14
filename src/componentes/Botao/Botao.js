import '../Botao/Botao.css'

const Botao = (props) => {
    return (
        <button type = {props.tipo} className='botao'>
            {props.children}
        </button>
    )
}

export default Botao