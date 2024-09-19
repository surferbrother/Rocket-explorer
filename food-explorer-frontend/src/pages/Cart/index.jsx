import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Content, PaymentCard } from "./styles.js";
import { ThemeProvider } from 'styled-components';
import { useDarkMode } from '../../styles/useDarkMode';
import GlobalStyles from '../../styles/global'
import lightTheme from '../../styles/lightTheme';
import darkTheme from '../../styles/theme';
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { OrderCard } from "../../components/OrderCard";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { PageError } from "../../components/PageError";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";
import { useCart } from '../../hooks/cart';
import { BsReceipt } from 'react-icons/bs';
import logoPix from '../../assets/pix.svg';
import cardImg from '../../assets/CreditCard.svg';
import qrCode from '../../assets/qrcode.svg';
import cartImg from '../../assets/cart.svg';
import clock from '../../assets/clock.svg';
import checkCircle from '../../assets/CheckCircle.svg';
import { toast } from 'react-hot-toast';

export function Cart() {
    const [theme, toggleTheme] = useDarkMode();
    const themeMode = theme === 'lightTheme' ? lightTheme : darkTheme;
    const { user } = useAuth()
    const { cart, total, handleResetCart } = useCart();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCreatedCart = (cart) => ({
        orderStatus: '🔴 Pendente',
        paymentMethod: pixActive ? 'pix' : 'creditCard',
        totalPrice: total,
        cart: cart.map(item => ({
            id: item.id,
            title: item.title,
            quantity: item.quantity
        }))
    });

    const handleNumChange = event => setNum(event.target.value.slice(0, 16));
    const handleCvcChange = event => setCvc(event.target.value.slice(0, 3));

    async function handleFinishPayment(cart) {
        const newCart = handleCreatedCart(cart);
        if (cart.length < 1) {
            navigate(-1);
            toast.error("Oops! Seu carrinho está vazio. Adicione algo antes de tentar pagar.");
        }
        if (!pixActive && num.length < 16) {
            toast.error("Erro: Número de cartão incompleto!");
        }
        if (!pixActive && date.length < 4) {
            toast.error("Erro: Validade do cartão incompleta!");
        }
        if (!pixActive && cvc.length < 3) {
            toast.error("Erro: CVC do cartão incompleto!");
        }

        setLoading(true);
        try {
            await api.post("/orders", newCart);
            disableButton();
            setTimeout(() => {
                toast.success("Pedido cadastrado com sucesso!");
                navigate(-1);
                handleResetCart();
            }, 7000);
        } catch (error) {
            alert(error.response?.data.message || "Não foi possível cadastrar");
        }
        setLoading(false);
    }

    const [num, setNum] = useState('');
    const [cvc, setCvc] = useState('');
    const [isPixVisible, setIsPixVisible] = useState(false);
    const [isCreditVisible, setIsCreditVisible] = useState(false);
    const [isCartVisible, setIsCartVisible] = useState(true);
    const [pixActive, setPixActive] = useState(false);
    const [creditActive, setCreditActive] = useState(false);
    const [isClockActive, setIsClockActive] = useState(false);
    const [isApprovedActive, setIsApprovedActive] = useState(false);
    const [disabledButton, setDisabledButton] = useState(false);

    const handlePaymentPix = () => {
        setIsPixVisible(true);
        setIsCreditVisible(false);
        setIsCartVisible(false);
        setPixActive(true);
        setCreditActive(false);
    };

    const handlePaymentCredit = () => {
        setIsCreditVisible(true);
        setIsPixVisible(false);
        setIsCartVisible(false);
        setCreditActive(true);
        setPixActive(false);
    };

    const disableButton = () => {
        setDisabledButton(true);
        setIsCreditVisible(false);
        setIsPixVisible(false);
        setIsClockActive(true);
        setTimeout(() => {
            setIsClockActive(false);
            setIsApprovedActive(true);
        }, 4000);
    };

    return (
        <ThemeProvider theme={themeMode}>
            <GlobalStyles />
            <Container>
                <Header />
                {user.isAdmin ? (
                    <PageError />
                ) : (
                    <Content>
                        <div className="card-wrapper">
                            <div className="order-wrapper">
                                <h2>Meu pedido</h2>
                                <div className="details">
                                    {cart && cart.map(item => (
                                        <OrderCard key={String(item.id)} data={item} />
                                    ))}
                                </div>
                                <div className="total">
                                    <p>Total: R$<span>{total}</span></p>
                                </div>
                            </div>
                            <PaymentCard>
                                <div className="paymentHeader">
                                    <h2>Pagamento</h2>
                                    <div className="buttons">
                                        <button
                                            className={pixActive ? 'active' : ''}
                                            disabled={disabledButton}
                                            onClick={handlePaymentPix}
                                            aria-pressed={pixActive}
                                            aria-label="Pagar com Pix"
                                        >
                                            <img src={logoPix} alt="Logo Pix" />
                                            PIX
                                        </button>
                                        <button
                                            className={creditActive ? 'active' : ''}
                                            disabled={disabledButton}
                                            onClick={handlePaymentCredit}
                                            aria-pressed={creditActive}
                                            aria-label="Pagar com Cartão de Crédito"
                                        >
                                            <img src={cardImg} alt="Logo Cartão de Crédito" />
                                            Crédito
                                        </button>
                                    </div>
                                </div>
                                <div className="paymentBody">
                                    {isCartVisible && (
                                        <div className="cart" id="cart">
                                            <img src={cartImg} alt="Carrinho de compras" />
                                            <p>Selecione uma forma de pagamento acima!</p>
                                        </div>
                                    )}
                                    {isPixVisible && (
                                        <div id="paymentPix">
                                            <div className="qr">
                                                <img src={qrCode} alt="QR Code do Pix" />
                                            </div>
                                            <Button
                                                title={loading ? "Finalizando pagamento" : "Finalizar pagamento"}
                                                disabled={loading}
                                                icon={BsReceipt}
                                                onClick={() => handleFinishPayment(cart)}
                                                aria-live="polite"
                                            />
                                        </div>
                                    )}
                                    {isCreditVisible && (
                                        <div className="paymentCredit">
                                            <div className="inputs">
                                                <p>Número do Cartão</p>
                                                <Input
                                                    placeholder="0000 0000 0000 0000"
                                                    type="text"
                                                    inputMode="numeric"
                                                    pattern="[0-9\s]{13,19}"
                                                    value={num}
                                                    onChange={handleNumChange}
                                                />
                                            </div>
                                            <div className="validTo">
                                                <div>
                                                    <p>Validade</p>
                                                    <Input
                                                        placeholder="MM/AA"
                                                        maxLength="5"
                                                        type="text"
                                                        inputMode="numeric"
                                                    />
                                                </div>
                                                <div>
                                                    <p>CVC</p>
                                                    <Input
                                                        placeholder="***"
                                                        type="number"
                                                        value={cvc}
                                                        onChange={handleCvcChange}
                                                    />
                                                </div>
                                            </div>
                                            <Button
                                                title={loading ? "Finalizando pagamento" : "Finalizar pagamento"}
                                                disabled={loading}
                                                icon={BsReceipt}
                                                onClick={() => handleFinishPayment(cart)}
                                                aria-live="polite"
                                            />
                                        </div>
                                    )}
                                    {isClockActive && (
                                        <div className="clock">
                                            <img src={clock} alt="Processando pagamento" />
                                            <p>Aguarde: Estamos processando o seu pagamento</p>
                                        </div>
                                    )}
                                    {isApprovedActive && (
                                        <div className="approved">
                                            <img src={checkCircle} alt="Pagamento aprovado" />
                                            <p>Oba! Pagamento aprovado! Em breve faremos a entrega!</p>
                                        </div>
                                    )}
                                </div>
                            </PaymentCard>
                        </div>
                    </Content>
                )}
                <Footer />
            </Container>
        </ThemeProvider>
    );
}
