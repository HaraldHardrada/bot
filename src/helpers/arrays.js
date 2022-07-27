const makeList = (request, array) => {
    return request.data.filter((item) => array.includes(item.asset_id))
        .map((item) => `${item.asset_id}: ${item.price_usd.toFixed(4)} usd`)
        .join("\n")
}

const filterRequest = (request, array) => {
    return request.data.filter((item) => array.includes(item.asset_id))
}

//TODO: - добавить кнопку next
const createButtons = (array, quanInRow, next = 'next', back = 'back') => {
    const copy = array.concat([back])

    return copy.reduce(
        (a, c, i) => {
            i > 0 && i % quanInRow === 0 && a.push([]);
            a.at(-1).push(c);

            return a;
        },
        [[]]
    );
}


module.exports = {makeList, createButtons, filterRequest}