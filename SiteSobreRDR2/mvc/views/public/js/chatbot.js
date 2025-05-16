// Função para alternar o chat
function toggleChat() {
    const chatBox = document.getElementById('chat-box');
    if (chatBox.style.display === 'block') {
        chatBox.style.display = 'none';
    } else {
        chatBox.style.display = 'block';
        document.getElementById('user-input').focus();
    }
}

// Função para enviar mensagem
async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const chatBody = document.querySelector('.chat-body');
    
    if (userInput.value.trim() === '') return;
    
    // Adiciona mensagem do usuário
    const userMsg = document.createElement('div');
    userMsg.className = 'user-msg';
    userMsg.innerHTML = `
        <div class="msg-content" style="margin-left: auto; background-color: #007bff; color: white;">
            <p>${userInput.value}</p>
        </div>
    `;
    chatBody.appendChild(userMsg);
    
    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userInput.value })
        });
        
        const data = await response.json();
        
        const assistantMsg = document.createElement('div');
        assistantMsg.className = 'assistant-msg';
        assistantMsg.innerHTML = `
            <div class="msg-avatar">
                <img src="https://image.api.playstation.com/gs2-sec/appkgo/prod/CUSA08519_00/12/i_3da1cf7c41dc7652f9b639e1680d96436773658668c7dc3930c441291095713b/i/icon0.png" alt="Assistente">
            </div>
            <div class="msg-content">
                <p>${data.response}</p>
            </div>
        `;
        chatBody.appendChild(assistantMsg);
    } catch (error) {
        console.error('Erro:', error);
        const errorMsg = document.createElement('div');
        errorMsg.className = 'assistant-msg';
        errorMsg.innerHTML = `
            <div class="msg-avatar">
                <img src="https://image.api.playstation.com/gs2-sec/appkgo/prod/CUSA08519_00/12/i_3da1cf7c41dc7652f9b639e1680d96436773658668c7dc3930c441291095713b/i/icon0.png" alt="Assistente">
            </div>
            <div class="msg-content">
                <p>Desculpe, estou tendo problemas para me conectar. Tente novamente mais tarde.</p>
            </div>
        `;
        chatBody.appendChild(errorMsg);
    }
    
    userInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Permite enviar mensagem com Enter
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});