class EstoqueManager {
    constructor() {
        this.produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        this.proximoId = this.calcularProximoId();
        this.initEventListeners();
        this.atualizarInterface();
    }

    calcularProximoId() {
        return this.produtos.length > 0 
            ? Math.max(...this.produtos.map(p => p.id)) + 1 
            : 1;
    }

    initEventListeners() {
        document.getElementById('addForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.adicionarProduto();
        });

        document.getElementById('editForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.salvarEdicao();
        });

        document.querySelector('.close').addEventListener('click', () => {
            document.getElementById('editModal').style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            const modal = document.getElementById('editModal');
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    formatarMoeda(valor) {
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    adicionarProduto() {
        const produto = {
            id: this.proximoId++,
            modelo: document.getElementById('modelo').value,
            categoria: document.getElementById('categoria').value,
            quantidade: parseInt(document.getElementById('quantidade').value),
            preco: parseFloat(document.getElementById('preco').value)
        };

        this.produtos.push(produto);
        this.salvarDados();
        this.atualizarInterface();
        this.mostrarAlerta('Produto adicionado com sucesso!', 'success');
        document.getElementById('addForm').reset();
    }

    editarProduto(id) {
        const produto = this.produtos.find(p => p.id === id);
        if (produto) {
            document.getElementById('editId').value = produto.id;
            document.getElementById('editModelo').value = produto.modelo;
            document.getElementById('editCategoria').value = produto.categoria;
            document.getElementById('editQuantidade').value = produto.quantidade;
            document.getElementById('editPreco').value = produto.preco;
            document.getElementById('editModal').style.display = 'block';
        }
    }

    salvarEdicao() {
        const id = parseInt(document.getElementById('editId').value);
        const index = this.produtos.findIndex(p => p.id === id);
        
        if (index !== -1) {
            this.produtos[index] = {
                id: id,
                modelo: document.getElementById('editModelo').value,
                categoria: document.getElementById('editCategoria').value,
                quantidade: parseInt(document.getElementById('editQuantidade').value),
                preco: parseFloat(document.getElementById('editPreco').value)
            };

            this.salvarDados();
            this.atualizarInterface();
            document.getElementById('editModal').style.display = 'none';
            this.mostrarAlerta('Produto atualizado com sucesso!', 'success');
        }
    }

    excluirProduto(id) {
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            this.produtos = this.produtos.filter(p => p.id !== id);
            this.salvarDados();
            this.atualizarInterface();
            this.mostrarAlerta('Produto excluído com sucesso!', 'success');
        }
    }

    atualizarInterface() {
        const tbody = document.getElementById('productTableBody');
        tbody.innerHTML = '';

        this.produtos.forEach(produto => {
            const valorTotal = produto.quantidade * produto.preco;
            const status = produto.quantidade < 5 ? 'BAIXO' : 'OK';
            const statusClass = produto.quantidade < 5 ? 'status-low' : 'status-ok';

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${produto.modelo}</td>
                <td>${produto.categoria}</td>
                <td>${produto.quantidade}</td>
                <td>${this.formatarMoeda(produto.preco)}</td>
                <td>${this.formatarMoeda(valorTotal)}</td>
                <td class="${statusClass}">${status}</td>
                <td>
                    <button class="btn btn-primary" onclick="estoqueManager.editarProduto(${produto.id})">Editar</button>
                    <button class="btn btn-danger" onclick="estoqueManager.excluirProduto(${produto.id})">Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        const totalUnidades = this.produtos.reduce((sum, p) => sum + p.quantidade, 0);
        const valorTotal = this.produtos.reduce((sum, p) => sum + (p.quantidade * p.preco), 0);
        const itensBaixa = this.produtos.filter(p => p.quantidade < 5).length;

        document.querySelector('.dashboard').innerHTML = `
            <div class="card">
                <h2>Total em Estoque</h2>
                <p style="font-size: 2rem;">${totalUnidades} unidades</p>
            </div>
            <div class="card">
                <h2>Valor Total</h2>
                <p style="font-size: 2rem;">${this.formatarMoeda(valorTotal)}</p>
            </div>
            <div class="card">
                <h2>Itens em Baixa</h2>
                <p style="font-size: 2rem; color: var(--accent-color);">${itensBaixa} produtos</p>
            </div>
        `;
    }

    salvarDados() {
        localStorage.setItem('produtos', JSON.stringify(this.produtos));
    }

    mostrarAlerta(mensagem, tipo) {
        const alert = document.getElementById('alert');
        alert.textContent = mensagem;
        alert.className = `alert alert-${tipo}`;
        alert.style.display = 'block';
        setTimeout(() => {
            alert.style.display = 'none';
        }, 3000);
    }
}

const estoqueManager = new EstoqueManager();