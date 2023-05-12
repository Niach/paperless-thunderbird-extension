let menu_id = messenger.menus.create({
    title: 'Setup Paperless..',
    contexts: [
        "browser_action",
        "tools_menu"
    ],
}, () => {
    console.log('context menu created');
})


messenger.menus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === menu_id) {
        console.log('clicked');

        const tab = await messenger.tabs.create({
            url: 'settings.html'
        });



    }
});