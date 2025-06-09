# backend/run.py

from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# --- DADOS MOCADOS (Agora como variáveis globais) ---

products = [
    {
        "id": 1,
        "name": "Vaso de Cerâmica Artesanal",
        "price": 85.00,
        "description": "Um vaso único, moldado e pintado à mão, perfeito para decorar qualquer ambiente.",
        "image_url": "https://via.placeholder.com/400x400.png?text=Vaso+de+Ceramica"
    },
    {
        "id": 2,
        "name": "Colar de Prata com Pedra Lunar",
        "price": 120.50,
        "description": "Colar elegante feito em prata 925 com uma autêntica pedra lunar.",
        "image_url": "https://via.placeholder.com/400x400.png?text=Colar+de+Prata"
    },
    {
        "id": 3,
        "name": "Bolsa de Macramê",
        "price": 95.00,
        "description": "Bolsa de ombro tecida à mão com a técnica de macramê, ideal para um look casual.",
        "image_url": "https://via.placeholder.com/400x400.png?text=Bolsa+de+Macrame"
    }
]
# Simulando o auto-incremento de ID de um banco de dados
next_product_id = 4

users = [
    {
        "id": 1,
        "name": "Admin",
        "email": "admin@artisan.com",
        "password_hash": generate_password_hash("admin123")
    }
]
next_user_id = 2


# --- ROTAS EXISTENTES (Sem alterações) ---

@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify(products)

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = next((p for p in products if p['id'] == product_id), None)
    if product:
        return jsonify(product)
    return jsonify({"error": "Produto não encontrado"}), 404

# ... (Rotas de registro e login ficam aqui, sem alterações)
@app.route('/api/register', methods=['POST'])
def register():
    # ... código existente
    global next_user_id
    data = request.get_json()
    if not data or not data.get('name') or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Dados incompletos"}), 400
    if any(u['email'] == data['email'] for u in users):
        return jsonify({"error": "Este email já está cadastrado"}), 409
    new_user = {
        "id": next_user_id,
        "name": data['name'],
        "email": data['email'],
        "password_hash": generate_password_hash(data['password'])
    }
    users.append(new_user)
    next_user_id += 1
    return jsonify({"message": "Usuário registrado com sucesso!", "user_id": new_user['id']}), 201

@app.route('/api/login', methods=['POST'])
def login():
    # ... código existente
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Dados incompletos"}), 400
    user = next((u for u in users if u['email'] == data['email']), None)
    if user and check_password_hash(user['password_hash'], data['password']):
        return jsonify({
            "message": "Login bem-sucedido!",
            "user": {"id": user['id'], "name": user['name'], "email": user['email']}
        }), 200
    else:
        return jsonify({"error": "Email ou senha inválidos"}), 401


# --- NOVAS ROTAS DA API DE CRUD DE PRODUTOS ---

# Rota para CRIAR um novo produto (CREATE)
@app.route('/api/products', methods=['POST'])
def create_product():
    global next_product_id
    data = request.get_json()
    
    # Validação simples
    if not data or not all(k in data for k in ('name', 'price', 'description')):
        return jsonify({'error': 'Dados incompletos'}), 400

    new_product = {
        'id': next_product_id,
        'name': data['name'],
        'price': float(data['price']),
        'description': data['description'],
        'image_url': data.get('image_url', f"https://via.placeholder.com/400x400.png?text={data['name'].replace(' ', '+')}")
    }
    products.append(new_product)
    next_product_id += 1
    return jsonify(new_product), 201 # 201 Created

# Rota para ATUALIZAR um produto existente (UPDATE)
@app.route('/api/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    product = next((p for p in products if p['id'] == product_id), None)
    if not product:
        return jsonify({'error': 'Produto não encontrado'}), 404
    
    data = request.get_json()
    
    # Atualiza os campos do produto com os dados recebidos
    product['name'] = data.get('name', product['name'])
    product['price'] = float(data.get('price', product['price']))
    product['description'] = data.get('description', product['description'])
    product['image_url'] = data.get('image_url', product['image_url'])
    
    return jsonify(product)

# Rota para DELETAR um produto (DELETE)
@app.route('/api/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    global products
    product = next((p for p in products if p['id'] == product_id), None)
    if not product:
        return jsonify({'error': 'Produto não encontrado'}), 404
    
    # Recria a lista de produtos, excluindo o produto com o ID correspondente
    products = [p for p in products if p['id'] != product_id]
    
    return jsonify({'message': 'Produto deletado com sucesso'}), 200


# --- INICIALIZAÇÃO DO SERVIDOR ---
if __name__ == '__main__':
    app.run(debug=True)