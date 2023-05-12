let hostInput = document.getElementById("hostInput");
let tokenInput = document.getElementById("tokenInput");
let button = document.getElementById("saveButton");
let text = document.getElementById("successText");

const config = (await messenger.storage.local.get('paperless')).paperless;

if (config?.token) {
    tokenInput.value = config.token;
}

if (config?.host) {
    hostInput.value = config.host;
}


button.onclick = async () => {
    tokenInput.disabled = hostInput.disabled = button.disabled = true;
    let start = Date.now();
    await messenger.storage.local.set({
        paperless: {
            token: tokenInput.value,
            host: hostInput.value
        }
    });
    setTimeout(() => {
        tokenInput.disabled = hostInput.disabled = button.disabled = false;
        text.innerText = "Config saved!";
    }, Math.max(0, start + 500 - Date.now()));
};