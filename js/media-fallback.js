// media.html - tell the visitor when the video or audio file is missing, instead of showing a silent empty player.
document.querySelectorAll('video, audio').forEach((player) => {
    const sources = player.querySelectorAll('source');
    const lastSource = sources[sources.length - 1];

    // The last <source> fires "error" only after every earlier source has failed too.
    lastSource?.addEventListener('error', () => {
        const note = document.createElement('p');
        note.className = 'media-note';
        note.textContent = `Media file not found. Add ${sources[0].getAttribute('src')} to the public/ folder to play it here.`;
        (player.closest('.image-gallery') || player).insertAdjacentElement('afterend', note);
    });
});
