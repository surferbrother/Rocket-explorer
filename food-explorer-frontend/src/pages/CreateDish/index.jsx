import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Content, Form } from "./styles.js";
import { ThemeProvider } from 'styled-components';
import { useDarkMode } from '../../styles/useDarkMode';
import GlobalStyles from '../../styles/global'
import lightTheme from '../../styles/lightTheme';
import darkTheme from '../../styles/theme';
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { Input } from "../../components/Input";
import { IngredientsTag } from "../../components/IngredientsTag";
import { Textarea } from "../../components/Textarea";
import { PageError } from "../../components/PageError";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";

import { RiArrowLeftSLine } from 'react-icons/ri';
import { FiUpload } from "react-icons/fi";
import { toast } from "react-hot-toast";

export function CreateDish() {
    const [theme, toggleTheme] = useDarkMode();
    const themeMode = theme === 'lightTheme' ? lightTheme : darkTheme;
    const { user } = useAuth()
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [ingredients, setIngredients] = useState([]);
    const [newIngredient, setNewIngredient] = useState("");

    function handleAddIngredient() {
        if (newIngredient.length < 3) {
            toast.error("Erro: Você está tentando inserir um nome de ingrediente inválido!");
        } else {
            setIngredients(prevState => [...prevState, newIngredient]);
            setNewIngredient("");
        }
    }

    function handleRemoveIngredient(deleted) {
        setIngredients(prevState => prevState.filter(ingredient => ingredient !== deleted));
    }

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);

    async function handleNewDish() {
        if (!image) {
            toast.error("Erro: Você não inseriu uma imagem para o prato!");
        }
        if (!title) {
            toast.error("Erro: Você não informou o nome do prato!");
        }
        if (ingredients.length < 1) {
            toast.error("Erro: Adicione pelo menos um ingrediente!")
        }
        if (newIngredient) {
            toast.error("Erro: Você deixou um ingrediente no campo para adicionar, mas não clicou em adicionar. Clique no sinal de + para adicionar!");
        }
        if (!category) {
            toast.error("Erro: Você não selecionou a categoria do prato!");
        }
        if (!price) {
            toast.error("Erro: Você não informou o preço do prato!");
        }
        if (!description) {
            toast.error("Erro: Você não informou uma descrição para o prato!");
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("price", price);
        ingredients.map(ingredient => (
            formData.append("ingredients", ingredient)
        ))
        await api
            .post("/dishes", formData)
            .then(toast.success("Prato adicionado com sucesso!"), navigate("/"))
            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("Erro ao criar o prato!");
                }
            });

        setLoading(false);
    }

    return (
        <ThemeProvider theme={themeMode}>
            <GlobalStyles />
            <Container>
                <Header />
                {
                    user.isAdmin ?
                        <Content>
                            <Form>
                                <header>
                                    <Link to="/">
                                        <ButtonText title="Voltar" icon={RiArrowLeftSLine} />
                                    </Link>
                                    <h1>Criar prato</h1>
                                </header>
                                <div className="details">
                                    <div className="dishImage">
                                        <p>Imagem do Prato</p>
                                        <label htmlFor="image">
                                            <FiUpload size={24} />
                                            Selecione imagem
                                        </label>
                                        <Input
                                            type="file"
                                            id="image"
                                            name="image"
                                            accept="image/*"
                                            onChange={e => setImage(e.target.files[0])}
                                        />
                                    </div>
                                    <div className="dish">
                                        <p>Nome do prato</p>
                                        <Input
                                            placeholder="Ex.: Salada Caesar"
                                            type="text"
                                            onChange={e => setTitle(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="ingredientsTag">
                                    <div>
                                        <p>Ingredientes</p>
                                        <div className="ingredients">
                                            {
                                                ingredients.map((ingredient, index) => (
                                                    <IngredientsTag
                                                        key={String(index)}
                                                        value={ingredient}
                                                        onClick={() => handleRemoveIngredient(ingredient)}

                                                    />
                                                ))
                                            }
                                            <IngredientsTag
                                                isNew
                                                placeholder="Adicionar"
                                                onChange={e => setNewIngredient(e.target.value)}
                                                value={newIngredient}
                                                onClick={handleAddIngredient}
                                            />
                                        </div>
                                    </div>
                                    <div className="dishCategory">
                                        <p>Categoria</p>
                                        <select defaultValue={'default'} onChange={e => setCategory(e.target.value)}>
                                            <option value="default" disabled>Selecione a categoria</option>
                                            <option value="dishes">Pratos</option>
                                            <option value="drinks">Bebidas</option>
                                            <option value="dessert">Sobremesas</option>
                                        </select>
                                    </div>
                                    <div className="price">
                                        <p>Preço</p>
                                        <Input
                                            placeholder="R$ 00,00"
                                            type="number"
                                            onChange={e => setPrice(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="textarea">
                                    <p>Descrição</p>
                                    <Textarea
                                        placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
                                        onChange={e => setDescription(e.target.value)}
                                    />
                                </div>
                            </Form>
                            <div className="button">
                                <Button
                                    title={loading ? "Salvando alterações" : "Salvar alterações"}
                                    onClick={handleNewDish}
                                    disabled={loading}
                                />
                            </div>
                        </Content>
                        :
                        <PageError />
                }
                <Footer />
            </Container>
        </ThemeProvider>
    );
}