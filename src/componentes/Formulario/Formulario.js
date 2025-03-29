import Botao from "../Botao/Botao"
import CampoTexto from "../CampoTexto/CampoTexto"
import "../Formulario/Formulario.css"

const aoSalvar = (evento) => {
    evento.preventDefault()
    console.log('Form subimetido')
}


const Formulario = () => {

    return (
        <section className="formulario">
            <form onSubmit={aoSalvar}>
                <h2>Informações Da Sua Corrida</h2>
                <CampoTexto obrigatorio= {true} placeholder='Valor em Reais (R$)' label="Valor da corrida:" />
                <CampoTexto obrigatorio= {true} placeholder='Valor em Quilômetros (Km)' label="Distancia da Corrida:" />
                <CampoTexto obrigatorio= {true} placeholder='Valor em Quilômetros por Litro (Km/L)' label="Consumo da Moto:" />
                <CampoTexto obrigatorio= {true} placeholder='Valor em Reais (R$)' label="Preço do Combustivel:" />

                <div className="disposicao-botoes"><Botao>Limpar</Botao> <Botao>Calcular</Botao> </div>
            </form>
        </section>
    )


}

export default Formulario