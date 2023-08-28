const inputContainer = document.getElementById('input-container');
const ipInput = document.getElementById('ip-input');
const portInput = document.getElementById('port-input');
const nickInput = document.getElementById('nick-input');
const connectButton = document.getElementById('connect-button');

const chatContainer = document.getElementById('chat-container');
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

let socket;

connectButton.addEventListener('click', () => {
    const serverIP = ipInput.value;
    const serverPort = portInput.value || '4007';
    const nick = nickInput.value;

    if (serverIP && nick) {
        inputContainer.style.display = 'none';
        chatContainer.style.display = 'block';

        socket = new WebSocket(`ws://${serverIP}:${serverPort}`);
        socket.addEventListener('message', event => {
            const message = event.data;
            const messageElement = document.createElement('p');
            messageElement.textContent = message;
            chatBox.appendChild(messageElement);
            chatBox.scrollTop = chatBox.scrollHeight;
        });

        sendButton.addEventListener('click', () => {
            const message = messageInput.value;
            if (message.trim() !== '') {
                socket.send(message);
                messageInput.value = '';
            }
        });

        messageInput.addEventListener('keyup', event => {
            if (event.key === 'Enter') {
                sendButton.click();
            }
        });
    }
});
