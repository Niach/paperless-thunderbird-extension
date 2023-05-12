const setupButton = document.getElementById('setupButton');
const outUrl = document.getElementById('outUrl');
const msgText = document.getElementById('msg');

let tabs = await messenger.tabs.query({active: true, currentWindow: true});
let message = await messenger.messageDisplay.getDisplayedMessage(tabs[0].id);
const attachments = await messenger.messages.listAttachments(message.id);
const attachmentFiles = await Promise.all(attachments.map(async attachment => {
    return await messenger.messages.getAttachmentFile(message.id, attachment.partName);
}));

const config = (await messenger.storage.local.get('paperless')).paperless;


setupButton.onclick = async () => {
    await messenger.tabs.create({
        url: 'settings.html'
    });
};


if (attachmentFiles.length === 0) {
    msgText.innerText = 'No attachments found';
}

if (config?.token && config?.host) {
    outUrl.href = `${config?.host}/tasks`;
    setupButton.style.display = 'none';


    try {
        for (let file of attachmentFiles) {
            const data = new FormData()
            data.append('document', file);
            data.append('title', file.name);
            const headers = new Headers();
            headers.set('Authorization', `Token ${config?.token}`);

            const result = await fetch(`${config?.host}/api/documents/post_document/`, {
                method: 'POST',
                headers,
                body: data
            });
            const taskId = await result.text();
        }
    } catch (e) {
        msgText.innerText = e;
    }


} else {
    msgText.innerText = 'Please setup your instance';
    outUrl.style.display = 'none';
    setupButton.style.display = 'block';
}




