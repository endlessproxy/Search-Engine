const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require("fs");
const readline = require('readline');
const { Options } = require('selenium-webdriver/chrome');

const chromeOptions = new Options();
chromeOptions.addArguments('headless');

const driver = new Builder()
    .forBrowser(Browser.chrome)
    .setChromeOptions(chromeOptions)
    .build();

async function clearConsole() {
    await driver.executeScript('console.clear();');
}

async function initProgram() {
    try {
        await clearConsole();

        const screenshotsDir = './Screenshots';

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        const question = (str) => new Promise(resolve => rl.question(str, resolve));

        console.clear();
        console.log(`\n- 👋 Bem-vindo(a) a minha ${'\x1b[37m'}Search Engine${'\x1b[0m'} ⚙️ | By: ${'\x1b[33m'}@${'\x1b[0m'}ohneEternaL\n\n- O que você deseja pesquisar hoje? 🔎`);
        const urlPesquisa = await question(`\n${'\x1b[35m'}>${'\x1b[0m'} `);
        console.clear();
        await driver.get(`https://google.com/search?q=${urlPesquisa}&safe=off`);

        console.log(`\n- 💻 Escolha o tipo de pesquisa que você deseja fazer:\n\n- '${'\x1b[35m'}1${'\x1b[0m'}' > Padrão\n- '${'\x1b[35m'}2${'\x1b[0m'}' > Imagens\n- '${'\x1b[35m'}3${'\x1b[0m'}' > Shopping\n- '${'\x1b[35m'}4${'\x1b[0m'}' > Notícias\n- '${'\x1b[35m'}5${'\x1b[0m'}' > Vídeos\n- '${'\x1b[35m'}6${'\x1b[0m'}' > Maps`);
        const decisaoPesquisa = await question(`\n${'\x1b[35m'}>${'\x1b[0m'} `);

        switch (decisaoPesquisa) {
            case "1":
                await driver.takeScreenshot().then(async (image) => {
                    await fs.promises.writeFile("./Screenshots/ScreenShot.png", image, "base64");
                });
                break;
            case "2":
                await AbaImagens();
                await driver.sleep(4000);
                await driver.takeScreenshot().then(async (image) => {
                    await fs.promises.writeFile("./Screenshots/ScreenShot.png", image, "base64");
                });
                break;
            case "3":
                await AbaShopping();
                await driver.sleep(4000);
                await driver.takeScreenshot().then(async (image) => {
                    await fs.promises.writeFile("./Screenshots/ScreenShot.png", image, "base64");
                });
                break;
            case "4":
                await AbaNoticias();
                await driver.sleep(4000);
                await driver.takeScreenshot().then(async (image) => {
                    await fs.promises.writeFile("./Screenshots/ScreenShot.png", image, "base64");
                });
                break;
            case "5":
                await AbaVideos();
                await driver.sleep(4000);
                await driver.takeScreenshot().then(async (image) => {
                    await fs.promises.writeFile("./Screenshots/ScreenShot.png", image, "base64");
                });
                break;
            case "6":
                await AbaMaps();
                await driver.sleep(4000);
                await driver.takeScreenshot().then(async (image) => {
                    await fs.promises.writeFile("./Screenshots/ScreenShot.png", image, "base64");
                });
                break;
            default:
                console.log(`\n- 🚫 ${'\x1b[31m'}Erro${'\x1b[0m'}, escolha uma dessas: \n\n- '${'\x1b[35m'}1${'\x1b[0m'}' > Padrão\n- '${'\x1b[35m'}2${'\x1b[0m'}' > Imagens\n- '${'\x1b[35m'}3${'\x1b[0m'}' > Shopping\n- '${'\x1b[35m'}4${'\x1b[0m'}' > Notícias\n- '${'\x1b[35m'}5${'\x1b[0m'}' > Vídeos\n- '${'\x1b[35m'}6${'\x1b[0m'}' > Maps\n`);
                break;
        }

        console.clear();
        console.log("");
        console.log(`- Pesquisa feita: ${'\x1b[35m'}${urlPesquisa}${'\x1b[0m'} 🔍`);
        console.log("");
        console.log(`- 🖼️ ScreenShot salva em: \n- ${'\x1b[35m'}` + __dirname + `${'\\'}Screenshots${'\\'}ScreenShot.pn`);
    } catch (error) {
        console.error('Erro durante a execução do programa: ', error);
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
}

async function AbaVideos() {
    try {
        await driver.findElement(By.xpath("//div[contains(text(), 'Vídeos')]"))
            .click();
    } catch (error) {
        console.error('Erro ao processar a aba de vídeos:', error);
    }
}

async function AbaShopping() {
    try {
        await driver.findElement(By.xpath("//div[contains(text(), 'Shopping')]"))
            .click();
    } catch (error) {
        console.error('Erro ao processar a aba de Shopping:', error);
    }
}

async function AbaNoticias() {
    try {
        await driver.findElement(By.xpath("//div[contains(text(), 'Notícias')]"))
            .click();
    } catch (error) {
        console.error('Erro ao processar a aba de Notícias:', error);
    }
}

async function AbaMaps() {
    try {
        await driver.findElement(By.xpath("//div[contains(text(), 'Maps')]"))
            .click();
    } catch (error) {
        console.error('Erro ao processar a aba de Maps:', error);
    }
}

async function AbaImagens() {
    try {
        await driver.findElement(By.xpath("//div[contains(text(), 'Imagens')]"))
            .click();
    } catch (error) {
        console.error('Erro ao processar a aba de Imagens:', error);
    }
}

initProgram();