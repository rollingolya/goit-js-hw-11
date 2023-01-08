export function createMarkup(data, container) {
    const markup = data
    .map(
        ({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
        }) => `
        <a href=${largeImageURL} class="img-link">
        <img src=${webformatURL} alt=${tags} loading="lazy" />
        <ul class="info">
            <li class="info__item">
                <b>Likes:</b>${likes}
            </li>
            <li class="info__item">
                <b>Views:</b>${views}
            </li>
            <li class="info__item">
                <b>Comments:</b>${comments}
            </li>
            <li class="info__item">
                <b>Downloads:</b>${downloads}
            </li>
        </ul>
    </a>`
        )
        .join(``);
        container.insertAdjacentHTML('beforeend', markup);
}