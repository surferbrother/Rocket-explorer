import { Container } from "./styles";

import imagePlaceholder from '../../assets/image-not-found-icon.svg';
import aguardente from '../../assets/aguardente.png'
import alface from '../../assets/alface.png'
import ameixa from '../../assets/ameixa.png'
import amendoas from '../../assets/amendoas.png'
import aniz from '../../assets/aniz.png'
import aspargo from '../../assets/aspargo.png'
import bacon from '../../assets/bacon.png'
import batata from '../../assets/batata.png'
import cafe from '../../assets/cafe.png'
import camarao from '../../assets/camarao.png'
import canela from '../../assets/canela.png'
import cebola from '../../assets/cebola.png'
import claras from '../../assets/claras.png'
import coca from '../../assets/coca.png'
import damasco from '../../assets/damasco.png'
import farinha from '../../assets/farinha.png'
import filé from '../../assets/filet.png'
import limao from '../../assets/limao.png'
import maca from '../../assets/maca.png'
import manjericao from '../../assets/manjericao.png'
import maracuja from '../../assets/maracuja.png'
import massa from '../../assets/massa.png'
import morango from '../../assets/morango.png'
import negroni from '../../assets/negroni.png'
import paoNaan from '../../assets/pao_naan.png'
import pao from '../../assets/pao.png'
import pepino from '../../assets/pepino.png'
import pessego from '../../assets/pessego.png'
import pesto from '../../assets/pesto.png'
import presunto from '../../assets/presunto.png'
import queijo from '../../assets/queijo.png'
import rabanete from '../../assets/rabanete.png'
import rucula from '../../assets/rucula.png'
import sorvete from '../../assets/sorvete.png'
import tomate from '../../assets/tomate.png'
import whiskey from '../../assets/whiskey.png'

export function Ingredients({ ingredient }) {

    function fetchImageIngredient(name) {
        const ingredient = name.toLowerCase().trim();
        const ingredientImages = {
            aguardente: aguardente,
            alface: alface,
            aspargo: aspargo,
            ameixa: ameixa,
            amendoas: amendoas,
            aniz: aniz,
            bacon: bacon,
            batata: batata,
            cafe: cafe,
            camarao: camarao,
            canela: canela,
            cebola: cebola,
            claras: claras,
            coca: coca,
            damasco: damasco,
            farinha: farinha,
            filé: filé,
            limao: limao,
            maca: maca,
            manjericao: manjericao,
            maracuja: maracuja,
            massa: massa,
            morango: morango,
            negroni: negroni,
            pao: pao,
            paoNaan: paoNaan,
            pepino: pepino,
            pessego: pessego,
            pesto: pesto,
            presunto: presunto,
            queijo: queijo,
            rabanete: rabanete,
            rucula: rucula,
            sorvete: sorvete,
            tomate: tomate,
            whiskey: whiskey
        };
        return ingredientImages[ingredient] || imagePlaceholder;
    }

    let ingredientImage = fetchImageIngredient(ingredient)
    
    return(
        <Container>
            <div className="ingredients">
                <div>
                  <img src={ingredientImage} alt="Imagem do ingrediente" />
                  <p>{ingredient}</p>
                </div>
            </div>
        </Container>
    );
}