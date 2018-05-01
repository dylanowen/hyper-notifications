function getDefault(obj, key, defaultValue) {
    return (key in obj) ? obj[key] : defaultValue;
}

exports.decorateConfig = (config) => {
    // reset our triggers
    let triggers = [];

    if ('notificationTriggers' in config) {
        triggers = config.notificationTriggers.map(trigger => {
            if (!('string' in trigger)) {
                console.log('Trigger missing string: ', trigger);
                return null;
            }

            const string = trigger.string;
            const title = getDefault(trigger, 'title', 'Notification');
            const body = getDefault(trigger, 'body', string);

            return {
                string: string,
                title: title,
                body: body
            };
        })
        .filter(trigger => trigger !== null);
    }

    return Object.assign({}, config, {notificationTriggers: triggers})
}

let triggers = [];
exports.middleware = store => next => action => {
    const { type } = action;

    if (type === 'SESSION_PTY_DATA') {
        //console.log(action.data.length);

        var i = triggers.length;
        while (i--) {
            if (action.data.indexOf(triggers[i].string) > -1) {
                new window.Notification(triggers[i].title, {body: triggers[i].body});
            }
        }
    }
    else if (type === 'CONFIG_LOAD' || type === 'CONFIG_RELOAD') {
        // optimize getting our config in the middleware
        const hyperConfig = config.getConfig();
        triggers = ('notificationTriggers' in hyperConfig) ? hyperConfig.notificationTriggers : [];
    }

    next(action)
}