let menu_id = messenger.menus.create({
    title: 'Setup Paperless..',
    contexts: [
        "browser_action",
        "tools_menu"
    ],
}, () => {})


messenger.menus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === menu_id) {
        const tab = await messenger.tabs.create({
            url: 'settings.html'
        });
    }
});