const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = 3001;

app.get('/html-to-jpg', async (req, res) => {

    const { phone, wppImg } = req.query;

    const html = `
                <div style="width: 300px; height: 300px;">
                    <div style="display: flex; flex-direction: column; gap: 16px; align-items: center; justify-content: center;">
                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <img src='https://i.imgur.com/5AWc5pD.png' style="width: 100px; height: 50px; object-fit: contain;">
                        </div>

                        <div style="display: flex; flex-direction: column; gap: 8px; align-items: center; justify-content: center;">
                            <img src="${wppImg}" style="width: 100px; height: 100px; border-radius: 50%; border: 2px solid #FFF; outline: 2px solid #2FCF4D">
                            <h1 style="font-size: 32px; font-weight: 600;">+${phone}</h1>
                        </div>

                        <div style="width: 250px; height: 6px; border-radius: 6px; background: #2b2b2b; position: relative; overflow: hidden;">
                            <div style="width: 50%; position: absolute; background: #2FCF4D; height: 100%;"></div>
                        </div>

                        <h2 style="color: #2FCF4D; font-size: 28px;">Analizando...</h2>
                    </div>
                </div>
    `; // Define o HTML que será convertido

    const browser = await puppeteer.launch({
        defaultViewport: { width: 315, height: 400 },
    });
    const page = await browser.newPage();

    await page.setContent(html); // Define o conteúdo da página como o HTML recebido
    const screenshot = await page.screenshot({ format: 'jpeg' }); // Tira um screenshot em formato JPEG

    await browser.close();

    res.type('jpeg').send(screenshot); // Envia a imagem como resposta
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
