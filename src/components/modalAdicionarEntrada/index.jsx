import React, { useState, useEffect } from "react";
import axios from "axios"; 
import "./style.css";

export const ModalAdicionarEntrada = ({ isOpen, onClose, onSalvar }) => {
    const [categorias, setCategorias] = useState([]);
    
    const [form, setForm] = useState({
        valor: "",
        categoriaId: "", 
        descricao: "",
        data: "",
        forma: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        // Envia o formulário
        onSalvar(form);
        onClose();
        // Reseta o formulário
        setForm({
            valor: "",
            categoriaId: "",
            descricao: "",
            data: "",
            forma: "",
        });
    };
    
    const buscarCategorias = async () => {
        try {
            const response = await axios.get('http://localhost:8080/categoria'); 
            setCategorias(response.data);
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
        }
    };

    useEffect(() => {
        if (isOpen && categorias.length === 0) {
            buscarCategorias();
        }
    }, [isOpen]); 

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Adicionar Entrada</h2>

                {/* Valor */}
                <label>Valor</label>
                <input
                    type="number"
                    name="valor"
                    value={form.valor}
                    onChange={handleChange}
                />

                <label>Categoria</label>
                <select name="categoriaId" value={form.categoriaId} onChange={handleChange}>
                    <option value="">Selecione</option>
                    {categorias.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.descricao}
                        </option>
                    ))}
                </select>

                <label>Descrição</label>
                <input
                    type="text"
                    name="descricao"
                    value={form.descricao}
                    onChange={handleChange}
                />

                <label>Data</label>
                <input
                    type="date"
                    name="data"
                    value={form.data}
                    onChange={handleChange}
                />

                <label>Forma</label>
                <input
                    type="text"
                    name="forma"
                    value={form.forma}
                    onChange={handleChange}
                />

                <div className="modal-buttons">
                    <button className="btn-cancelar" onClick={onClose}>
                        Cancelar
                    </button>
                    <button className="btn-salvar" onClick={handleSubmit}>
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
};