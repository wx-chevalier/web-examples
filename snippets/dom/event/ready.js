function ready(callback) {
    assert.notEqual(
        typeof document,
        'undefined',
        'document-ready only runs in the browser'
    );
    var state = document.readyState;
    if (state === 'complete' || state === 'interactive') {
        return setTimeout(callback, 0);
    }

    document.addEventListener('DOMContentLoaded', function onLoad() {
        callback();
    });
}